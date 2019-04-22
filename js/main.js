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

var img_verso = "verso.jpg";

var imgs_cartoes = [
    "cachorro.jpg", "cavalo.jpg", "coala.jpg",  "esquilo.jpg", 
    "pato.jpg", "preguica.jpg",  "tigre.jpg",  "vaca.jpg",  
    "cachorro.jpg", "cavalo.jpg", "coala.jpg", "esquilo.jpg", 
    "pato.jpg", "preguica.jpg",  "tigre.jpg",  "vaca.jpg",              
];

var tabuleiro = [];

for (i=0; i < 4; i++){
    for(j=0; j<4; j++){
        // Monta o id da img do cartao
        let id_cartao = 'cartao' + i + j;
        // Obtem o caminho da imagem
        let path_img = 'img/' + obtemImagem(imgs_cartoes);
        console.log(id_cartao);
        console.log(path_img);
        // Seta o array como os paramentros do cartão
        /*
        tabuleiro[i][j] = {
            'path_img' : path_img,
        };*/
        document.getElementById(id_cartao).src = path_img;
    }
}




