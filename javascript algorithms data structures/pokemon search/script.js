const url = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

const $search = document.querySelector("#search-button");
let $input = document.querySelector("#search-input");
let $pokemonName = document.querySelector("#pokemon-name");
let $pokemonSprite = document.querySelector("#pokemon-sprite");
let $weight = document.querySelector("#weight");
let $height = document.querySelector("#height");
let $types = document.querySelector("#types");
let $hp = document.querySelector("#hp");
let $attack = document.querySelector("#attack");
let $defense = document.querySelector("#defense");
let $specialAttack = document.querySelector("#special-attack");
let $specialDefense = document.querySelector("#special-defense");
let $speed = document.querySelector("#speed");

async function isPokemon(pokemon) {
  return fetch(url + pokemon).then((response) => {
    if (!response.ok) {
      throw new Error(`error ${response.statusText}`);
    } else {
      return response.json();
    }
  });
}

$search.addEventListener("click", async function () {
  try {
    let pokemonName = $input.value.toLowerCase();
    const pokemonData = await isPokemon(pokemonName);
    $pokemonName.textContent = pokemonData.name;
    $pokemonSprite.textContent = `<img src=${pokemonData.sprites.front_default}>`;
    $weight.textContent = `${pokemonData.weight}`;
    $height.textContent = `${pokemonData.height}`;
    $types.textContent = "";
    for (const slot in pokemonData.types) {
      $types.textContent += `${pokemonData.types[slot].type.name.toUpperCase()} `;
    }

    $hp.textContent = `${pokemonData.stats[0].base_stat}`;
    $attack.textContent = `${pokemonData.stats[1].base_stat}`;
    $defense.textContent = `${pokemonData.stats[2].base_stat}`;
    $specialAttack.textContent = `${pokemonData.stats[3].base_stat}`;
    $specialDefense.textContent = `${pokemonData.stats[4].base_stat}`;
    $speed.textContent = `${pokemonData.stats[5].base_stat}`;
  } catch (error) {
    alert("Pokémon not found");
  }
});
