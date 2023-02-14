document.addEventListener('DOMContentLoaded', () => {
    const arrayDeCartas = [
        {
            name:'bomba',
            img:'images/bomba.png'
        },
        {
            name:'bomba',
            img:'images/bomba.png'
        },
        {
            name:'coracao',
            img:'images/coracao.png'
        },
        {
            name:'coracao',
            img:'images/coracao.png'
        },
        {
            name:'escudo',
            img:'images/escudo.png'
        },
        {
            name:'escudo',
            img:'images/escudo.png'
        },
        {
            name:'espada',
            img:'images/espada.png'
        },
        {
            name:'espada',
            img:'images/espada.png'
        },
        {
            name:'estrela',
            img:'images/estrela.png'
        },
        {
            name:'estrela',
            img:'images/estrela.png'
        },
        {
            name:'game',
            img:'images/game.png'
        },
        {
            name:'game',
            img:'images/game.png'
        },
        {
            name:'laranja',
            img:'images/laranja.png'
        },
        {
            name:'laranja',
            img:'images/laranja.png'
        },
        {
            name:'moeda',
            img:'images/moeda.png'
        },
        {
            name:'moeda',
            img:'images/moeda.png'
        },
        {
            name:'pocao',
            img:'images/pocao.png'
        },
        {
            name:'pocao',
            img:'images/pocao.png'
        },
        {
            name:'vinho',
            img:'images/vinho.png'
        },
        {
            name:'vinho',
            img:'images/vinho.png'
        }
    ];
    arrayDeCartas.sort(() => 0.5 - Math.random());
    const grid = document.querySelector('.grid');
    var pontuacao = document.querySelector('#result');
    var cartasEscolhidas = [];
    var cartasEscolhidasId = [];
    var paresFeitos = [];
    //cria a mesa com base no array arrayDeCartas
    function createBoard(){
        for (let i = 0; i < arrayDeCartas.length; i++) {
            var carta = document.createElement('img');
            carta.setAttribute('src', 'images/verso.png');
            carta.setAttribute('data-id', i);
            carta.addEventListener('click',flipCarta);
            grid.appendChild(carta);
        }
    }

    //verificar se as cartas batem
    function verificaCartas(){
        var cartas = document.querySelectorAll('img');
        const clickCartaUm = cartasEscolhidasId[0];
        const clickCartaDois = cartasEscolhidasId[1];

        if(cartasEscolhidas[0] === cartasEscolhidas[1]){
            setTimeout(function(){
                //alert('Vocẽ fez um par!');
                cartas[clickCartaUm].classList.add('desabilitada');
                cartas[clickCartaDois].classList.add('desabilitada');
            },500);
            paresFeitos.push(cartasEscolhidas);
        }else{
            setTimeout(function(){
                //alert('Não foi dessa vez tenta de novo');
                cartas[clickCartaUm].setAttribute('src','images/verso.png');
                cartas[clickCartaDois].setAttribute('src','images/verso.png');
                cartas[clickCartaUm].classList.remove('selecionada');
                cartas[clickCartaDois].classList.remove('selecionada');
            },500)
        }
        cartasEscolhidas = []
        cartasEscolhidasId = []
        pontuacao.textContent = paresFeitos.length;
        setTimeout(function(){
            if(paresFeitos.length === arrayDeCartas.length/2){
                alert('Fim de jogo!');
            }
        },1000)
    }


    //virar a carta
    function flipCarta(){
        if(!this.classList.contains('desabilitada')){
            var cartaId = this.getAttribute('data-id');
            cartasEscolhidas.push(arrayDeCartas[cartaId].name);
            cartasEscolhidasId.push(cartaId);
            this.classList.add('selecionada');

            setTimeout(()=>{
                this.setAttribute('src', arrayDeCartas[cartaId].img);
            },50)
            if(cartasEscolhidas.length === 2){
                verificaCartas();
            }
        }
    }
    //monta o jogo
    createBoard();
});