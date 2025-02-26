"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=100"
        );
        if (!response.ok) throw new Error("Failed to fetch Pokémon data");

        const data = await response.json();
        setPokemons(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-indigo-900 text-white py-10">
      <div className="container mx-auto max-w-4xl text-center p-6 shadow-lg bg-white bg-opacity-10 rounded-lg backdrop-blur-md">
        <h1 className="text-5xl font-bold tracking-wide mb-6 uppercase drop-shadow-lg">
          Pokémon Explorer
        </h1>

        <input
          type="text"
          placeholder="Search Pokémon..."
          className="p-3 w-full max-w-md border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 text-black"
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading && <p className="mt-6 text-lg">Loading Pokémon...</p>}
        {error && <p className="mt-6 text-lg text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            {filteredPokemons.map((pokemon, index) => (
              <Link key={pokemon.name} href={`/pokemon/${index + 1}`}>
                <div className="p-4 border border-gray-300 rounded-lg shadow-md hover:bg-white hover:bg-opacity-20 cursor-pointer transition transform hover:scale-105">
                  <Image
                    src={`https://img.pokemondb.net/artwork/${pokemon.name}.jpg`}
                    alt={pokemon.name}
                    width={150}
                    height={150}
                    className="rounded-lg shadow-md"
                  />
                  <p className="mt-2 text-lg font-semibold text-yellow-300">
                    {pokemon.name.toUpperCase()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
