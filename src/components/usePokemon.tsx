// components/usePokemon.ts
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const usePokemon = (url: string) => {
    const { data, error } = useSWR(url, fetcher);
    return {
        pokemon: data,
        isLoading: !error && !data,
        isError: error,
    };
};
