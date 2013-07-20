//funzioni supporto

// definizione della TRASLAZIONE, ROTAZIONE E SCALAMENTO senza clone()
T = function (dims) {
	return function (values) {
		return function (object) {
			return object.translate(dims, values);
		};
	};
}

R = function (dims) {
    return function (angle) {
      	return function (object) {
        	return object.rotate(dims, angle);
		};
    };
}

S = function (dims) {
    return function (values) {
      	return function (object) {
        	return object.scale(dims, values);
      	};
    };
}

//Funzione che mi permette di inserire i colori in rgb con range [0,255]
function rgb(color){
	return [color[0]/255, color[1]/255, color[2]/255];
}

//Funzione che mi permette di inserire i colori in rgba con range [0,255]
function rgba(color){
	return [color[0]/255, color[1]/255, color[2]/255, color[3]/100];
}

function extrude(obj, h){
  return EXTRUDE([h])(obj);
}
//creazione di un cerchio con bezier
function punti_cerchio_bezier(r){
  var c = [[0,1,0],[1.6,1,0],[1.6,-1.5,0],[0,-1.5,0],[-1.6,-1.5,0],[-1.6,1,0],[0,1,0]];
  for(var i=0;i<c.length;i++)
      for(var k=0;k<c[i].length;k++)
      c[i][k] = c[i][k]*r;
  return c;
}

var rosso = [234,21,23]
var bianco = [325,325,325]
var nero = [0,0,0]
var giallo = [255, 255, 0]
var grigio = [89,72,64]
var verde_acqua = [130,225,177]

var x = 64
var domain = INTERVALS(1)(x)
var dom2D = PROD1x1([INTERVALS(1)(x),INTERVALS(1)(x)])

///////---------------------STRUTTURA BIANCA-------------- ////////////
//COLOR(bianco)
var base_bianca = T([0,2])([0.3,1.97])(CUBOID([9.45,3,0.45]))
/// trapezio appoggio
var trap = extrude(SIMPLICIAL_COMPLEX([[0.88,1.97],[2,1.97],[1.44,0.93],[1.52,0.93]])([[0,1,2],[3,2,1]]),2.99);
trap = T([1])([3])(R([1,2])(PI/2)(trap))
var trap2 = T([1])([3])(R([1,2])(PI/2)(extrude(SIMPLICIAL_COMPLEX([[8,1.97],[9.12,1.97],[8.56,0.93],[8.64,0.93]])([[0,1,2],[3,2,1]]),2.99)));

//// triangolo destro
var tri_d = T([1])([2.5])(R([1,2])(PI/2)(extrude(SIMPLICIAL_COMPLEX([[9.12, 4.09],[7.34, 2.34],[9.12, 2.34]])([[0,1,2]]),2.49)));
//// rettangolo sinistro
var rett_s = T([1])([2.42])(R([1,2])(PI/2)(extrude(SIMPLICIAL_COMPLEX([[0.88,2.42], [1.29,2.42], [0.6, 4.7], [0.16, 4.7]])([[0,1,2],[2,3,0]]),2.41)));

/// 3 cilindri bianchi laterali
function cuscino_cilindrico(color){
  var curva1 = BEZIER(S0)([[1.39,0, 4.48],[1.71,0,4.57], [1.58,0, 2.91], [1.71,0, 0.09], [1.39,0, 0]])

  //circonferenza di base
  var base_cil = BEZIER(S1)(punti_cerchio_bezier(0.72))
  var cuscino_cil = MAP(PROFILEPROD_SURFACE([curva1,base_cil]))(dom2D)
  
  var curv1 = BEZIER(S0)([[0,0,0.01],[0,0.652,0.01],[1.01,0.652,0.01],[1.01,0,0.01]])
  var centro_curv = BEZIER(S0)([[0,0,0.01],[0.5,0,-0.3],[1.01,0,0.01]])
  var curv2 = BEZIER(S0)([[0,0,0.01],[0,-0.65,0.01],[1,-0.65,0.01],[1.01,0,0.01]])
  
  var unione_curve_chius = T([0,1])([-1.005,0.025])(S([0,1,2])([1.998,2.03,2])(MAP(BEZIER(S1)([curv1,centro_curv,curv2]))(dom2D)))
  var copia_union_curv = T([0,1])([-1.005,0.025])(S([0,1,2])([1.998,2.03,2])(MAP(BEZIER(S1)([curv1,centro_curv,curv2]))(dom2D)))

  var chius_post = T([1,2])([0.05,4.475])(R([1,2])(PI)(copia_union_curv))

  var braccio = COLOR(rgb(color))(STRUCT([cuscino_cil,unione_curve_chius,chius_post]))

  return braccio
}

var cuscino_1 = T([0,2])([1.37,3.25])(R([1,2])(-PI/2)(S([0,1,2])([0.3,0.3,0.52])(cuscino_cilindrico(bianco))))
var cuscino_2 = T([0,2])([1.19,3.85])(R([1,2])(-PI/2)(S([0,1,2])([0.3,0.3,0.52])(cuscino_cilindrico(bianco))))
var cuscino_3 = T([0,2])([1,4.45])(R([1,2])(-PI/2)(S([0,1,2])([0.3,0.3,0.52])(cuscino_cilindrico(bianco))))

var struttura_bianca = COLOR(rgb(bianco))(STRUCT([base_bianca,trap,trap2,tri_d,rett_s,cuscino_1,cuscino_2,cuscino_3]))

////////////////////-------------- cuscino schienale --------------- ////////////////////
var c1 = BEZIER(S0)([[0.3,2.5, 5.34],[-0.06,2.3, 5.34],[8.12,2.3, 5.34],[8,2.5, 5.34]]) //sopra
var c2 = BEZIER(S0)([[0.3,2.5, 2.421],[-0.06,2.3, 2.421],[8.12,2.3, 2.421],[8,2.5, 2.421]]) //sotto

var c3 = BEZIER(S0)([[0.3,3, 5.34],[3.85,3.05, 5.34],[8,3, 5.34]]) //dietro sopra
var c4 = BEZIER(S0)([[0.3,3, 2.421],[3.85,3.05, 2.421],[8,3, 2.421]]) //dietro sotto

var c5 = BEZIER(S0)([[0.3,2.55, 5.34],[-0.06,2.55, 5.54],[8.12,2.55, 5.54],[8,2.55, 5.34]]) //curve meta' parte sopra per arrotondare
var c6 = BEZIER(S0)([[0.3,2.75, 5.34],[-0.06,2.75, 5.54],[8.12,2.75, 5.54],[8,2.75, 5.34]]) 
var c7 = BEZIER(S0)([[0.3,2.99, 5.34],[-0.06,2.99, 5.54],[8.12,2.99, 5.54],[8,2.99, 5.34]]) 

var unione_c1 = MAP(BEZIER(S1)([c1,c2]))(dom2D)
var unione_c2 = MAP(BEZIER(S1)([c3,c4]))(dom2D)
var unione_c3 = MAP(BEZIER(S1)([c1,c5,c6,c7,c3]))(dom2D)
var unione_c4 = MAP(BEZIER(S1)([c2,c4]))(dom2D)

//chiusure laterali
var c_s1 = BEZIER(S0)([[0.3,2.5, 2.421],[0.3,2.5, 5.34]]) //sinistra
var c_s2 = BEZIER(S0)([[0.3,2.5, 2.421],[0.1,2.5, 2.22],[0.1,2.5,5.54],[0.3,2.5, 5.34]]) //sinistra
var c_s3 = BEZIER(S0)([[0.3,3, 2.421],[0.1,3, 2.22],[0.1,3,5.54],[0.3,3, 5.34]]) //sinistra
var c_s4 = BEZIER(S0)([[0.3,3, 2.421],[0.3,3, 5.34]]) //sinistra

var unione_cs1 = MAP(BEZIER(S1)([c_s1,c_s2,c_s3,c_s4]))(dom2D)
//////
var c_d1 = BEZIER(S0)([[8,2.5, 2.421],[8,2.5, 5.34]]) //destra
var c_d2 = BEZIER(S0)([[8,2.5, 2.421],[8.2,2.5, 2.22],[8.2,2.5,5.54],[8,2.5, 5.34]]) //destra
var c_d3 = BEZIER(S0)([[8,3, 2.421],[8.2,3, 2.22],[8.2,3,5.54],[8,3, 5.34]]) //destra
var c_d4 = BEZIER(S0)([[8,3, 2.421],[8,3, 5.34]]) //destra

var unione_cd1 = MAP(BEZIER(S1)([c_d1,c_d2,c_d3,c_d4]))(dom2D)
var cuscino_schienale = COLOR([0,0,0])(STRUCT([unione_c1,unione_c2,unione_c3,unione_c4,unione_cs1,unione_cd1]))

///////////////////////----------------------cuscino base --------------///////////////////
var b1 = BEZIER(S0)([[1.16,0, 2.91], [0.79,0, 2.94], [8.24,0, 2.94], [7.87,0, 2.87]])
var b2 = BEZIER(S0)([[1.23,0, 2.7], [0.84,-0.05, 2.7], [8.09,-0.05, 2.7], [7.7,0, 2.7]])
var b3 = BEZIER(S0)([[1.31,0, 2.421], [1.11,-0.03, 2.421], [7.62,-0.03, 2.421], [7.42,0, 2.421]])

var b4 = BEZIER(S0)([[1.31,2.49, 2.421], [7.42,2.49, 2.421]]) // parte dietro
var b5 = BEZIER(S0)([[1.16,2.49, 2.91], [7.87,2.49, 2.87]])

var b6 = BEZIER(S0)([[1.16,0.01, 2.91], [0.79,0.01, 2.94], [8.24,0.01, 2.94], [7.87,0.01, 2.91]]) //parte superiore
var b7 = BEZIER(S0)([[1.16,1, 2.91], [0.79,1, 2.94], [8.24,1, 2.94], [7.87,1, 2.91]])
var b8 = BEZIER(S0)([[1.16,2, 2.91], [0.79,2, 2.94], [8.24,2, 2.94], [7.87,2, 2.91]])

var b9 = BEZIER(S0)([[7.87,0, 2.87],[7.7,0, 2.7],[7.42,0, 2.421]]) // lato destro chiusura
var b10 = BEZIER(S0)([[7.87,2.49, 2.87],[7.42,2.49, 2.421]])

var b11 = BEZIER(S0)([[1.16,0, 2.91],[1.23,0, 2.7],[1.31,0, 2.421]]) // lato sinistro chiusura
var b12 = BEZIER(S0)([[1.16,2.49, 2.91],[1.31,2.49, 2.421]])

var unione_b1 = MAP(BEZIER(S1)([b1,b2,b3]))(dom2D)
var unione_b2 = MAP(BEZIER(S1)([b4,b5]))(dom2D)
var unione_b3 = MAP(BEZIER(S1)([b1,b6,b7,b8,b5]))(dom2D) 
var unione_b4 = MAP(BEZIER(S1)([b3,b4]))(dom2D)
var unione_b5 = MAP(BEZIER(S1)([b9,b10]))(dom2D)
var unione_b6 = MAP(BEZIER(S1)([b11,b12]))(dom2D)

var cuscino_base = COLOR([0,0,0])(STRUCT([unione_b1,unione_b2,unione_b3,unione_b4,unione_b5,unione_b6]))

////// CUBOID GIALLO ///////////
var quad_giallo = COLOR(rgb(giallo))(T([0,1,2])([8.1,2.5,2.42])(CUBOID([2.4,0.5,2.45])))

//////// BRACCIO DESTRO ROSSO ///////////
var bdr1 = BEZIER(S0)([[9.64,0, 4.87], [8.26,0, 5.22], [7.29,0, 3.47], [7.873,0, 2.89]])
var bdr2 = BEZIER(S0)([[7.873,0, 2.89],[7.88,0, 2.87],[8.5,0, 3.49]]) //sotto
var bdr3 = BEZIER(S0)([[8.5,0, 3.49],[8.4,0, 3.59]])
var bdr4 = BEZIER(S0)([[9.64,0, 4.87],[9.77,0, 4.87],[8.97,0, 4.2],[8.4,0, 3.59]])

var bdr1_y = BEZIER(S0)([[9.64,2.49, 4.87], [8.26,2.49, 5.22], [7.29,2.49, 3.47], [7.873,2.49, 2.88]])
var bdr2_y = BEZIER(S0)([[7.873, 2.49, 2.88],[7.88,2.49, 2.87],[8.5,2.49, 3.49]]) //sotto
var bdr3_y = BEZIER(S0)([[8.5,2.49, 3.49],[8.4,2.49, 3.59]])
var bdr4_y = BEZIER(S0)([[9.64,2.49, 4.87],[9.77,2.49, 4.87], [8.97,2.49, 4.2],[8.4,2.49, 3.59]])

var unione_bdr1 = MAP(BEZIER(S1)([bdr1,bdr1_y]))(dom2D)
var unione_bdr2 = MAP(BEZIER(S1)([bdr2,bdr2_y]))(dom2D)
var unione_bdr3 = MAP(BEZIER(S1)([bdr3,bdr3_y]))(dom2D)
var unione_bdr4 = MAP(BEZIER(S1)([bdr4,bdr4_y]))(dom2D)

///UNIONE LATERALE
var ul_1 = BEZIER(S0)([[9.64,0, 4.87], [8.26,-0.01, 5.2], [7.3,-0.01, 3.48], [8.4,0, 3.59]])
var ul_2 = BEZIER(S0)([[9.64,0, 4.87], [8.91,-0.01, 4.87], [8.16,-0.01, 3.98], [8.4,0, 3.59]])
var bdr4_b = BEZIER(S0)([[9.64,0, 4.87],[9.61,-0.01, 4.86],[8.97,-0.01, 4.2],[8.4,0, 3.62]])

////unione con bdr3 e bdr2
var bdr2_b = BEZIER(S0)([[7.873,0, 2.89],[7.9,-0.01, 2.95],[8,-0.01, 3.2],[8.4,0, 3.62]])

var unione_l1 = MAP(BEZIER(S1)([bdr1,ul_1,ul_2,bdr4_b,bdr4]))(dom2D)
var unione_l2 = MAP(BEZIER(S1)([bdr2_b,bdr2]))(dom2D)

//parte dietro
var unione_l3 = MAP(BEZIER(S1)([bdr1_y,[8.4,2.49,3.59]]))(dom2D)
var unione_l4 = MAP(BEZIER(S1)([bdr2_y,[8.4,2.49,3.59]]))(dom2D)
var unione_l5 = MAP(BEZIER(S1)([bdr4_y,[8.4,2.49,3.59]]))(dom2D)

var braccio_destro = COLOR(rgb(rosso))(STRUCT([unione_bdr1,unione_bdr2,unione_bdr3,unione_bdr4,unione_l1,unione_l2,unione_l3,unione_l4,unione_l5]))

/////////////////////// CUBOID verde acqua //////////////////
var cv = extrude(SIMPLICIAL_COMPLEX([[8.4, 3.59],[9.6, 4.77],[9.7, 4.67],[8.5, 3.49]])([[0,1,2],[2,3,0]]),2.5);
cv = COLOR(rgb(verde_acqua))(T([1])([2.5])(R([1,2])(PI/2)(cv)))

///////////////////////////////////////////////////////////////////////////////////////////
var divano = STRUCT([struttura_bianca,cuscino_schienale,cuscino_base,quad_giallo,braccio_destro,cv])
DRAW(divano)