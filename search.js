
const urlBase = 'https://api.disneyapi.dev/character'

async function carregarOpcoes(url){
    try {
        const response = await fetch(url)
        if(!response){
            throw new Error('URL não encontrada')
        }
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

// async function carregarPersonagem(url, id){
//     try {
//         const response = await fetch(`${url}/${id}`)
//         if(!response){
//             throw new Error('Personagem não encontrado')
//         }
//         const res = response.json()
//         await gerarPersonagem(res)
//     } catch (error) {
//         console.log(error)
//     }
// }

const carregarTudo = async () => {
    try {
        const response = await carregarOpcoes(urlBase)
        if(!response){
            throw new Error('falha ao carregar')
        }
        gerarOpcoes(response.data)
    } catch (error) {
        console.log(error)
    }
}

const carregarTudo2 = async (id) => {
    try {
        const response = await carregarOpcoes(`${urlBase}/${id}`)
        if(!response){
            throw new Error('falha ao carregar')
        }
        gerarPersonagem(response.data)
    } catch (error) {
        console.log(error)
    }
}

const gerarOpcoes = (data) => {
    data.map((opcao) => {
        const select = document.querySelector('#search')
        let option = document.createElement('option')
        option.value = opcao._id
        option.innerHTML = opcao.name
        select.appendChild(option)
    })
}

const gerarPersonagem = (data) => {
    const name = document.querySelector('#name-search')
    const films = document.querySelector('#films-search')
    const shortFilms = document.querySelector('#shortFilms-search')
    const tvShows= document.querySelector('#tvShows-search')
    const videoGames = document.querySelector('#videoGames-search')
    const img = document.querySelector('#img-search')
    container.classList.remove('display2')
    container.classList.add('display1')
    console.log(data)
    img.src = data.imageUrl
    name.innerHTML = data.name
    films.innerHTML = data.films
    shortFilms.innerHTML = data.shortFilms
    tvShows.innerHTML = data.tvShows
    videoGames.innerHTML = data.videoGames
}

const container = document.querySelector('#container-search')
const select = document.querySelector('#search')

const btn  = document.querySelector('#send')
btn.addEventListener('click', () => {
    let option = select.options[select.selectedIndex].value;
    if(option === 'choice'){
        alert('selecione uma opção')
        container.classList.remove('display1')
        container.classList.add('display2')
    }else {
        carregarTudo2(option)
    }
})

carregarTudo()

