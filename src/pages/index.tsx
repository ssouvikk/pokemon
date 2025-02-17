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

  // Function to fetch data
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

  // Load search query and page number from URL when the page loads
  useEffect(() => {
    if (querySearch) {
      setSearchQuery(querySearch as string);
    }
    if (queryPage) {
      setPage(parseInt(queryPage as string));
    }
  }, [querySearch, queryPage]);

  // Fetch data when the page or component is mounted
  useEffect(() => {
    const loadPokemons = async () => {
      const newPokemons = await fetchPokemons(page);
      setPokemons((prev) => (page === 1 ? newPokemons : [...prev, ...newPokemons]));
    };
    loadPokemons();
  }, [page]);

  // Filter pokemons based on the search query
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

  // Update the URL when search input changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    router.push(`/?search=${value}&page=${page}`, undefined, { shallow: true });
  };

  // Infinite scroll handler
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
    <div className="container mx-auto p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <SearchBar value={searchQuery} onChange={handleSearchChange} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon) => <PokemonCard key={pokemon.id} pokemon={pokemon} />)
        ) : (
          <div className="col-span-full text-center text-lg text-gray-500">No Pokémon found</div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
