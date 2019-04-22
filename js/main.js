// Objeto que armazena as informações de cada cartão, indexado pelo id do cartã0
var tabuleiro = {};
// informa quantas imagens já foram descobertas
var descobertas = 0;
// armazena o id do primeiro cartão virado
var virado = '';
// Caminho do verso do cartão
var img_verso = "img/verso.jpg";
// Array com as imagens que podem ser usadas no jogo
var imgs_cartoes = [
    "cachorro.jpg", "cavalo.jpg", "coala.jpg",  "esquilo.jpg", 
    "pato.jpg", "preguica.jpg",  "tigre.jpg",  "vaca.jpg",  
    "cachorro.jpg", "cavalo.jpg", "coala.jpg", "esquilo.jpg", 
    "pato.jpg", "preguica.jpg",  "tigre.jpg",  "vaca.jpg",              
];

// Função que executa a lógica do jogo
function jogoMemoria(){
    let id = this.id;
    let cartao = tabuleiro[id];

    if (virado == ''){ // Não há nenhum cartão virado
        // guarda o id do cartão clicado
        virado = id;
        // mostra a imagem do cartão
        this.src = cartao.imagem; 
    } else { // Há um cartão virado
        // Verifica se o cartão anteriormente virado é o clicado agora
        if(virado == id){
            // se foi o mesmo cartão clicado
            // mostramos a imagem de verso e resetamos o virado
            this.src = img_verso;
            virado = '';
        } else { // Um outro cartão foi clicado
            // mostramos a imagem
            this.src = cartao.imagem; 

            // os dois cartões armazenam a mesma imagem
            if (tabuleiro[id].imagem == tabuleiro[virado].imagem){
                // incrementamos o número de cartões descobertos
                descobertas += 2;
                // removemos o listener de eventos dos cartões descobertos
                document.getElementById(id).removeEventListener("click", jogoMemoria);
                document.getElementById(virado).removeEventListener("click", jogoMemoria);
                // resetamos virado
                virado = '';
                if (descobertas >= 16 ){
                    alert('Jogo encerrado');
                }
            } else { // Os cartões não armazenam a mesma imagem
                // mostram o verso
                document.getElementById(id).src = img_verso;
                document.getElementById(virado).src = img_verso;
                virado = '';
            }
        }
    }
}

// Retorna o nome de array de forma aleatória
function obtemImagem(imagens){
    // Quantidade de nomes de imagens contidas no array
    var num_imagens = imagens.length;
    // Obtem uma posição aleatória no array de imagens
    var pos = Math.floor(Math.random() * num_imagens);    
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
        let id_cartao = 'cartao' + i + j;
        // Obtem o caminho da imagem
        let path_img = 'img/' + obtemImagem(imgs_cartoes);

        /**
         * O objeto tabuleiro armazena as informações de cada cartão
         * imagem: o caminho da imagem que aquele elemento armazena
         */

        tabuleiro[id_cartao] = { 
            'imagem':path_img
        };
        document.getElementById(id_cartao).src = img_verso;
        document.getElementById(id_cartao).addEventListener("click", jogoMemoria);
    }
}




