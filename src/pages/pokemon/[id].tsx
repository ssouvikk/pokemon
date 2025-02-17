// pages/pokemon/[id].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ArrowLeft } from 'lucide-react';
import Loader from '@/components/Loader';

interface PokemonDetail {
    id: number;
    name: string;
    sprites: { front_default: string };
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
        return <Loader />;
    }

    if (!pokemon) {
        return (
            <div className="container mx-auto p-6 text-center bg-gray-100 dark:bg-gray-900 min-h-screen">
                <Head>
                    <title>Pokémon Not Found</title>
                    <meta name="description" content="Sorry, the Pokémon you are looking for could not be found." />
                </Head>
                <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Pokémon Not Found</h1>
                <p className="mb-6 text-gray-700 dark:text-gray-300">Sorry, the Pokémon you are looking for could not be found.</p>
                <button
                    onClick={() => router.push('/')}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Go back to the homepage
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
            <Head>
                <title>{pokemon.name} - Pokémon Details</title>
                <meta name="description" content={`Detailed information about ${pokemon.name}`} />
            </Head>

            {/* Back button */}
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 mb-6 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
                <ArrowLeft size={20} /> Go back
            </button>

            {/* Pokémon details card */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
                <div className="flex flex-col md:flex-row items-center">
                    <Image
                        src={pokemon.sprites.front_default}
                        alt={`${pokemon.name}'s image`}
                        width={220}
                        height={220}
                        className="object-contain drop-shadow-lg"
                    />
                    <div className="md:ml-8 mt-4 md:mt-0">
                        <h1 className="text-4xl font-bold capitalize text-gray-900 dark:text-gray-100">
                            {pokemon.name} <span className="text-gray-500">({pokemon.id})</span>
                        </h1>
                        <div className="mt-3">
                            <p className="text-lg font-semibold text-gray-800 dark:text-gray-300">Type:</p>
                            <div className="flex gap-2 mt-1">
                                {pokemon.types.map((t, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200 rounded-full text-sm capitalize">
                                        {t.type.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="text-lg font-semibold text-gray-800 dark:text-gray-300">Abilities:</p>
                            <div className="flex gap-2 mt-1">
                                {pokemon.abilities.map((a, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-200 rounded-full text-sm capitalize">
                                        {a.ability.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Stats</h2>
                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 dark:text-gray-300">
                        {pokemon.stats.map((stat, idx) => (
                            <li key={idx} className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg text-center capitalize">
                                {stat.stat.name}: <strong>{stat.base_stat}</strong>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Moveset */}
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Moveset</h2>
                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 dark:text-gray-300">
                        {pokemon.moves.slice(0, 10).map((move, idx) => (
                            <li key={idx} className="bg-purple-200 dark:bg-purple-700 px-4 py-2 rounded-lg text-center capitalize">
                                {move.move.name}
                            </li>
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

    return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { id } = context.params!;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (res.status !== 200) {
        return { props: { pokemon: null }, revalidate: 60 };
    }

    const pokemon = await res.json();
    return { props: { pokemon }, revalidate: 60 };
};

export default PokemonDetailPage;
