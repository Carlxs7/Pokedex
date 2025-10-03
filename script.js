const pokeContainer = document.querySelector("#pokeContainer");
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const clearBtn = document.querySelector("#clearBtn");
const pokemonCount = 1000;
const colors = {
    normal: '#A8A77A',
fire: '#EE8130',
water: '#6390F0',
electric: '#F7D02C',
grass: '#7AC74C',
ice: '#96D9D6',
fighting: '#C22E28',
poison: '#A33EA1',
ground: '#E2BF65',
flying: '#A98FF3',
psychic: '#F95587',
bug: '#A6B91A',
rock: '#B6A136',
ghost: '#735797',
dragon: '#6F35FC',
dark: '#705746',
steel: '#B7B7CE',
fairy: '#D685AD'
};

const statNames = {
    hp: 'HP',
    attack: 'ATK',
    defense: 'DEF',
    'special-attack': 'SP.ATK',
    'special-defense': 'SP.DEF',
    speed: 'SPD'
};

const mainTypes = Object.keys(colors);
let allPokemons = [];

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemons(i);
    }
};

const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const resp = await fetch(url);
    const data = await resp.json();
    allPokemons.push(data);
    createPokemonCard(data);
};

const createPokemonCard = (poke) => {
    const card = document.createElement('div');
    card.classList.add("pokemon");
    card.setAttribute('data-name', poke.name.toLowerCase());
    card.setAttribute('data-id', poke.id);
    
    const name = poke.name[0].toUpperCase() + poke.name.slice(1);
    const id = poke.id.toString().padStart(3, '0');
    const pokeTypes = poke.types.map(type => type.type.name);
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1);
    const color = colors[type];
    card.style.backgroundColor = color;
    
    const statsHTML = poke.stats.map(stat => {
        const statName = statNames[stat.stat.name] || stat.stat.name.toUpperCase();
        const statValue = stat.base_stat;
        return `
            <div class="stat">
                <span class="stat-name">${statName}</span>
                <span class="stat-value">${statValue}</span>
            </div>
        `;
    }).join('');
    
    const pokemonInnerHTML = `
    <div class="pokemon-inner">
        <div class="imgContainer">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
        </div>
        <div class="info">
          <span class="number">#${id}</span>
          <h3 class="name">${name}</h3>
          <small class="type">Tipo: <span>${type}</span></small>
        </div>
        <div class="stats">
            <h4>Status Base</h4>
            ${statsHTML}
        </div>
    </div>
    `;
    
    card.innerHTML = pokemonInnerHTML;
    pokeContainer.appendChild(card);
};

const searchPokemon = () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.pokemon');
    
    if (searchTerm === '') {
        cards.forEach(card => card.style.display = 'block');
        return;
    }
    
    cards.forEach(card => {
        const name = card.getAttribute('data-name');
        const id = card.getAttribute('data-id');
        
        if (name.includes(searchTerm) || id === searchTerm || id.padStart(3, '0') === searchTerm) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
};

const clearSearch = () => {
    searchInput.value = '';
    const cards = document.querySelectorAll('.pokemon');
    cards.forEach(card => card.style.display = 'block');
};

searchBtn.addEventListener('click', searchPokemon);
clearBtn.addEventListener('click', clearSearch);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchPokemon();
    }
});

fetchPokemons();