import { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import { Pokemon } from '@/types';


const HomePage = () => {
  // স্টেট: পূর্ণ Pokémon তালিকা, ফিল্টার করা তালিকা, এবং পেজ নং
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1); // ইনফিনিট স্ক্রলের জন্য

  // ডেটা ফেচ করার ফাংশন
  const fetchPokemons = async (page: number) => {
    // উদাহরণ: প্রতি পেজে 20 Pokémon ধরে
    const limit = 20;
    const offset = (page - 1) * limit;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await res.json();

    // Pokémon-এর id ও থাম্বনেইল ইমেজ সংগ্রহ করা (id এবং image URL তৈরির জন্য)
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

  // প্রথম লোডে ও পেজ পরিবর্তনের সময় ডেটা ফেচ করা
  useEffect(() => {
    const loadPokemons = async () => {
      const newPokemons = await fetchPokemons(page);
      setPokemons((prev) => [...prev, ...newPokemons]);
    };
    loadPokemons();
  }, [page]);

  // সার্চ ইনপুট অনুযায়ী ফিল্টার করা
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

  // ইনফিনিট স্ক্রল হ্যান্ডলার (সাধারণ উদাহরণ)
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.scrollHeight) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* সার্চ বক্স */}
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      {/* গ্রিড লেআউট */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
