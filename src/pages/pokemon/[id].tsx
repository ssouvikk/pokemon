// pages/pokemon/[id].tsx
import { useRouter } from 'next/router';
import { usePokemon } from '../../components/usePokemon';

const PokemonDetailCSR: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const { pokemon, isLoading, isError } = usePokemon(
        id ? `https://pokeapi.co/api/v2/pokemon/${id}` : ''
    );

    if (isLoading) return <div>লোড হচ্ছে...</div>;
    if (isError) return <div>কিছু সমস্যা হয়েছে</div>;

    return (
        <div>
            <h1>{pokemon.name}</h1>
            {/* অন্যান্য বিস্তারিত তথ্য দেখান */}
        </div>
    );
};

export default PokemonDetailCSR;
