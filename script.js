
//----ÍNICIO JS JONAS----//

let perguntas;
let Resposta;
let Imagem;
let pontos = 0;
let clicks = 0;
let nivel = 0;
let niveis = [];
let novoquizz = {};
let quizz = [];
const ObterQuizzes = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')
TodosOsQuizzes = document.querySelector('section')
ObterQuizzes.then(InserirQuizzes)
BotaoCriar = document.querySelector(".ListaQuizzes")
CriarQuizz = document.querySelector('.CriarQuizz')
CapaTitulo = document.querySelector('.PaginaDeUmQuizz')


function InserirQuizzes(resposta) {
    console.log(resposta.data)
    for (i = 0; i < resposta.data.length; i++) {
        TodosOsQuizzes.innerHTML = TodosOsQuizzes.innerHTML + `<div  onclick = 'EscolherQuizz(this)'class='quiz' id=${resposta.data[i].id}><img style ='background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url(${resposta.data[i].image});' src=${resposta.data[i].image}></img><p>${resposta.data[i].title}</p></div>`
        // TodosOsQuizzes.innerHTML='<h1>Todos os Quizzes</h1>'
    }
    // console.log(resposta.data)
}




function EscolherQuizz(elemento) {
    BuscarQuizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${elemento.id}`)
    document.querySelector(".ListaQuizzes").classList.add('escondido')
    BuscarQuizz.then(MostrarQuizz)

}

function shuffleArray(arr) {
    // Loop em todos os elementos
    for (let i = arr.length - 1; i > 0; i--) {
        // Escolhendo elemento aleatório
        const j = Math.floor(Math.random() * (i + 1));
        // Reposicionando elemento
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Retornando array com aleatoriedade
    return arr;
}

function MostrarQuizz(elemento) {
    nivel = elemento.data.levels
    perguntas = elemento.data.questions
    CapaTitulo.innerHTML = `<div class='capa'><img src="${elemento.data.image}" alt=""></img></div><h3>${elemento.data.title}</h1>`

    // console.log(perguntas[0].answers[0].image)
    for (let i = 0; i < perguntas.length; i++) {
        shuffleArray(perguntas[i].answers)
        CapaTitulo.innerHTML += `<div class='perguntas'><div class='pergunta'><h1>${perguntas[i].title}</h1></div><div class='imagens'></div></div>`
        Pergunta = document.querySelectorAll('.pergunta')
        Pergunta[i].style.background = `${perguntas[i].color}`
        Resposta = document.querySelectorAll('.imagens')
        for (let j = 0; j < perguntas[i].answers.length; j++) {

            Resposta[i].innerHTML += `<div class='imagem'><img class='resp' onclick='VerificarResposta(this)' id='${perguntas[i].answers[j].isCorrectAnswer}' src='${perguntas[i].answers[j].image}'></img><p>${perguntas[i].answers[j].text}</p></div>`
        }

    }
    // console.log(Resposta[0].innerHTML)


}

function VerificarResposta(elemento) {
    clicks += 1
    ArrayPerguntas = document.querySelectorAll('.perguntas')

    // console.log(elemento.parentNode.parentNode.parentNode.parentNode.children)
    Imagem = elemento.parentNode.parentNode.children
    divPergunta = Imagem[0].parentNode.parentNode
    // console.log(Imagem[0])
    if (elemento.id === 'true') {
        pontos += 1
        for (let i = 0; i < Imagem.length; i++) {
            Imagem[i].children[0].removeAttribute('onclick')
            Imagem[i].children[0].style.opacity = '0.3'
            Imagem[i].children[1].style.color = 'red'
            console.log(divPergunta === ArrayPerguntas[i])
        }
        elemento.parentNode.children[1].style.color = 'green'
        elemento.style.opacity = '1'
        function Scrol1() {
            if (divPergunta !== ArrayPerguntas[ArrayPerguntas.length - 1]) {
                divPergunta.nextElementSibling.scrollIntoView();
            }
        }

        setTimeout(Scrol1, 2000)
    }

    else if (elemento.id === 'false') {
        for (let i = 0; i < Imagem.length; i++) {
            Imagem[i].children[0].removeAttribute('onclick')
            Imagem[i].children[0].style.opacity = '0.3'
            Imagem[i].children[1].style.color = 'red'

            elemento.style.opacity = '1'
            if (Imagem[i].children[0].id === 'true') {
                Imagem[i].children[1].style.color = 'green'
            }
        }
        function Scrol() {
            if (divPergunta !== ArrayPerguntas[ArrayPerguntas.length - 1]) {
                divPergunta.nextElementSibling.scrollIntoView();
            }
        }
        setTimeout(Scrol, 2000)

    }




    if (clicks === perguntas.length) {
        console.log(nivel.length)
        for (let i = 1; i < nivel.length; i++) {
            if (pontos / perguntas.length * 100 < nivel[i].minValue) {
                CapaTitulo.innerHTML += ` <div class="resultado"><div class="titulo">${Math.round(pontos / perguntas.length * 100)}% de acerto: ${nivel[i - 1].title}</div><div class="ImagemFim"><img src='${nivel[i - 1].image}'></img><p>${nivel[i - 1].text}</p></div></div>` + `<button class="reiniciar" onclick='reinicar()' >Reiniciar Quizz</button><button onclick ='home()' class="voltar">Voltar para Home</button>`
                break
            }

            else if (pontos / perguntas.length * 100 >= nivel[nivel.length - 1].minValue) {
                CapaTitulo.innerHTML += ` <div class="resultado"><div class="titulo">${Math.round(pontos / perguntas.length * 100)}% de acerto: ${nivel[nivel.length - 1].title}</div><div class="ImagemFim"><img src='${nivel[nivel.length - 1].image}'></img><p>${nivel[nivel.length - 1].text}</p></div></div>` + `<button class="reiniciar" onclick='reinicar()'>Reiniciar Quizz</button><button onclick ='home()' class="voltar">Voltar para Home</button>`
                break
            }
        }
        function Scrol3() {
            document.querySelector('.resultado').scrollIntoView();
        }

        setTimeout(Scrol3, 2000)

    }
}

let ars
function reinicar() {
    ars = document.querySelectorAll('.resp')
    for (let i = 0; i < ars.length; i++) {
        ars[i].setAttribute('onclick', 'VerificarResposta(this)')
        ars[i].style.opacity = '1'
        ars[i].parentNode.children[1].style.color = 'black'

    }

    for (let j = 0; j < perguntas.length; j++) {
        shuffleArray(perguntas[j].answers)
    }
    pontos = 0
    clicks = 0
    document.querySelector('.pergunta').scrollIntoView()
    CapaTitulo.children[CapaTitulo.children.length - 1].outerHTML = ''
    CapaTitulo.children[CapaTitulo.children.length - 1].outerHTML = ''
    CapaTitulo.children[CapaTitulo.children.length - 1].outerHTML = ''

}

//-------FIM JS JONAS------//



function comecarQuizz() { //-----TELA1-------//
    const tela1 = document.querySelector('.CriarTela1');
    const tela2 = document.querySelector('.CriarTela2');
    const esconderh1 = document.querySelector('.CriarQuizz h1');
    esconderh1.classList.add('escondido');
    tela1.classList.add('escondido');
    tela2.classList.remove('escondido');
}

function irParaTelaDeCriarNiveis() { //-----TELA2-------//
    const tela2 = document.querySelector('.CriarTela2');
    const tela3 = document.querySelector('.tela3'); tela2.classList.add('escondido');
    tela3.classList.remove('sumir');

}

function irtela4() {
    const tela3 = document.querySelector('.tela3');
    tela3.classList.add('escondido');
    const tela4 = document.querySelector(".tela4");
    tela3.classList.add('sumir');
    tela4.classList.remove('sumir');
}

function addobjetos() { //---adicionar niveis do quizz ---//
    console.log("adicionar info array");

    if (nivel == 0) {
        novoquizz[nivel] = novoquizz[nivel] + { title: `${document.querySelector(".titulonivel").value}` };
        novoquizz[nivel] = novoquizz[nivel] + { minValue: `${Number(document.querySelector(".per").value)}` };
        novoquizz[nivel] += { image: `${document.querySelector(".url").value}` };
        novoquizz[nivel] += { text: `${document.querySelector(".descricao").value}` };

        novoquizz[nivel]=novoquizz[nivel] + (`{title:${document.querySelector(".titulonivel").value}}`);
        novoquizz=novoquizz.push({ minValue: `${Number(document.querySelector(".per").value)}` });

        console.log(novoquizz);
    }
    else if (nivel == 1) {
        const x = document.querySelector(".titulonivel").value;
        let y = Number(document.querySelector(".per").value);
        const z = document.querySelector(".url").value;
        const w = document.querySelector(".descricao").value;
        novoquizz[nivel] = novoquizz[nivel] + { title: `${x},` };
        novoquizz[nivel] = novoquizz[nivel] + { minValue: `${y},` };
        novoquizz[nivel] += { image: `${z},` };
        novoquizz[nivel] += { text: `${w}` };
    }
    else if (nivel == 2) {
        const x = document.querySelector(".titulonivel").value;
        let y = Number(document.querySelector(".per").value);
        const z = document.querySelector(".url").value;
        const w = document.querySelector(".descricao").value;
        novoquizz[nivel] = novoquizz[nivel] + { title: `${x},` };
        novoquizz[nivel] = novoquizz[nivel] + { minValue: `${y},` };
        novoquizz[nivel] += { image: `${z},` };
        novoquizz[nivel] += { text: `${w}` };
    }
    console.log(novoquizz);
    console.log(document.querySelector(".titulonivel").value);

}

function pagquizz() {
    console.log("mandar para a página do quizz criado");
    /* const tela2 = document.querySelector('.CriarTela2');
     const tela4 = document.querySelector(".tela4");
     tela4.classList.add('sumir');
     tela2.classList.remove('escondido');
     console.log('tela 2');*/
}
function home() {
    console.log('voltar tela 1 - home');
    window.location.reload()
}
function criarquizz() {
    const listaquizzes = document.querySelector('.ListaQuizzes');
    const CriarQuizz = document.querySelector('.CriarQuizz');
    listaquizzes.classList.add('escondido')
    CriarQuizz.classList.remove('escondido')
    promisse = ObterQuizzes;
    promisse.then(console.log('quizzes carregados'));
}
function newlevel2() {
    nivel++;
    const level = document.querySelector(".n2");
    level.innerHTML = '';
    level.innerHTML += `<title>Nível 2</title><input data-ls-module="charCounter" class="titulonivel" type=" text" minlength="10"
        placeholder="Título do nível" />
    <input class="per" type="number" min="0" max="100" placeholder="% de acerto mínima" />
    <input class="url" type="url" placeholder="URL da imagem do nível" />
    <input data-ls-module="charCounter" class="descricao" type="text" minlength="30"
        placeholder="Descrição do nível">`;
}
function newlevel3() {
    nivel++;
    const level = document.querySelector(".n3");
    level.innerHTML = '';
    level.innerHTML += `<title>Nível 3</title><input data-ls-module="charCounter" class="titulonivel" type=" text" minlength="10"
        placeholder="Título do nível" />
    <input class="per" type="number" min="0" max="100" placeholder="% de acerto mínima" />
    <input class="url" type="url" placeholder="URL da imagem do nível" />
    <input data-ls-module="charCounter" class="descricao" type="text" minlength="30"
        placeholder="Descrição do nível">`;
}
// inicio ana
let objetoQuizz = {
    title: '',
    image: '',
    questions: [],
    levels: []
}
function validarURL(string) {
    try {
        let url = new URL(string);
        return true;
    } catch (err) {

    }
}

function irParaTelaDeCriarPerguntas() {
    const tituloQuizz = document.querySelector('.titulo-quizz').value;
    const URLimg = document.querySelector('.urlImgQuizz').value;
    const QtdPperguntas = parseInt(document.querySelector('.qtdDePreguntas').value);
    const qtdNiveis = parseInt(document.querySelector('.qtdDeNiveis').value);

    objetoQuizz = {
        title: tituloQuizz,
        image: URLimg,
        questions: QtdPperguntas,
        levels: qtdNiveis
    }
    console.log(objetoQuizz);


    if (tituloQuizz.length > 20 && tituloQuizz.length <= 65 && validarURL(URLimg) && QtdPperguntas >= 3 && qtdNiveis >= 2) {
        comecarQuizz();
    } else {
        alert('Dados inseridos incorretamente')
    }
}
