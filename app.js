// filterCharacter: 'https://api.disneyapi.dev/character?queryParams',
// getAllCharacters: 'https://api.disneyapi.dev/character',
// getOneCharacter: 'https://api.disneyapi.dev/character/:id'

const urlBase  = 'https://api.disneyapi.dev';
const pages = document.querySelector('#pages')
for(let i = 1; i <= 149; i++){
    const option = document.createElement('option')
    option.innerHTML = i
    pages.appendChild(option)
}
let page = pages.options[pages.selectedIndex].value;
pages.addEventListener('input', () => {
    page = pages.options[pages.selectedIndex].value;
    carregarTudo()
})

const carregarCaracter = async () => {
    const res = await fetch(`${urlBase}/character?page=${page}`);
    const data = await res.json();
    const limitData = data.data.slice(0, 12)
    return {data: limitData};
}

const carregarTudo = async () => {
    const [characters] = await Promise.all([
        carregarCaracter()
    ])
    console.log('Character', characters.data);
    mostrarCaracter(characters.data)
}

 carregarTudo()

function mostrarCaracter(characters){
    const characterContainer = document.getElementById('character-container');
    characterContainer.innerHTML = ' '
    characters.map((character) => {
        const divCharacter = document.createElement('div');
        divCharacter._id = `character - ${character._id}`;
        divCharacter.innerHTML = `
        <img src="${character.imageUrl}" alt="Imagem do personagem" class="img-character">
        <article class="character-info">
            <h3>${character.name}</h3>
            <span>Films - ${character.films.join(', ')}</span>
            <span>Tv Shows - ${character.tvShows.join(', ')}</span>
        </article>
        `
        divCharacter.classList.add('character-box');
        characterContainer.appendChild(divCharacter);
        divCharacter.addEventListener('click', () =>{
            characterDetails(character._id)
            console.log(character._id)
        });
    });
};

function characterDetails(id){
    console.log(id)
    const idEncrypted = encryptId(id);
    console.log(idEncrypted)
    window.location.href = `../pages/character.html?id=${idEncrypted}`
}

function encryptId(id) {
    return id.toString(36)
}