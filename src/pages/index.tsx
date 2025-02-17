// pages/index.tsx
import { Pokemon } from '@/types';
import { GetServerSideProps, GetStaticProps } from 'next';


interface HomeProps {
  pokemons: Pokemon[];
}

const HomePage: React.FC<HomeProps> = ({ pokemons = [] }) => {
  return (
    <div>
      <h1>Pokémon List (SSR)</h1>
      <ul>
        {pokemons.map((pokemon, idx) => (
          <li key={idx}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
};

/* export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const data = await res.json();
  return {
    props: {
      pokemons: data.results,
    },
  };
}; */

export default HomePage;


export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const data = await res.json();
  return {
    props: {
      pokemons: data.results,
    },
  };
};