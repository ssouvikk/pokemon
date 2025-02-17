export const fetchPokemonList = async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const data = await res.json();
    return data.results;
};


export const fetchPokemonDetails = async (id: string) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return await res.json();
};
