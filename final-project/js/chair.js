// chair Ettore Sottsass

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
//creazione di un cerchio con bezier
function punti_cerchio_bezier(r){
	var c = [[0,1,0],[1.6,1,0],[1.6,-1.5,0],[0,-1.5,0],[-1.6,-1.5,0],[-1.6,1,0],[0,1,0]];
	for(var i=0;i<c.length;i++)
			for(var k=0;k<c[i].length;k++)
			c[i][k] = c[i][k]*r;
	return c;
}

////////////////////////////////////////////////////////

var x = 64
var domain = INTERVALS(1)(x)
var dom2D = PROD1x1([INTERVALS(1)(x),INTERVALS(1)(x)])

// var fuksia = [161,45,108]
// var arancio = [255, 79, 0]
// var giallo = [240, 243, 25]
// var viola = [72,62,122]
// var cuscino = [241,243,237]
// var grigio_schienale = [89,72,64]
// var rosso_palla = [229,2,2]
// var celeste = [150,208,224]
/////////////////
var rosso_schien = [234,21,23]
var rosa = [255,208,188]
var verde = [46,186,92]
var arancio = [255, 79, 0]
var celeste = [206,215,214]
var bianco_cuscino = [241,250,251]

//sfera rossa in basso a destra
var dominio = DOMAIN([[0,PI], [0,2*PI]])([50,100]); 

/// per la sfera rossa
var mapping = function(v){
var a = v[0];
var b = v[1];

var u = SIN(a) * COS(b);
var v = SIN(a) * SIN(b);
var w = COS(a);

return [u,v,w];
};

var sfera = COLOR(rgb(arancio))(T([0,1,2])([3.16,2.25,0.839])(S([0,1,2])([0.74,0.74,0.74])(MAP(mapping)(dominio))))

///// ------------BRACCIO CILINDRICO verde -----------/////
//------- cilindro cuscino ---------//
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

	var bracciolo = COLOR(rgb(color))(STRUCT([cuscino_cil,unione_curve_chius,chius_post]))

	return bracciolo
}

bracciolo = T([0,1,2])([0.53,-0.08,1.85])(R([1,2])(-PI/2)(S([0,1,2])([0.43,0.45,0.39])(cuscino_cilindrico(verde))))

// DRAW(bracciolo)

///-----------------parte destra -- curva altro bracciolo
var p1 = BEZIER(S0)([[2.47,0, 1.3], [2.33,-0.03, 2], [3.16,-0.03, 2.2], [3.205,0, 2]])
var p2 = BEZIER(S0)([[2.47,0, 0.49], [3.51,-0.03, 0.5], [3.21,-0.03, 0.16], [3.205,0, 2]])

var unione_p1 = MAP(BEZIER(S1)([p1,p2]))(dom2D)

// stesse curve traslate di 4.48 verso le y
var p3 = BEZIER(S0)([[2.47,1.72, 1.3], [2.33,1.72, 2], [3.16,1.72, 2.2], [3.21,1.72, 2]])
var p4 = BEZIER(S0)([[2.47,1.72, 0.49], [3.51,1.72, 0.5], [3.21,1.72, 0.16], [3.21,1.72, 2]])
var unione_p2 = MAP(BEZIER(S1)([p3,p4]))(dom2D)
var unione_p3 = MAP(BEZIER(S1)([p1,p3]))(dom2D) 
var unione_p4 = MAP(BEZIER(S1)([p2,p4]))(dom2D)

//--------------------parte sottostante
var ps1 = BEZIER(S0)([[0.64,0, 0.49], [0.66,-0.01, 0.49], [2.45,-0.01, 0.49], [2.5,0, 0.49]])
var ps2 = BEZIER(S0)([[0.64,0, 1.1], [0.49,-0.01, 1.1], [2.45,-0.01, 1.1], [2.5,0, 1.1]])
var unione_ps1 = MAP(BEZIER(S1)([ps1,ps2]))(dom2D)

var ps3 = BEZIER(S0)([[0.64,1.72+0.597, 0.49], [0.66,1.72+0.597, 0.49], [3.12,1.72+0.597, 0.49], [3.14,1.72+0.597, 0.49]])
var ps4 = BEZIER(S0)([[0.64,1.72+0.597, 1.1], [0.66,1.72+0.597, 1.1], [3.12,1.72+0.597, 1.1], [3.14,1.72+0.597, 1.1]])
var unione_ps2 = MAP(BEZIER(S1)([ps3,ps4]))(dom2D)

var unione_ps3 = MAP(BEZIER(S1)([ps1,ps3]))(dom2D)
var unione_ps4 = MAP(BEZIER(S1)([ps2,ps4]))(dom2D)

//----------------------parte sotto il braccio verde
var bv1 = BEZIER(S0)([[0.37,0, 1.38], [0.39,-0.03, 1.36], [0.56,-0.03, 1.36], [0.65,0, 1.38]]) //curvatura sopra
var bv2 = BEZIER(S0)([[0.37,0, 1.38], [0.47,-0.05, 0.61], [0.27,-0.05, 0.415], [0.65,0, 0.49]])
var unione_bv1 = MAP(BEZIER(S1)([bv1,bv2]))(dom2D)

var bv3 = BEZIER(S0)([[0.37,1.71, 1.38], [0.39,1.71, 1.36], [0.56,1.71, 1.36], [0.65,1.71, 1.38]])
var bv4 = BEZIER(S0)([[0.37,1.71, 1.38], [0.47,1.71, 0.61], [0.27,1.71, 0.415], [0.65,1.71, 0.49]])
var unione_bv2 = MAP(BEZIER(S1)([bv3,bv4]))(dom2D)

var unione_bv3 = MAP(BEZIER(S1)([bv1,bv3]))(dom2D)
var unione_bv4 = MAP(BEZIER(S1)([bv2,bv4]))(dom2D)

//chiusura laterale
var bv5 = BEZIER(S0)([[0.65,0, 1.38],[0.65,0, 1]])
var bv6 = BEZIER(S0)([[0.65,1.71, 1.38],[0.65,1.71, 1]])
var unione_bv5 = MAP(BEZIER(S1)([bv6,bv5]))(dom2D)

/////-------------------CUSCINO------------------------/////////////////
// curve cuscino parte sopra
var cs1 = BEZIER(S0)([[0.65,-0.01, 1.38], [2.01,-0.02, 1.39],[2.43,-0.01, 1.38]])
var cs2 = BEZIER(S0)([[0.65,0.5, 1.38],[1.29,0.5, 1.33], [2.01,0.5, 1.39],[2.43,0.5, 1.38]])
var cs3 = BEZIER(S0)([[0.65,1, 1.38],[1.29,1, 1.4], [1.83,1, 1.33],[2.43,1, 1.38]])
var cs4 = BEZIER(S0)([[0.65,1.71, 1.38],[2.43,1.71, 1.38]])
var unione_cs1 = MAP(BEZIER(S1)([cs1,cs2,cs3,cs4]))(dom2D)

//sotto cuscino
var css = BEZIER(S0)([[0.65,-0.01, 1.1],[1.25,-0.03, 1.1], [2.01,-0.03, 1.1],[2.43,-0.01, 1.1]])
var css2 = BEZIER(S0)([[0.65,1.71, 1.1],[1.25,1.71, 1.1], [2.01,1.71, 1.1],[2.43,1.71, 1.1]])
var unione_css = MAP(BEZIER(S1)([css,css2]))(dom2D)

//curve laterali
var control_p1 = [[0.65,-0.01, 1.1],[0.6,-0.05, 1.033],[0.6,-0.05, 1.447],[0.65,-0.01, 1.38]]
var control_p2 = [[2.43,-0.01, 1.1],[2.48,-0.05, 1.033],[2.48,-0.05, 1.447],[2.43,-0.01, 1.38]]

var c1 = BEZIER(S0)(control_p1)
var c1_1 = BEZIER(S1)(control_p1)
var c2 = BEZIER(S0)(control_p2)
var c2_1 = BEZIER(S1)(control_p2)

// var unione_c1 = MAP(BEZIER(S1)([c1,c2]))(dom2D)
///COONSPATCH
var unione_coons = MAP(COONS_PATCH([css,cs1,c1_1,c2_1]))(dom2D);
// DRAW(unione_coons)

var c3 = BEZIER(S0)([[0.65,1.71, 1.1],[0.6,1.71, 1.033],[0.6,1.71, 1.447],[0.65,1.71, 1.38]])
var c4 = BEZIER(S0)([[2.43,1.71, 1.1],[2.48,1.71, 1.033],[2.48,1.71, 1.447],[2.43,1.71, 1.38]])

var unione_c2 = MAP(BEZIER(S1)([c3,c4]))(dom2D)
var unione_c3 = MAP(BEZIER(S1)([c1,c3]))(dom2D)
var unione_c4 = MAP(BEZIER(S1)([c2,c4]))(dom2D)

///////////--------------------schienale rosso-------------------/////////
var s1 = BEZIER(S0)([[3,1.75, 3.97],[1.21,1.74, 4.04],[0.24,1.73, 2.79],[0.37,1.72, 1.35]])
var s2 = BEZIER(S0)([[3,1.75, 3.97],[3.2,1.74, 4.1],[3.21,1.72, 1.3]])

// var s3 = BEZIER(S0)([[0.37,1.71, 1.38],[0.47,1.71, 0.61],[0.27,1.71, 0.415],[0.65,1.71, 0.49]]) //bv4
var s4 = BEZIER(S0)([[3.21,1.72, 2],[3.21,1.72, 0.16],[3.51,1.72, 0.5],[2.47,1.72, 0.49]])

var unione_s1 = MAP(BEZIER(S1)([s1,s2]))(dom2D)
// DRAW(unione_s1)

// per la profondita'
// parte alta obliqua
var sp1 = BEZIER(S0)([[3,1.72+0.6, 3.97],[1.21,1.72+0.7, 4.04],[0.24,1.72+0.7, 2.79],[0.37,1.72+0.6, 1.38]])
var sp2 = BEZIER(S0)([[3,1.72+0.6, 3.97],[3.2,1.72+0.7, 4.1],[3.21,1.72+0.6, 1.38]]) ///parte destra
//parte bassa    
var sp3 = BEZIER(S0)([[0.37,1.72+0.6, 1.38],[0.47,1.72+0.6, 0.61],[0.27,1.72+0.6, 0.415],[0.65,1.72+0.6, 0.49]]) 
var sp4 = BEZIER(S0)([[3.205,1.72+0.6, 2],[3.2,1.72+0.6, 0.04],[3.51,1.72+0.6, 0.585],[2.47,1.72+0.6, 0.49]]) // parte destra

var unione_sp1 = MAP(BEZIER(S1)([sp1,sp2]))(dom2D)
var unione_sp2 = MAP(BEZIER(S1)([sp4,sp3]))(dom2D)

var unione_sp3 = MAP(BEZIER(S1)([s1,sp1]))(dom2D)
var unione_sp4 = MAP(BEZIER(S1)([s2,sp2]))(dom2D)
var unione_sp5 = MAP(BEZIER(S1)([bv4,sp3]))(dom2D)
var unione_sp6 = MAP(BEZIER(S1)([s4,sp4]))(dom2D)
// var unione_sp7 = MAP(BEZIER(S1)([sp4,sp2]))(dom2D) //chiusura sotto

//////////////---------------rendere la struttura morbida--------------------//////////////
///curve schienale 
var sm1 = BEZIER(S0)([[3,1.74, 3.96],[1.2,1.73, 4.03],[0.25,1.72, 2.78],[0.39,1.71, 1.38]])
var sm2 = BEZIER(S0)([[3,1.74, 3.96],[3.17,1.72, 4.09],[3.21,1.7, 1.38]])

var unione_sm1 = MAP(BEZIER(S1)([sm1,sm2]))(dom2D)
var unione_sm2 = MAP(BEZIER(S1)([sm1,sp1]))(dom2D)
var unione_sm3 = MAP(BEZIER(S1)([sm2,sp2]))(dom2D)

/////////// ----------- parte sottostante alla poltrona --- celeste

var rett1z = BEZIER(S0)([[0.58,0.05+0.03, 0.493],[0.58,0.05+0.03, 0.1]]) 
var rett2z = BEZIER(S0)([[3.1,0.05+0.03, 0.493],[3.1,0.05+0.03, 0.1]]) 
var rett1x = BEZIER(S0)([[0.58,0.05+0.03, 0.1],[3.1,0.05+0.03, 0.1]]) 
var rett1y = BEZIER(S0)([[0.58,0.15+0.03, 0.1],[3.1,0.15+0.03, 0.1]]) 

var unione_rett1 = MAP(BEZIER(S1)([rett1z,rett2z]))(dom2D)
//unione sotto 
var unione_rett2 = MAP(BEZIER(S1)([rett1x,rett1y]))(dom2D)
//curva
var rett3 = BEZIER(S0)([[0.58,0.26+0.03, 0.493], [0.58,0.21+0.03, 0.53], [0.58,0.1+0.03, 0.23], [0.58,0.15+0.03, 0.1]])
var rett4 = BEZIER(S0)([[3.1,0.26+0.03, 0.493], [3.1,0.21+0.03, 0.53], [3.1,0.1+0.03, 0.23], [3.1,0.15+0.03, 0.1]]) //trasl

var unione_rett3 = MAP(BEZIER(S1)([rett3,rett4]))(dom2D)
var unione_rett4 = MAP(BEZIER(S1)([rett3,rett1z]))(dom2D)
var unione_rett5 = MAP(BEZIER(S1)([rett4,rett2z]))(dom2D)

///--- CUBOID IN BASSO A SINISTRA
var color_cel = [246,248,251]
var cuboid_appoggio = COLOR(rgb(celeste))(T([0,1,2])([0.28,1.82,0.1])(CUBOID([0.7,0.7,0.38])))

//////////////////////////////////////////////////////////////////////////////

var zone_rosse = COLOR(rgb(rosso_schien))(STRUCT([unione_sp1,unione_sp2,unione_p3,unione_s1,unione_sm1,unione_sm2,unione_sm3,unione_bv5,unione_bv3,unione_bv2,unione_bv1,unione_p1,unione_ps1,unione_ps2,unione_ps4]))
var zone_rosa = COLOR(rgb(rosa))(STRUCT([unione_p2,unione_p4,unione_ps3,,unione_sp4,unione_sp6,unione_bv4,unione_sp3,unione_sp5]))
// var parte_viola = COLOR(rgb(viola))(STRUCT([unione_bv4,unione_sp1,unione_sp2,unione_sp3,unione_sp5]))
var cuscino = COLOR(rgb(bianco_cuscino))(STRUCT([unione_coons,unione_c3,unione_c4,unione_cs1,unione_c2,unione_css]))
// var schienale_grigio = COLOR(rgb(grigio_schienale))(STRUCT([unione_p3,unione_s1,unione_sm1,unione_sm2,unione_sm3]))
var strutt_celeste = COLOR(rgb(celeste))(STRUCT([unione_rett1,unione_rett3,unione_rett2,unione_rett4,unione_rett5]))

/////////////////////////////////////////////////////////////////////
//DRAW(braccio_destra)

var divano = STRUCT([sfera,bracciolo,zone_rosa,zone_rosse,cuscino,strutt_celeste,cuboid_appoggio])


DRAW(divano)


