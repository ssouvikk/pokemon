import { Pokemon } from '@/types';
import Image from 'next/image';
import Link from 'next/link';


interface PokemonCardProps {
    pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    return (
        <Link href={`/pokemon/${pokemon.id}`} className="block bg-white p-4 rounded shadow hover:shadow-lg transition">
            <Image
                src={pokemon.image}
                alt={`${pokemon.name} এর থাম্বনেইল`}
                width={96}
                height={96}
                className="mx-auto"
            />
            <h2 className="mt-2 text-center text-lg font-semibold capitalize">{pokemon.name}</h2>
        </Link>
    );
};

export default PokemonCard;
