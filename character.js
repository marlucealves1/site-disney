function descryptId(id){
    return parseInt(id, 36)
}

async function carregarCaracter(baseUrl, id){
    try {
        const response = await fetch(`${baseUrl}/${id}`)
        if(!response){
            throw new Error('Erro ao carregar o personagem')
        }
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

async function carregarTudo() {
    const urlParam = new URLSearchParams(window.location.search)
    const idParam = urlParam.get('id')

        if(!idParam){
            console.log('ID não encontrado na URL')
            return
        }
    const URL = 'https://api.disneyapi.dev/character'

    const idDescryted = descryptId(idParam)

    try {
        const character = await carregarCaracter(URL, idDescryted)
        renderizarPersonagem(character.data)
    } catch (error) {
        console.log(error)
    }
}

carregarTudo()

async function renderizarPersonagem(character){
    const characterBox = document.querySelector('#character')
    const img = document.querySelector('.img')
    const allies = document.querySelector('.allies')
    const shortFilms = document.querySelector('.shortFilms')
    const parkAttractions = document.querySelector('.parkAttractions')
    const videoGames = document.querySelector('.videoGames')
    const name = document.querySelector('.name')

    characterBox.classList.add('character-box')
    name.innerHTML = character.name
    img.src = character.imageUrl
    allies.innerHTML += character.allies
    shortFilms.innerHTML += character.shortFilms
    parkAttractions.innerHTML += character.parkAttractions
    videoGames.innerHTML += character.videoGames
}