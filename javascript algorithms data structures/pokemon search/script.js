const url = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

const typeColors = {
  normal: { backgroundColor: "#A8A77A", color: "#fff" },
  fire: { backgroundColor: "#EE8130", color: "#fff" },
  water: { backgroundColor: "#6390F0", color: "#fff" },
  electric: { backgroundColor: "#F7D02C", color: "#000" },
  grass: { backgroundColor: "#7AC74C", color: "#fff" },
  ice: { backgroundColor: "#96D9D6", color: "#000" },
  fighting: { backgroundColor: "#C22E28", color: "#fff" },
  poison: { backgroundColor: "#A33EA1", color: "#fff" },
  ground: { backgroundColor: "#E2BF65", color: "#000" },
  flying: { backgroundColor: "#A98FF3", color: "#000" },
  psychic: { backgroundColor: "#F95587", color: "#fff" },
  bug: { backgroundColor: "#A6B91A", color: "#fff" },
  rock: { backgroundColor: "#B6A136", color: "#fff" },
  ghost: { backgroundColor: "#735797", color: "#fff" },
  dragon: { backgroundColor: "#6F35FC", color: "#fff" },
  dark: { backgroundColor: "#705746", color: "#fff" },
  steel: { backgroundColor: "#B7B7CE", color: "#000" },
  fairy: { backgroundColor: "#D685AD", color: "#fff" },
  // Add more types and their colors as needed
};

const $search = document.querySelector("#search-button");
const $buttonLeft = document.querySelector("#button-left");
const $buttonRight = document.querySelector("#button-right");
const $pokedexResult = document.querySelector("#pokedex-result");
const $pokeball = document.querySelector(".pokeball");
let $input = document.querySelector("#search-input");
let $pokemonName = document.querySelector("#pokemon-name");
let $pokemonId = document.querySelector("#pokemon-id");
let $pokemonSprite = document.querySelector("#sprite");
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
  const response = await fetch(url + pokemon);
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}
async function searchPokemon(pokemon) {
  try {
    let pokemonName = pokemon;
    const pokemonData = await isPokemon(pokemonName);
    console.log(pokemonName);
    if (!pokemonData.error && pokemonName !== "") {
      $pokeball.classList.add("shake");
      setTimeout(() => {
        $pokeball.classList.remove("shake");
      }, 1000);
      $pokedexResult.style.display = "flex";
      $pokemonName.textContent = pokemonData.name.toUpperCase();
      $pokemonName.style.fontWeight = "bold"; // Make the name bold

      $pokemonId.textContent = `#${pokemonData.id}`;
      $pokemonId.style.fontWeight = "bold"; // Make the ID bold
      $pokemonSprite.src = pokemonData.sprites.front_default;
      $weight.textContent = `${pokemonData.weight}`;
      $height.textContent = `${pokemonData.height}`;
      $types.textContent = "";
      for (const slot in pokemonData.types) {
        const type = pokemonData.types[slot].type.name;
        const typeColor = typeColors[type] || {
          backgroundColor: "gray",
          color: "#fff",
        };

        const typeElement = document.createElement("p");
        typeElement.textContent = type.toUpperCase();
        typeElement.style.backgroundColor = typeColor.backgroundColor;
        typeElement.style.color = typeColor.color;
        typeElement.style.padding = "0.2rem";

        typeElement.style.borderRadius = "5px";

        $types.appendChild(typeElement);
      }
      $hp.textContent = `${pokemonData.stats[0].base_stat}`;
      $attack.textContent = `${pokemonData.stats[1].base_stat}`;
      $defense.textContent = `${pokemonData.stats[2].base_stat}`;
      $specialAttack.textContent = `${pokemonData.stats[3].base_stat}`;
      $specialDefense.textContent = `${pokemonData.stats[4].base_stat}`;
      $speed.textContent = `${pokemonData.stats[5].base_stat}`;
    }
  } catch (error) {
    alert("Pokémon not found");
  }
};
$search.addEventListener('click', function(){
  let pokemon = $input.value.toLowerCase()
  searchPokemon(pokemon)

})

$buttonLeft.addEventListener('click', function(){
  let currentId = $pokemonId.textContent.substring(1)
  nextId = parseInt(currentId)-1
  console.log(currentId)
  if(currentId >1){
    
    searchPokemon(nextId)
    }else{
      alert('reached minimum')
    }
})
$buttonRight.addEventListener('click', function(){
  let currentId = $pokemonId.textContent.substring(1)
  nextId = parseInt(currentId)+1
  console.log(currentId)
  if(currentId <10277){
    
    searchPokemon(nextId)
    }else{
      alert('reached maximum')
    }
  
})
