import React from 'react';
import { useRouter } from 'next/router';

interface Stat {
    name: string;
    value: number;
}

interface DetailProps {
    pokemon: {
        name: string;
        image: string;
        types: string[];
        abilities: string[];
        stats: Stat[];
        moves: string[];
    };
}

const DetailPage: React.FC<DetailProps> = ({ pokemon }) => {
    const router = useRouter();

    return (
        <div className="container mx-auto p-4">
            {/* ব্যাক বোতাম */}
            <button
                onClick={() => router.back()}
                className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                ← ফিরে যান
            </button>

            {/* পোকেমন বিস্তারিত তথ্যের কার্ড */}
            <div className="bg-white shadow rounded p-6">
                <div className="flex flex-col md:flex-row items-center">
                    <img
                        src={pokemon.image}
                        alt={`${pokemon.name} এর ছবি`}
                        className="w-48 h-48 object-contain mb-4 md:mb-0 md:mr-6"
                    />
                    <div>
                        <h1 className="text-3xl font-bold capitalize mb-2">{pokemon.name}</h1>
                        <p className="mb-2">
                            <span className="font-semibold">টাইপ: </span>
                            {pokemon.types.join(', ')}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">অ্যাবিলিটিস: </span>
                            {pokemon.abilities.join(', ')}
                        </p>
                    </div>
                </div>
                {/* স্ট্যাটস ও মুভস */}
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-4">স্ট্যাটস</h2>
                    <ul className="list-disc list-inside">
                        {pokemon.stats.map((stat, index) => (
                            <li key={index}>
                                <span className="font-semibold">{stat.name}: </span>
                                {stat.value}
                            </li>
                        ))}
                    </ul>
                    <h2 className="text-2xl font-semibold my-4">মুভস</h2>
                    <ul className="list-disc list-inside">
                        {pokemon.moves.map((move, index) => (
                            <li key={index} className="capitalize">
                                {move}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;
