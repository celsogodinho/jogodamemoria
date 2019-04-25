
// Array com as imagens que podem ser usadas no jogo
var imgsCartoes = [
    "cachorro.jpg", "cavalo.jpg", "coala.jpg",  "esquilo.jpg", 
    "pato.jpg", "preguica.jpg",  "tigre.jpg",  "vaca.jpg",  
    "cachorro.jpg", "cavalo.jpg", "coala.jpg", "esquilo.jpg", 
    "pato.jpg", "preguica.jpg",  "tigre.jpg",  "vaca.jpg",              
];

// Objeto que armazena as informações do jogo e de cada cartão
var jogo = {
    'descobertas':0,// informa quantas imagens já foram descobertas
    'idPrimCartao':'',// id do primeiro cartão  virado
    'idSegCartao':'',// id segundo cartão virado
    'imagemVerso': "img/verso.jpg",// Caminho do verso do cartão
    'cartoesViradosCoincidem': false,
    'terminou':function(){
        if(this.descobertas == 16){
            return true;
        } else {
            return false;
        }
    },
};

// Verifica se os cartoes coincidem
function verificaCoincidencia(){

    document.getElementById(jogo.idPrimCartao).classList.remove("animacao");
    document.getElementById(jogo.idSegCartao).classList.remove("animacao");

    jogo.cartoesViradosCoincidem = jogo[jogo.idPrimCartao] == jogo[jogo.idSegCartao];

    if (jogo.cartoesViradosCoincidem){
        jogo.descobertas += 2;
        // removemos o listener de eventos dos cartões descobertos
        document.getElementById(jogo.idPrimCartao).removeEventListener("click", jogar);
        document.getElementById(jogo.idSegCartao).removeEventListener("click", jogar);
        jogo.cartoesViradosCoincidem = false;
    } else { // Os cartões não armazenam a mesma imagem
        // mostrar o verso dos cartões virados (desvirar cartões)
        document.getElementById(jogo.idPrimCartao).src = jogo.imagemVerso;
        document.getElementById(jogo.idSegCartao).src = jogo.imagemVerso;
    }

    // resetamos o id dos cartões virados
    jogo.idPrimCartao = '';
    jogo.idSegCartao = '';
    
}


// Executa a lógica do jogo
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

            // anima os cartões virados por meio de uma classe css
            document.getElementById(jogo.idPrimCartao).classList.add("animacao");
            document.getElementById(jogo.idSegCartao).classList.add("animacao");

            setTimeout(verificaCoincidencia, 1500);
            
        }
    }
}



// Retorna o nome de array de forma aleatória
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
 * Inicialização do jogo
 * Definição das imagens de forma aleatória
 */

for (i=0; i < 4; i++){
    for(j=0; j<4; j++){
        // Monta o id da img do cartao
        let idCartao = 'cartao' + i + j;
        // Obtem o caminho da imagem
        let pathImg = 'img/' + obtemImagem(imgsCartoes);

        /**
         * O objeto jogo terá um atributo igual ao id de cada imagem cujo 
         * valor é o caminho da imagem
         */

        jogo[idCartao] = pathImg;
        document.getElementById(idCartao).src = jogo.imagemVerso;
        document.getElementById(idCartao).addEventListener("click", jogar);
    }
}




