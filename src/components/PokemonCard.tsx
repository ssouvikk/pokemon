import Image from 'next/image';
import { Pokemon } from '@/types';

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
    return (
        <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-bold capitalize text-center">{pokemon.name}</h2>
            <Image
                src={pokemon.url}
                alt={`${pokemon.name} এর ছবি`}
                width={200}
                height={200}
                className="mx-auto"
                priority={false} // Lazy loading by default
            />
        </div>
    );
};

export default PokemonCard;
