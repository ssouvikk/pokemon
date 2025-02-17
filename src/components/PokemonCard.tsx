// components/PokemonCard.tsx
import { Pokemon } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface PokemonCardProps {
    pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    return (
        <Link
            href={`/pokemon/${pokemon.id}`}
            className="block bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105"
        >
            <Image
                src={pokemon.image}
                alt={`${pokemon.name} এর থাম্বনেইল`}
                width={96}
                height={96}
                className="mx-auto"
            />
            <h2 className="mt-2 text-center text-lg font-semibold capitalize text-gray-800 dark:text-gray-200">
                {pokemon.name}
            </h2>
        </Link>
    );
};

export default PokemonCard;
