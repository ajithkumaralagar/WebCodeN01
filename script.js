const pokeList = document.getElementById('pokemon-list');
const paginat = document.getElementById('pagination');

const itemsPerPage = 10;
let currentPage = 1;
let totalPokemon = 0;
let totalPages = 5;

async function getPokemonNames() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=50');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
}

async function getPokemonAbilities() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/ability?offset=0&limit=50');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
}

async function getPokemonMoves() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/move?offset=0&limit=50');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
}

async function displayPokemon() {
  const pokemonNames = await getPokemonNames();
  const pokemonAbilities = await getPokemonAbilities();
  const pokemonMoves = await getPokemonMoves();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  for (let i = startIndex; i < endIndex; i++) {
    if (i < pokemonNames.length) {
      const pokemon = pokemonNames[i];
      const abilities = [pokemonAbilities[i].name];
      const moves = [pokemonMoves[i].name];

      createPokemonCard(pokemon.name, abilities, moves);
    }
  }

  
  renderPagination();
}

function createPokemonCard(name, abilities, moves) {
  const pokemonCard = document.createElement('div');
  pokemonCard.classList.add('pokemon-card');

  const pokemonName = document.createElement('div');
  pokemonName.classList.add('pokemon-name');
  pokemonName.innerText = name;

  const pokemonAbilities = document.createElement('div');
  pokemonAbilities.classList.add('pokemon-abilities');
  pokemonAbilities.innerText = 'Abilities: ' + abilities.join(', ');

  const pokemonMoves = document.createElement('div');
  pokemonMoves.classList.add('pokemon-moves');
  pokemonMoves.innerText = 'Moves: ' + moves.join(', ');

  pokemonCard.appendChild(pokemonName);
  pokemonCard.appendChild(pokemonAbilities);
  pokemonCard.appendChild(pokemonMoves);

  pokeList.appendChild(pokemonCard);
}

function renderPagination() {
  paginat.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement('a');
    pageLink.href = '#';
    pageLink.innerText = i;

    if (i === currentPage) {
      pageLink.classList.add('active');
    }

    pageLink.addEventListener('click', () => {
      currentPage = i;
      pokeList.innerHTML = '';
      displayPokemon();
    });

    paginat.appendChild(pageLink);
  }
}

displayPokemon();
