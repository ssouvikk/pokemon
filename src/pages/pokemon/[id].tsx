// pages/pokemon/[id].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface PokemonDetail {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    };
    types: { type: { name: string } }[];
    abilities: { ability: { name: string } }[];
    stats: { stat: { name: string }; base_stat: number }[];
    moves: { move: { name: string } }[];
}

interface PokemonDetailProps {
    pokemon: PokemonDetail;
}

const PokemonDetailPage: React.FC<PokemonDetailProps> = ({ pokemon }) => {
    const router = useRouter();

    // fallback অবস্থায় লোডিং মেসেজ দেখানো হচ্ছে
    if (router.isFallback) {
        return <div>লোড হচ্ছে...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <Head>
                <title>{pokemon.name} - Pokémon বিস্তারিত</title>
                <meta name="description" content={`${pokemon.name} সম্পর্কে বিস্তারিত তথ্য।`} />
            </Head>
            {/* ব্যাক বাটন: ক্লিক করলে হোমপেজে ফিরবে */}
            <button
                onClick={() => router.back()}
                className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                ← ফিরে যান
            </button>
            {/* Pokémon এর বিস্তারিত তথ্য প্রদর্শন */}
            <div className="bg-white shadow rounded p-6">
                <div className="flex flex-col md:flex-row items-center">
                    {/* Pokémon এর ছবি */}
                    <Image
                        src={pokemon.sprites.front_default}
                        alt={`${pokemon.name} এর ছবি`}
                        width={200}
                        height={200}
                        className="object-contain"
                    />
                    <div className="md:ml-6 mt-4 md:mt-0">
                        {/* নাম ও ID */}
                        <h1 className="text-3xl font-bold capitalize">
                            {pokemon.name} (ID: {pokemon.id})
                        </h1>
                        {/* টাইপ (Type) */}
                        <p className="mt-2">
                            <strong>টাইপ: </strong>
                            {pokemon.types.map((t, idx) => (
                                <span key={idx} className="capitalize mr-2">
                                    {t.type.name}
                                </span>
                            ))}
                        </p>
                        {/* অ্যাবিলিটিস (Abilities) */}
                        <p className="mt-2">
                            <strong>অ্যাবিলিটিস: </strong>
                            {pokemon.abilities.map((a, idx) => (
                                <span key={idx} className="capitalize mr-2">
                                    {a.ability.name}
                                </span>
                            ))}
                        </p>
                    </div>
                </div>
                {/* স্ট্যাটস (Stats) */}
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-2">স্ট্যাটস</h2>
                    <ul>
                        {pokemon.stats.map((stat, idx) => (
                            <li key={idx} className="capitalize">
                                {stat.stat.name}: {stat.base_stat}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* মুভসেট (Moves) */}
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-2">মুভসেট</h2>
                    <ul className="list-disc list-inside">
                        {pokemon.moves.slice(0, 10).map((move, idx) => (
                            <li key={idx} className="capitalize">
                                {move.move.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

// প্রথম 151 Pokémon-এর জন্য পাথ জেনারেট করা হচ্ছে
export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await res.json();
    const paths = data.results.map((pokemon: any, index: number) => ({
        params: { id: String(index + 1) },
    }));

    return {
        paths,
        fallback: true, // fallback true থাকলে নতুন Pokémon-ও লোড করা যাবে
    };
};

// Pokémon-এর বিস্তারিত তথ্য স্ট্যাটিকভাবে ফেচ করা হচ্ছে
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
