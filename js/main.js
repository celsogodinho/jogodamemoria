"use strict";
// Esconde a janela modal 
$("#fimJogoModal").modal('hide');

// Número de tentativas do jogador. Cada dois clicks em imagens é contado
// como uma tentativas.
var tentativas;

// Tempo medido em segundos a partir do início do jogo
var tempo;
// retorno do setInterval
var temporizador;

// Número de estrelas. Parâmetro de desempenho do jogador.
var estrelas; 

/**
* @description Registra o número de tentativas na tela
* @param void
* @returns void
*/
function registraTentativas(numTentativas){
    document.getElementById("tentativas").innerHTML = numTentativas;
}

/**
* @description Monta a string que representa o valor atual do temporizador
* @param {number} tempo atual
* @returns {string} valor do temporizador formatado
*/
function tempoAtual(t){
    var min, seg;

    min = Math.floor(t/60);
    seg = t%60;
    // Coloca zero a esquerda
    min = min < 10? "0" + min : min;
    seg = seg < 10? "0" + seg : seg;

    return `${min} min ${seg} s`;
}

/**
* @description Incrementa o tempo do temporizador
* @param void
* @returns void
*/
function incrementaTempo(){
    document.getElementById("tempo").innerHTML = tempoAtual(++tempo);
}

/**
* @description Substitui estrela por estrela vazia baseada em sua posição
* @param {number} posicaoEstrelas
* @returns void
*/
function decrementaEstrela(posicaoEstrela){
    var idEstrela = "estrela" + posicaoEstrela;
    document.getElementById(idEstrela).classList.remove("glyphicon-star");
    document.getElementById(idEstrela).classList.add("glyphicon-star-empty");
}

/**
* @description Registra as estrelas alcançadas pelo jogador no fim do jogo
* @param {number} finalEstrelas
* @returns {string} elmEstrelas
*/
function desempenho(finalEstrelas){
    var elmEstrelas = '';
    for (var i=1; i <= finalEstrelas; i++) {
        elmEstrelas += '<span class="glyphicon glyphicon-star"></span>';
    }

    if (elmEstrelas == ''){
        return 'Nenhuma estrela';
    } else {
        return elmEstrelas;
    }

}

// Objeto que armazena as informações do jogo e de cada cartão
var jogo = {
    'descobertas':0,// informa quantas imagens já foram descobertas
    'idPrimCartao':'',// id do primeiro cartão  virado
    'idSegCartao':'',// id segundo cartão virado
    'imagemVerso': "img/verso.jpg",// Caminho do verso do cartão
    'cartoesViradosCoincidem': false,
    'cartoesDescobertos':[],
    'idCartoes':[],// Id dos cartões
    'terminou':function(){
        if(this.descobertas == 16){
            return true;
        } else {
            return false;
        }
    },
};


/**
* @description Remove listener de click de todos os cartões 
* @param void
* @returns void
*/
function removeEventosTodos(){
    for(var i=0; i < jogo.idCartoes.length; i++) {
        document.getElementById(jogo.idCartoes[i]).removeEventListener("click", jogar);
    }
}

/**
* @description Remove listener de click dos cartões já descobertos
* @param void
* @returns void
*/
function removeEventos(){
    for(var i=0; i < jogo.cartoesDescobertos.length; i++) {
        document.getElementById(jogo.cartoesDescobertos[i]).removeEventListener("click", jogar);
    }    
}

/**
* @description Adiciona listener de clique dos cartões 
* que estão no verso (desvirados)
* @param void
* @returns void
*/
function adicionaEventos(){
    for(var i=0; i < jogo.idCartoes.length; i++) {
        // Verifica se cartão já foi descoberto
        if (jogo.cartoesDescobertos.indexOf(jogo.idCartoes[i]) == -1) {
            document.getElementById(jogo.idCartoes[i]).addEventListener("click", jogar);
        }
        
    }   
}

/**
* @description Verifica se os cartões coincidem e verifica se jogo terminou
* @param void
* @returns void
*/
function verificaCoincidencia(){
    // Segundo clique em imagens diferentes. Registra a jogada
    registraTentativas(++tentativas);
    // Retira estrelas baseado no número de tentativas
    switch (tentativas) {
        case 17: decrementaEstrela(5);
                 estrelas--;
        break;
        case 22: decrementaEstrela(4);
                 estrelas--;
        break;
        case 27: decrementaEstrela(3);
                 estrelas--;
        break;
        case 32: decrementaEstrela(2);
                 estrelas--;
        break;
        case 37: decrementaEstrela(1);
                 estrelas--;
        break;
    }

    document.getElementById(jogo.idPrimCartao).classList.remove("animacao");
    document.getElementById(jogo.idSegCartao).classList.remove("animacao");

    jogo.cartoesViradosCoincidem = jogo[jogo.idPrimCartao] == jogo[jogo.idSegCartao];

    if (jogo.cartoesViradosCoincidem){// Cartões foram descobertos
        jogo.descobertas += 2;
        
        // Adiciona os cartões ao array de descobertos
        jogo.cartoesDescobertos.push(jogo.idPrimCartao);
        jogo.cartoesDescobertos.push(jogo.idSegCartao);
        
        // adiciona o listener de eventos aos cartões não descobertos
        adicionaEventos();
        jogo.cartoesViradosCoincidem = false;
        
    } else { // Os cartões não armazenam a mesma imagem
        // mostrar o verso dos cartões virados (desvirar cartões)
        document.getElementById(jogo.idPrimCartao).src = jogo.imagemVerso;
        document.getElementById(jogo.idSegCartao).src = jogo.imagemVerso;

        // adiciona o listener de eventos aos cartões não descobertos
        adicionaEventos();        
    }

    if(jogo.terminou()){
        // Mostra o tempo final no modal
        document.getElementById("tempoFinal").innerHTML = tempoAtual(tempo);
        // Para temporizador
        clearTimeout(temporizador);
        // Mostra o total de tentativas no modal
        document.getElementById("totalJogadas").innerHTML = tentativas;
        // Mostra as estrelas - parâmetro de desempenho
        document.getElementById("desempenho").innerHTML = desempenho(estrelas);
        // Mostra modal
        $("#fimJogoModal").modal('show');
    }
    // resetamos o id dos cartões virados
    jogo.idPrimCartao = '';
    jogo.idSegCartao = '';
    
}

/**
* @description Executa a lógica do jogo
* @param void
* @returns void 
*/
function jogar(){
    let idCartao = this.id;

    if (jogo.idPrimCartao == ''){ // Não há nenhum cartão virado
        // guarda o id do cartão clicado
        jogo.idPrimCartao = idCartao;
        // mostra a imagem do cartão
        this.src = jogo[idCartao]; 
    } else { // Há um cartão virado
        // Verifica se o cartão anteriormente virado é o clicado agora
        if(jogo.idPrimCartao == idCartao){// cartão virado foi clicado
            // mostramos a imagem de verso e resetamos o virado
            this.src = jogo.imagemVerso;
            jogo.idPrimCartao = '';
        } else { // Um outro cartão foi clicado
            // mostramos a imagem
            this.src = jogo[idCartao]; 
            // seta valor do segundo cartão virado
            jogo.idSegCartao = idCartao;
            
            // Remove eventos de clique de todos os cartões
            // para evitar que usuário vire mais cartões
            removeEventosTodos();

            // anima os cartões virados por meio de uma classe css
            document.getElementById(jogo.idPrimCartao).classList.add("animacao");
            document.getElementById(jogo.idSegCartao).classList.add("animacao");

            setTimeout(verificaCoincidencia, 1500);
            
        }
    }
}

/**
* @description Retorna o nome de um array de forma aleatória
* @param {array} imagens
* @returns {string} img
*/
function obtemImagem(imagens){
    // Quantidade de nomes de imagens contidas no array
    var numImagens = imagens.length;
    // Obtem uma posição aleatória no array de imagens
    var pos = Math.floor(Math.random() * numImagens);    
    // Guarda a imagem a ser retornada
    var img = imagens[pos];
    // Remove o nome da imagem do array
    imagens.splice(pos, 1);

    return img;
}

/**
* @description Inicialização do jogo
* @param void
* @returns void 
*/
function inicializaJogo() {
    estrelas = 5;
    tentativas = 0;
    jogo.idPrimCartao = '';
    jogo.idSegCartao = '';
    tempo = 0;
    jogo.descobertas = 0;
    jogo.cartoesDescobertos = [];
    jogo.idCartoes = [];

    for(var i=1; i<=5; i++){
        let idEst = "estrela" + i;
        // remove as classes de estrela caso elas existam
        document.getElementById(idEst).className = ""; 
        // Insere as classes de estrela preenchida       
        document.getElementById(idEst).classList.add("glyphicon");
        document.getElementById(idEst).classList.add("glyphicon-star");
    }

    // Array com as imagens que podem ser usadas no jogo
    let imgsCartoes = [
        "cachorro.jpg", "cavalo.jpg", "coala.jpg",  "esquilo.jpg", 
        "pato.jpg", "preguica.jpg",  "tigre.jpg",  "vaca.jpg",  
        "cachorro.jpg", "cavalo.jpg", "coala.jpg", "esquilo.jpg", 
        "pato.jpg", "preguica.jpg",  "tigre.jpg",  "vaca.jpg",              
    ];

    for (let i=0; i < 4; i++){
        for(let j=0; j<4; j++){
            // Monta o id da img do cartao
            let idCartao = 'cartao' + i + j;
            // Obtem o caminho da imagem
            let pathImg = 'img/' + obtemImagem(imgsCartoes);
    
            // O objeto jogo terá um atributo igual ao id de cada imagem cujo 
            // valor é o caminho da imagem
            jogo[idCartao] = pathImg;
            jogo.idCartoes.push(idCartao);
            document.getElementById(idCartao).src = jogo.imagemVerso;
            document.getElementById(idCartao).addEventListener("click", jogar);
        }
    }
    
    registraTentativas(tentativas);
    // Executa o incremento de tempo de 1 em 1 segundo
    temporizador = setInterval(incrementaTempo, 1000);
}

// Inicializa o jogo
inicializaJogo();

// Botão iniciar jogo
document.getElementById("reiniciar").addEventListener("click", inicializaJogo);
// Botão jogar novamente do modal
document.getElementById("jogarNovamente").addEventListener("click", inicializaJogo);


