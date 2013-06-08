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



///EXERCISE 4
var grigio = [239,239,239]
var sabbia = [184,115,51]
//funzione che mi inverte il segno di tutti i punti
function inverti_segno(punti){
return punti.map(function(item){ return -item });
}

function rgba(color){
	return [color[0]/255, color[1]/255, color[2]/255, color[3]/100];
}

// muro con finestra
//punto iniziale = punto in basso a sinistra
//punto finale = punto il alto a destra
//tipo = 1 -> allora e' una finestra, altrimenti 0 e disegno la porta
function muro_con_buco(spessore_muro,punto_iniziale,punto_finale,lungh_muro,altezza_muro,tipo,colore){
	var x1 = [ punto_iniziale[0], -(punto_finale[0]-punto_iniziale[0]) ];
	if (lungh_muro-punto_finale[0]>0)
		x1[2] = lungh_muro-punto_finale[0];

	var z2 = [ punto_iniziale[1], -(punto_finale[1]-punto_iniziale[1]) ];
	if (altezza_muro-punto_finale[1]>0)
		z2[2] = altezza_muro-punto_finale[1];

	var s_g_1 = SIMPLEX_GRID([x1,[spessore_muro],[altezza_muro]]);
	var s_g_2 = SIMPLEX_GRID([inverti_segno(x1),[spessore_muro],z2]);

	//creazione della finestra/porta
	var cuboid_per_fin = CUBOID([punto_finale[0]-punto_iniziale[0],spessore_muro/2,punto_finale[1]-punto_iniziale[1]])
	var trasl_cub = T([0,1,2])([punto_iniziale[0],spessore_muro/3,punto_iniziale[1]])(cuboid_per_fin)
	//finestra
	if(tipo === 1)
		var cuboid = COLOR(rgba([153,203,255,50]))(trasl_cub)
	//porta
	else if(tipo === 0)
		var cuboid = COLOR(rgb([138,51,36]))(T([1])([-spessore_muro/2])(R([0,1])([PI/9])(trasl_cub)))

	return STRUCT([COLOR(rgb(colore))(s_g_1),COLOR(rgb(colore))(s_g_2),cuboid]);
}


//generare case
function crea_casa(colore,larg,altezza){
	//larg = 4
	//alt = 5
	var pavimento = COLOR(rgb(colore))(CUBOID([larg,larg,0.01]))
	var giardino = COLOR(rgb([3,192,60]))(T([0,1,2])([-larg/2,-larg/2,-0.01])(CUBOID([larg*2,larg*2,0.01])))

	var primo_random = Math.random();
	var punto1a = [1*primo_random,2*primo_random]
	var punto1b = [3*primo_random,3*primo_random]
	var muro1 = R([0,1])(PI/2)(muro_con_buco(0.5,punto1a,punto1b,larg,altezza,1,colore))

	var muro1_adiac = COLOR(rgb(colore))(T([0])([larg])(CUBOID([0.5,larg,altezza])))
	//porta
	var secondo_random = Math.random()*1.5;
	var punto1 = [larg/3*secondo_random,0]
	var punto2 = [larg/2*secondo_random,larg/2.5]
	var muro2 = muro_con_buco(0.5,punto1,punto2,larg,altezza*2/3,0,colore) 
	
	var terzo_random = Math.random()
	var punto3 = [1*terzo_random,0]
	var punto4 = [2.5*terzo_random,0.5*terzo_random]

	var muro2b = T([2])([altezza*2/3])(muro_con_buco(0.5,punto3,punto4,larg,altezza/3,1,colore))

	var quarto_random = Math.random()
	var punto5 = [0.5*quarto_random,0.5*quarto_random]
	var punto6 = [3.5*quarto_random,2*quarto_random]

	var retro = T([1])([larg-0.5])(muro_con_buco(0.5,punto5,punto6,larg,altezza*2/3,1,colore))
	var retrob = T([2])([altezza/3])(retro)

	var random_tetto = Math.random()
	var tetto = COLOR(rgb([123,27,2]))(T([1,2])([larg,altezza])(R([1,2])([PI/2])(extrude(SIMPLICIAL_COMPLEX([[-0.5-random_tetto,0],[larg/2,altezza/4],[0.5+larg+random_tetto,0]])([[0,1,2]]),larg))))

	var casa = S([0,1,2])([0.3,0.3,0.3])(STRUCT([giardino,pavimento,muro1,muro1_adiac,muro2,muro2b,retro,retrob,tetto]))

	return casa;
}

 // DRAW(crea_casa(sabbia,3,4))
//DRAW(casa)

/// adesso devo creare una funzione che mi restituisce un complesso di case per riga
function posiz_case(num_case_max,righe,area_x,area_y){
	var array_case = new Array();
	
	for(var j=0; j<righe;j++){	
		var numero_c = num_case_max-(Math.random()*righe)
		for(var i=0; i<numero_c; i++){
			//genero random il colore della casa
			var colore = new Array();
			for(var k=0; k<3;k++)
				colore[k] = Math.random()*150;
			
			// var random_scala = Math.random()
			var casa_scala = crea_casa(colore,3+Math.random(),4+Math.random())

			//ho uno spazio di 30 del terreno
			var spazio = area_x/numero_c;
			var spazio_y = area_y/righe;
			var casa_xy = T([0,1,2])([spazio*i,spazio_y*j,0.15])(casa_scala)

			array_case.push(casa_xy)
		}
	}
	var struct_case = STRUCT(array_case)
	
	return struct_case;
}

var cuboid1 = COLOR(rgb(marrone))(T([0,1])([-38,-32])(CUBOID([35,30,0.7])))
var insediamento1 = T([0,1,2])([-35,-30,0.75])(posiz_case(9,6,30,30))

var cuboid2 = COLOR(rgb(marrone))(T([0,1])([-10,24])(CUBOID([8,9,0.7])))
var insediamento2 = T([0,1,2])([-9,25,0.75])(posiz_case(3,5,5,7))

var cuboid3 = COLOR(rgb(marrone))(T([0,1])([-31,30])(CUBOID([8,8,0.7])))
var insediamento3 = T([0,1,2])([-30,32,0.75])(posiz_case(3,5,5,7))

var insediamenti_umani = STRUCT([cuboid1,insediamento1,cuboid2,insediamento2,cuboid3,insediamento3])

DRAW(insediamenti_umani)
