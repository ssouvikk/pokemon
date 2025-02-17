// pages/pokemon/[id].tsx
import { GetStaticPaths, GetStaticProps } from 'next';

interface PokemonDetail {
    name: string;
    id: number;
    types: { type: { name: string } }[];
    // আরও প্রয়োজনীয় ডেটা...
}

interface DetailProps {
    pokemon: PokemonDetail;
}

const PokemonDetailPage: React.FC<DetailProps> = ({ pokemon }) => {
    return (
        <div>
            <h1>{pokemon.name} (ID: {pokemon.id})</h1>
            <p>
                {pokemon.types.map((t, index) => (
                    <span key={index}>{t.type.name} </span>
                ))}
            </p>
            {/* অন্যান্য বিস্তারিত তথ্য */}
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    // প্রাথমিক 151 পোকেমন এর জন্য পাথ জেনারেট করা
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await res.json();

    const paths = data.results.map((pokemon: { name: string; url: string }, index: number) => ({
        params: { id: String(index + 1) },
    }));

    return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { id } = context.params!;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await res.json();

    return {
        props: { pokemon },
        revalidate: 60, // প্রতি 60 সেকেন্ড পর পেজ রিজেনারেট হবে
    };
};

export default PokemonDetailPage;
