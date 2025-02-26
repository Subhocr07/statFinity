"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      if (!id) return;

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw new Error("Failed to load Pokémon data");

        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading)
    return <p className="text-center text-2xl mt-10">Loading Pokémon...</p>;
  if (error)
    return <p className="text-center text-2xl mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-indigo-900 text-white py-10">
      <div className="container mx-auto max-w-4xl text-center p-6 shadow-lg bg-white bg-opacity-10 rounded-lg backdrop-blur-md">
        {/* Title */}
        <h1 className="text-5xl font-bold tracking-wide mb-6 uppercase drop-shadow-lg">
          {pokemon.name}
        </h1>

        {/* Pokémon Image */}
        <div className="flex justify-center">
          <Image
            src={`https://img.pokemondb.net/artwork/${pokemon.name}.jpg`}
            alt={pokemon.name}
            width={150}
            height={150}
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Pokémon Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
          {/* Abilities */}
          <div className="bg-white bg-opacity-20 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-yellow-300">
              Abilities
            </h2>
            <ul className="mt-2">
              {pokemon.abilities.length > 0 ? (
                pokemon.abilities.map((ability) => (
                  <li key={ability.ability.name} className="capitalize">
                    {ability.ability.name}
                  </li>
                ))
              ) : (
                <li className="text-gray-300">No abilities found</li>
              )}
            </ul>
          </div>

          {/* Types */}
          <div className="bg-white bg-opacity-20 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-yellow-300">Types</h2>
            <ul className="mt-2">
              {pokemon.types.length > 0 ? (
                pokemon.types.map((type) => (
                  <li key={type.type.name} className="capitalize">
                    {type.type.name}
                  </li>
                ))
              ) : (
                <li className="text-gray-300">No types found</li>
              )}
            </ul>
          </div>

          {/* Stats */}
          <div className="bg-white bg-opacity-20 p-4 rounded-lg shadow-md col-span-2">
            <h2 className="text-2xl font-semibold text-yellow-300">Stats</h2>
            <ul className="grid grid-cols-2 gap-4 mt-2">
              {pokemon.stats.map((stat) => (
                <li key={stat.stat.name} className="capitalize">
                  <span className="font-bold">{stat.stat.name}:</span>{" "}
                  {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>

          {/* Moves */}
          <div className="bg-white bg-opacity-20 p-4 rounded-lg shadow-md col-span-2">
            <h2 className="text-2xl font-semibold text-yellow-300">Moves</h2>
            <ul className="max-h-40 overflow-y-auto grid grid-cols-2 gap-2 mt-2">
              {pokemon.moves.length > 0 ? (
                pokemon.moves.slice(0, 10).map((move) => (
                  <li key={move.move.name} className="capitalize">
                    {move.move.name}
                  </li>
                ))
              ) : (
                <li className="text-gray-300">No moves found</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
