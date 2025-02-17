import React, { useState, useEffect } from 'react';

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

interface HomePageProps {
  pokemons: Pokemon[];
}

const HomePage: React.FC<HomePageProps> = ({ pokemons }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>(pokemons);

  useEffect(() => {
    // ইউজারের ইনপুট অনুসারে পোকেমন ফিল্টার করুন
    const filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPokemons(filtered);
  }, [searchQuery, pokemons]);

  return (
    <div className="container mx-auto p-4">
      {/* সার্চ বার */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="পোকেমন সার্চ করুন..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="পোকেমন সার্চ করুন"
        />
      </div>
      {/* গ্রিড লেআউট: বিভিন্ন স্ক্রিন সাইজ অনুযায়ী কলাম সংখ্যা পরিবর্তন হবে */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition"
          >
            <img
              src={pokemon.image}
              alt={`${pokemon.name} এর ছবি`}
              className="w-full h-32 object-contain mb-2"
            />
            <h2 className="text-lg font-semibold text-center capitalize">
              {pokemon.name}
            </h2>
          </div>
        ))}
      </div>
      {/* ইনফিনিট স্ক্রল / পেজিনেশন (ঐচ্ছিক) - এখানে একটি বোতাম প্লেসহোল্ডার হিসেবে */}
      <div className="mt-6 text-center">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={() => alert('আরো পোকেমন লোড হবে')}
        >
          আরো লোড করুন
        </button>
      </div>
    </div>
  );
};

export default HomePage;
