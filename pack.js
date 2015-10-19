(function() {
	var CONST_NAIPES = ['Ouro', 'Espada', 'Copas', 'Paus'];
	var CONST_VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Q', 'J', 'K'];

	function Carta(iValue, iNaipe){
		this.value = CONST_VALUES[iValue];
		this.naipe = CONST_NAIPES[iNaipe];
		
		this.toString = function(){
			return this.value + " | " + this.naipe;
		}
	}

	function Baralho(){
		this.cartas = [];
		for(var i = 0; i < CONST_VALUES.length; i++)
			for(var j = 0; j < CONST_NAIPES.length; j++)
				this.cartas.push(new Carta(i, j));
			
		this.getNaipe = function(carta){
			if (!carta.__proto__ === Carta.prototype)
				throw "The parameter value is not a 'Carta' object.";
				
			return carta.naipe;
		}
		
		this.getValue = function(carta){
			if (!carta.__proto__ === Carta.prototype)
				throw "The parameter value is not a 'Carta' object.";
				
			return carta.value;
		}
		
		this.printAllCards = function(){
			if(!this.__proto__ === Baralho.prototype)
				throw "The parameter value is not a 'Carta' object.";
			
			for(var i = 0; i < this.cartas.length; i++)
				console.log(this.cartas[i].toString());
		}
		
		this.shuffle = function(){
			this.cartas = Shuffle(this.cartas);
		}
		
		function Shuffle(v){
			for(var j, x, i = v.length; i; j = Math.floor(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
			return v;
		}
	}
	
	//Exporting
	window.Baralho = Baralho;
})();
