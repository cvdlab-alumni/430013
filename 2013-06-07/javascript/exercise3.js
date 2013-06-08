//EXERCISE 1

///----- funzioni di supporto ------///
function rgb(color){
	return [color[0]/255, color[1]/255, color[2]/255];
}

function extrude(obj, h){
	return EXTRUDE([h])(obj);
}

function punti_cerchio_bezier(r){
	var c = [[0,1,0],[1.6,1,0],[1.6,-1.5,0],[0,-1.5,0],[-1.6,-1.5,0],[-1.6,1,0],[0,1,0]];
	for(var i=0;i<c.length;i++)
			for(var k=0;k<c[i].length;k++)
			c[i][k] = c[i][k]*r;
	return c;
}

//cuboid di base
var cuboid_base = T([0,1,2])([-40,-40,-4.5])(CUBOID([80,80,5]));
var marrone = [ 160, 82, 45]	

//funzione che mi genera un piano 3D modellato
function piano(punto){
	var u = punto[0]
	var v = punto[1]
	var z = ((u/v)*(u+v)%5)+(Math.random())

 	return [u,v,z];
}

var dominio = DOMAIN([[-40, 40], [-40, 40]])([40,40]);

var terreno = COLOR(rgb(marrone))(STRUCT([MAP(piano)(dominio),cuboid_base]))

DRAW(terreno)

//EXERCISE 2
var cobalto = [0,123,167]

var lago1 = COLOR(rgb(cobalto))(extrude(SIMPLICIAL_COMPLEX([[5,-12],[4,-40],[35,-40]])([[0,1,2]]),3))
var lago2 = COLOR(rgb(cobalto))(T([0,1,2])([17,32,0])(CUBOID([12,8,2])))

DRAW(lago1)
DRAW(lago2)

//EXERCISE 3
function genera_alberi_random(area_x,area_y,num){
	var dom2D = PROD1x1([INTERVALS(1)(16),INTERVALS(1)(16)]);
	var marr = [138,51,36]
	var verde = [1,50,32]
	var verde_chiaro = [34,139,34]

	//definizione albero
	var curva_ab = BEZIER(S0)([[0,0, 1.76], [0.13,0, 1.04], [0.44,0, 0.23], [0.65,0, 0]])
	var base = BEZIER(S1)(punti_cerchio_bezier(1))

	var prod_ab = T([2])([0.3])(MAP(PROFILEPROD_SURFACE([curva_ab,base]))(dom2D))

	//tronco
	var disco = COLOR(rgb(marr))(extrude(DISK(0.1)([20, 2]),0.7))
	var albero_scuro = T([2])([0.5])(STRUCT([COLOR(rgb(verde))(prod_ab),disco]))
	var albero_chiaro = T([2])([0.5])(STRUCT([COLOR(rgb(verde_chiaro))(prod_ab),disco]))

	var array = new Array()
	// array[0] = albero
	for(i=0;i<num;i++){
		var random_scala = Math.random()*1.5
		if(i%2)
			var oggetto_t = S([0,1,2])([random_scala,random_scala,random_scala])(albero_chiaro)
		else
			var oggetto_t = S([0,1,2])([random_scala,random_scala,random_scala])(albero_scuro)

		if(area_x<0 && area_y>0){
			var x = area_x+Math.random()*10
			var y = area_y-Math.random()*10
		}

		else {
			var x = area_x-Math.random()*10
			var y = area_y+Math.random()*10
		}
		
		//se il valore random è compreso nell'area scelta allora posso andare avanti, altrimenti devo generare nuovamente la x e la y
		if(((area_x<0 && x>=area_x) && (area_y>0 && y<=area_y)) || ((area_x>0 && x<=area_x) && (area_y<0 && y>=area_y))){
			var random_x = T([0,1])([x,y])(oggetto_t)
			array.push(random_x)
		}
		//nel caso in cui lo voglio in una posiz precisa, metto numeri positivi e in seguito li traslo io dove servono
		else if((area_x>0) && (area_y>0)){
			for(k=0;k<num;k++){
				if(k%2)
					var posizionamento = T([0,1])([area_x+k,area_y+k/10])(albero_scuro)
				else
					var posizionamento = T([0,1])([area_x+k,area_y+k/10])(albero_chiaro)
			array.push(posizionamento)
			}
		}
		else
			i--;
	}

	var random = T([0,1])([area_x,area_y])(STRUCT(array))

	return random;
}
//parte lago grande
DRAW(genera_alberi_random(10,-5,30))
DRAW(genera_alberi_random(15,-10,30))
DRAW(genera_alberi_random(18,-15,30))
DRAW(genera_alberi_random(18,-5,30))

//parte lago piccolo
DRAW(genera_alberi_random(-5,10,40))
DRAW(genera_alberi_random(-10,20,40))
DRAW(genera_alberi_random(-10,15,40))

//affianco cittadina
DRAW(T([0,1])([-10,-35])(genera_alberi_random(1,1,6)))
DRAW(T([0,1])([-25,-37])(genera_alberi_random(1,1,6)))
