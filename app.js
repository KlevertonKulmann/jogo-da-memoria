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
    var score = 1;
    var tentativas = document.getElementById('tries');
    var estrelas = document.querySelectorAll('.estrela');

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
        var cartas = document.querySelectorAll('.grid img');
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
                endgame();
            }
        },1000)
    }

    //tela de fim de jogo
    function endgame() {
        var modal = document.createElement('div');
        var estrelasFinal = document.querySelectorAll('.estrelas .estrela');
        score = score - 1;
        modal.classList.add('modal')
        modal.innerHTML = `
        <div class="content">
            <h2>PARABÉNS!</h2>
            <h3>Você encontrou todos os pares</h3>
            <h3>Levou: ${score} tentativas</h3>
            <h3>E alcançou a marca de:</h3>
            <div class="resultadoFinal">
                <img src="${estrelasFinal[0].getAttribute('src')}">
                <img src="${estrelasFinal[1].getAttribute('src')}">
                <img src="${estrelasFinal[2].getAttribute('src')}">
            </div>
            <h3>Estrelas</h3>
            <a href="#" class="btn btn-default btnPlayAgain">Jogar novamente</a>
        </div>        
        `;
        document.querySelector('body').appendChild(modal);
        var btn = document.querySelector('.btnPlayAgain');
        btn.addEventListener('click',playAgain)
    }
    //relação de tentativas x estrelas
    function highScore(){
        tentativas.textContent = score++;
        if(score > 45){
            estrelas[2].setAttribute('src','images/scoreEmpty.png')
        }else if(score > 40){
            estrelas[2].setAttribute('src','images/scoreHalf.png')
        }else if(score > 35){
            estrelas[1].setAttribute('src','images/scoreEmpty.png')
        }else if(score > 30){
            estrelas[1].setAttribute('src','images/scoreHalf.png')
        }else if(score > 25){
            estrelas[0].setAttribute('src','images/scoreEmpty.png')
        }else if(score > 20){
            estrelas[0].setAttribute('src','images/scoreHalf.png')
        }
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
                highScore()
            }
        }
    }

    function playAgain(){
        window.location.reload()
    }

    //monta o jogo
    createBoard();
});