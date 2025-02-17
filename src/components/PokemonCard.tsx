// components/PokemonCard.tsx
import { Pokemon } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface PokemonCardProps {
    pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    return (
        <Link href={`/pokemon/${pokemon.id}`}>
            <div className="group block bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-2">
                <div className="flex justify-center">
                    <Image
                        src={pokemon.image}
                        alt={`${pokemon.name} এর ছবি`}
                        width={120}
                        height={120}
                        className="drop-shadow-lg"
                    />
                </div>
                <h2 className="mt-3 text-center text-lg font-semibold capitalize text-gray-900 dark:text-gray-100 group-hover:text-blue-500">
                    {pokemon.name}
                </h2>
            </div>
        </Link>
    );
};

export default PokemonCard;
