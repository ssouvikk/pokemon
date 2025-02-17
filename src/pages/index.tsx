// pages/index.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import { Pokemon } from '@/types';

const HomePage = () => {
  const router = useRouter();
  const { search: querySearch, page: queryPage } = router.query;

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  // ডেটা ফেচ করার ফাংশন
  const fetchPokemons = async (page: number) => {
    const limit = 20;
    const offset = (page - 1) * limit;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await res.json();

    const pokemonData = data.results.map((pokemon: any, index: number) => {
      const id = offset + index + 1;
      return {
        id,
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      };
    });
    return pokemonData;
  };

  // হোমপেজ লোড হবার সময় URL থেকে সার্চ ও পেজ রিড করতে হবে
  useEffect(() => {
    if (querySearch) {
      setSearchQuery(querySearch as string);
    }
    if (queryPage) {
      setPage(parseInt(queryPage as string));
    }
  }, [querySearch, queryPage]);

  // পেজ বা কম্পোনেন্ট মাউন্ট হলে ডেটা ফেচ
  useEffect(() => {
    const loadPokemons = async () => {
      const newPokemons = await fetchPokemons(page);
      setPokemons((prev) => (page === 1 ? newPokemons : [...prev, ...newPokemons]));
    };
    loadPokemons();
  }, [page]);

  // সার্চ অনুযায়ী ফিল্টার করা
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredPokemons(pokemons);
    } else {
      const filtered = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPokemons(filtered);
    }
  }, [searchQuery, pokemons]);

  // সার্চ ইনপুট পরিবর্তনের সময় URL আপডেট করা
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    router.push(`/?search=${value}&page=${page}`, undefined, { shallow: true });
  };

  // ইনফিনিট স্ক্রল হ্যান্ডলার
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.scrollHeight) {
      const newPage = page + 1;
      setPage(newPage);
      router.push(`/?search=${searchQuery}&page=${newPage}`, undefined, { shallow: true });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, searchQuery]);

  return (
    <div className="container mx-auto p-4">
      <SearchBar value={searchQuery} onChange={handleSearchChange} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon) => <PokemonCard key={pokemon.id} pokemon={pokemon} />)
        ) : (
          <div className="col-span-full text-center text-gray-500">No Pokémon found</div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
