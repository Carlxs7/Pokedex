const pokeContainer = document.querySelector("#pokeContainer");
const pokemonCount = 1000
const colors = {
    fire: '#f5bf5bff',
    grass: '#74f77dff',
    electric: '#f3dc6aff',
    water: '#7dcef3ff',
    ground: '#a86725ff',
    rock: '#68685fff',
    fairy: '#e89df5ff',
    poison: '#98d7a5',
    bug: '#eeba71ff',
    dragon: '#76a3f5ff',
    psychic: '#fa6dffff',
    flying: '#80ffd4ff',
    fighting: '#eb3131ff',
    dark: '#602074ff',
    ghost: '#acacacff',
    normal: '#F5F5F5'
}

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemons(i)
    }
}

const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const resp = await fetch(url)
    const data = await resp.json()
    createPokemonCard(data)
}

const createPokemonCard = (poke) => {
    const card = document.createElement('div')
    card.classList.add("pokemon")

    const name = poke.name[0].toUpperCase() + poke.name.slice(1)
    const id = poke.id.toString().padStart(3, '0')

    const pokeTypes = poke.types.map(type => type.type.name)
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1)
    const color = colors[type]

    card.style.backgroundColor = color

    const pokemonInnerHTML = `
    <div class="pokemon">
        <div class="imgContainer">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
        </div>
        <div class="info">
          <span class="number">#${id}</span>
          <h3 class="name">${name}</h3>
          <small class="type">Tipo: <span>${type}</span></small>
        </div>
      </div>
    
    `

    card.innerHTML = pokemonInnerHTML

    pokeContainer.appendChild(card)
}

fetchPokemons()