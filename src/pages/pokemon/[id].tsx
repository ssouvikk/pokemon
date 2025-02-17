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
    pokemon: PokemonDetail | null;
}

const PokemonDetailPage: React.FC<PokemonDetailProps> = ({ pokemon }) => {
    const router = useRouter();

    if (router.isFallback) {
        return (
            <div className="container mx-auto p-6 text-center text-xl font-semibold">
                লোড হচ্ছে...
            </div>
        );
    }

    if (!pokemon) {
        return (
            <div className="container mx-auto p-6 text-center bg-gray-100 dark:bg-gray-900 min-h-screen">
                <Head>
                    <title>Pokémon Not Found</title>
                    <meta name="description" content="দুঃখিত, আপনি যে Pokémon খুঁজছেন তা পাওয়া যায়নি।" />
                </Head>
                <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Pokémon Not Found</h1>
                <p className="mb-6 text-gray-700 dark:text-gray-300">দুঃখিত, আপনি যে Pokémon খুঁজছেন তা পাওয়া যায়নি।</p>
                <button
                    onClick={() => router.push('/')}
                    className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    Go Back Home
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
            <Head>
                <title>{pokemon.name} - Pokémon বিস্তারিত</title>
                <meta name="description" content={`${pokemon.name} সম্পর্কে বিস্তারিত তথ্য।`} />
            </Head>
            <button
                onClick={() => router.back()}
                className="mb-6 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
                ← ফিরে যান
            </button>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded p-6">
                <div className="flex flex-col md:flex-row items-center">
                    <Image
                        src={pokemon.sprites.front_default}
                        alt={`${pokemon.name} এর ছবি`}
                        width={200}
                        height={200}
                        className="object-contain"
                    />
                    <div className="md:ml-8 mt-4 md:mt-0">
                        <h1 className="text-3xl font-bold capitalize mb-2 text-gray-800 dark:text-gray-100">
                            {pokemon.name} (ID: {pokemon.id})
                        </h1>
                        <p className="mb-2 text-gray-700 dark:text-gray-300">
                            <strong>টাইপ: </strong>
                            {pokemon.types.map((t, idx) => (
                                <span key={idx} className="capitalize mr-2">{t.type.name}</span>
                            ))}
                        </p>
                        <p className="mb-2 text-gray-700 dark:text-gray-300">
                            <strong>অ্যাবিলিটিস: </strong>
                            {pokemon.abilities.map((a, idx) => (
                                <span key={idx} className="capitalize mr-2">{a.ability.name}</span>
                            ))}
                        </p>
                    </div>
                </div>
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">স্ট্যাটস</h2>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                        {pokemon.stats.map((stat, idx) => (
                            <li key={idx} className="capitalize">
                                {stat.stat.name}: {stat.base_stat}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">মুভসেট</h2>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                        {pokemon.moves.slice(0, 10).map((move, idx) => (
                            <li key={idx} className="capitalize">{move.move.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await res.json();
    const paths = data.results.map((pokemon: any, index: number) => ({
        params: { id: String(index + 1) },
    }));

    return {
        paths,
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { id } = context.params!;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (res.status !== 200) {
        return {
            props: { pokemon: null },
            revalidate: 60,
        };
    }

    const pokemon = await res.json();

    return {
        props: { pokemon },
        revalidate: 60,
    };
};

export default PokemonDetailPage;
