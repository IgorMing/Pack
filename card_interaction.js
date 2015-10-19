(function() {
	var VALUES = { "4" : 0, "5" : 1, "6" : 2, "7" : 3, "Q" : 4, "J" : 5, "K" : 6, "A" : 7, "1" : 8, "2" : 9, "3" : 10};
	var NAIPES = {"Ouro" : 0, "Espada" : 1, "Copas" : 2, "Paus" : 3};
	var DEFAULT_QTS_JOGADORES = 2;
	
	var _qtdJogadores;
	
	cartasNaMao = 3;
	rodada = 1;
	baralho = new Baralho();

	function cartas_para_truco(){
		for(var i = 0; i < baralho.cartas.length; i++){
			if(baralho.cartas[i].value === '8' ||
				baralho.cartas[i].value === '9' ||
				baralho.cartas[i].value === '10'){
				baralho.cartas.splice(i, 1);
				--i;
			}
		}
	}

	function embaralhar(){
		baralho.shuffle();
	}

	function geraCartas(){
		var id = 0;
		for(var i = 1; i <= _qtdJogadores; i++){
			for(var c = 1; c <= cartasNaMao; c++){
				var carta = criaElemento('button', 'jog' + i + '_card' + c + '|' + id);
				carta.innerHTML = 'Card ' + c;
				carta.setAttribute('onclick', 'verCarta(this);');
				carta.className = 'hideCard';
				incluiNaMesa(carta, i);
				++id;
			}
		}
	}

	function verCarta(obj){
		obj.className = 'showCard';
		obj.disabled = true;
		document.getElementById('mesa_jog'+getIdPlayer(obj)).innerHTML = baralho.cartas[getIndexCarta(obj.id)];
	}

	function verificaMesa(){
		
	}

	function getIdPlayer(carta){
		return carta.parentNode.id.slice(-1);
	}

	function getIndexCarta(cartaId){
		a = cartaId;
		return cartaId.split('|')[1];
	}

	function criaElemento(tipo, id){
		var el = document.createElement(tipo);
		if(id !== undefined)
			el.setAttribute('id', id);
		return el;
	}
	
	function limpaMesa(){
		var cartasEmMesa = document.getElementsByTagName('pre');
		
		for(var i = 0; i < _qtdJogadores; i++){
			document.getElementById('jog' + (i+1)).innerHTML = cartasEmMesa[i].innerHTML = '';
		}
	}

	function incluiNaMesa(obj, jog){
		if (obj.tagName === undefined)
			throw "Esse objeto não é válido " + obj;

		var doc = document.getElementById('jog' + jog).appendChild(obj);
	}
	
	function inicio(qtdJogadores, embaralha){
		
		_qtdJogadores = (typeof qtdJogadores === 'undefined') ? DEFAULT_QTS_JOGADORES : qtdJogadores;
		
		if (typeof embaralha === 'undefined' || typeof embaralha !== 'boolean')
			embaralha = true;
		
		limpaMesa();
		
		if(embaralha)
			embaralhar();
		
		geraCartas();
	}
	
	// Exporting functions
	window.cartas_para_truco = cartas_para_truco;
	window.inicio = inicio;
	window.verCarta = verCarta;
})();