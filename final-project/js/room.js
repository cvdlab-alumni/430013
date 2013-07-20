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
// definizione della TRASLAZIONE, ROTAZIONE E SCALAMENTO con clone()
T1 = function (dims) {
  return function (values) {
    return function (object) {
      return object.clone().translate(dims, values);
    };
  };
}

R1 = function (dims) {
    return function (angle) {
        return function (object) {
          return object.clone().rotate(dims, angle);
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

function extrude(obj, h){
  return EXTRUDE([h])(obj);
}

/*circonferenza*/
function circle(r){
  var domain = DOMAIN([[0,2*PI]])([36]);

 var circ = function (r) {
   return function (v) {
  return [r*COS(v[0]), r*SIN(v[0])];
  };
 };
 var mapping = circ(r);
 return (MAP(mapping)(domain));
}

function cilynder(r,h){
  return extrude(circle(r),h);
}

function punti_controllo_cerchio_assi_x_y(r){
    var c = [[0,-1,0],[0.33,-0.966,0],[0.7,-0.733,0],[0.966,-0.33,0],[1,0,0],[0.966,0.33,0],[0.7,0.733,0],[0.33,0.966,0],[0,1,0],[-0.33,0.966,0],[-0.7,0.733,0],[-0.966,0.33,0],[-1,0,0],[-0.966,-0.33,0],[-0.7,-0.733,0],[-0.33,-0.966,0],[0,-1,0]];
  for(var i=0;i<c.length;i++)
    for(var k=0;k<c[i].length;k++)
    c[i][k] = c[i][k]*r;
  return c;
}

function calcola_nodi(points,grado){ 
  var m = points.length;
  var k = grado;
  var n = (m + k + 1);
  var l = n - 3;
  var j = 1;
  var knots = [];
  for (var i = 0; i < 3; i++) {
    knots[i] = 0;
  }
  for (var i = 3; i < l; i++, j++) {
    knots[i] = j;
  }
  for (var i = l; i < n; i++) {
    knots[i] = j;
  }
  return knots;
}

function cambia_valore_coordinata(a,coordinata,valore){
  var array = new Array();
  for(var i=0;i<a.length;i++){
    var p = new Array();
    if(coordinata === 0){
      p[0] = a[i][0]+valore;
      p[1] = a[i][1];
      p[2] = a[i][2];}
    else if(coordinata === 1){
      p[0] = a[i][0];
      p[1] = a[i][1]+valore;
      p[2] = a[i][2];}
    else if(coordinata === 2){
      p[0] = a[i][0];
      p[1] = a[i][1];
      p[2] = a[i][2]+valore;
    }
    else
      console.log("coordinata errata");

    array[i] = p;
  }

return array;
}
// var x = 32
// var domain = INTERVALS(1)(x)
// var dom2DR = PROD1x1([INTERVALS(1)(x),INTERVALS(1)(x)])

////////////////////////////////////////////////////////

var x = 24
var domain = INTERVALS(1)(x)
var dom2D = PROD1x1([INTERVALS(1)(x),INTERVALS(1)(x)])
var dominio3D = DOMAIN([[0,1],[0,1]])([30,40]);

///////////////// colori
var rosso = [234,21,23]
var rosa = [255,208,188]
var verde = [46,186,92]
var arancio = [255, 72, 0]
// var celeste = [206,215,214]

var bianco = [325,325,325]
var nero = [0,0,0]
var giallo = [255, 255, 0]
var grigio = [89,72,64]
var verde_acqua = [130,225,177]

var celeste = [178,207,223,90]
var arancione = [246,119,66]
var legno = [249,217,158]
var grigio_scuro = [31,36,37]

var rosa2 = [246,87,117]
var cel_chiaro = [216,234,243]
var blu = [42,69,119]
var grigio_p = [97,84,69]

var metallo = [221,200,181]
var grigio_blu = [181,190,199]

var grigio_Sc = [47,47,47] //lampada

var bordeaux = [177,38,24]

var oro = [204,158,80]
var oro_scuro = [167,144,100]
var marrone = [55,26,20,98] //per la montatura
var lente_vetro = [236,232,227,70]
var gommino_trasp = [236,232,227,80]


// sfera rossa in basso a destra
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
  var dom = PROD1x1([INTERVALS(1)(64),INTERVALS(1)(64)])
	//circonferenza di base
	var base_cil = BEZIER(S1)(punti_cerchio_bezier(0.72))
	var cuscino_cil = MAP(PROFILEPROD_SURFACE([curva1,base_cil]))(dom)
	
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
var sr1 = BEZIER(S0)([[3,1.75, 3.97],[1.21,1.74, 4.04],[0.24,1.73, 2.79],[0.37,1.72, 1.35]])
var sr2 = BEZIER(S0)([[3,1.75, 3.97],[3.2,1.74, 4.1],[3.21,1.72, 1.3]])

// var s3 = BEZIER(S0)([[0.37,1.71, 1.38],[0.47,1.71, 0.61],[0.27,1.71, 0.415],[0.65,1.71, 0.49]]) //bv4
var sr4 = BEZIER(S0)([[3.21,1.72, 2],[3.21,1.72, 0.16],[3.51,1.72, 0.5],[2.47,1.72, 0.49]])

var unione_sr1 = MAP(BEZIER(S1)([sr1,sr2]))(dom2D)
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

var unione_sp3 = MAP(BEZIER(S1)([sr1,sp1]))(dom2D)
var unione_sp4 = MAP(BEZIER(S1)([sr2,sp2]))(dom2D)
var unione_sp5 = MAP(BEZIER(S1)([bv4,sp3]))(dom2D)
var unione_sp6 = MAP(BEZIER(S1)([sr4,sp4]))(dom2D)
// var unione_sp7 = MAP(BEZIER(S1)([sp4,sp2]))(dom2D) //chiusura sotto

//////////////---------------rendere la struttura morbida--------------------//////////////
///curve schienale 
var sm1 = BEZIER(S0)([[3,1.74, 3.96],[1.2,1.73, 4.03],[0.25,1.72, 2.78],[0.39,1.71, 1.38]])
var sm2 = BEZIER(S0)([[3,1.74, 3.96],[3.17,1.72, 4.09],[3.21,1.7, 1.38]])

var unione_sm1 = MAP(BEZIER(S1)([sm1,sm2]))(dom2D)
var unione_sm2 = MAP(BEZIER(S1)([sm1,sp1]))(dom2D)
var unione_sm3 = MAP(BEZIER(S1)([sm2,sp2]))(dom2D)

/////////// ----------- parte sottostante alla poltrona --- bianco

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
var cuboid_appoggio = COLOR(rgb(bianco))(T([0,1,2])([0.28,1.82,0.1])(CUBOID([0.7,0.7,0.38])))

//////////////////////////////////////////////////////////////////////////////

var zone_rosse = COLOR(rgb(rosso))(STRUCT([unione_p3,unione_sr1,unione_sm1,unione_sm2,unione_sm3,unione_bv5,unione_bv3,unione_bv2,unione_bv1,unione_p1,unione_ps1,unione_ps2,unione_ps4,unione_sp1,unione_sp2]))
var zone_rosa = COLOR(rgb(rosa))(STRUCT([unione_p2,unione_p4,unione_ps3,,unione_sp4,unione_sp6,unione_bv4,unione_sp3,unione_sp5]))
// var parte_viola = COLOR(rgb(viola))(STRUCT([unione_bv4,unione_sp1,unione_sp2,unione_sp3,unione_sp5]))
var cuscino = COLOR(rgb(bianco))(STRUCT([unione_coons,unione_c3,unione_c4,unione_cs1,unione_c2,unione_css]))
// var schienale_grigio = COLOR(rgb(grigio_schienale))(STRUCT([unione_p3,unione_s1,unione_sm1,unione_sm2,unione_sm3]))
var strutt_bianco = COLOR(rgb(bianco))(STRUCT([unione_rett1,unione_rett3,unione_rett2,unione_rett4,unione_rett5]))

/////////////////////////////////////////////////////////////////////
var poltrona = S([0,1,2])([1.4,1.4,1.4])(T([0,1])([5.5,14])(STRUCT([sfera,bracciolo,zone_rosa,zone_rosse,cuscino,strutt_bianco,cuboid_appoggio])))

//////////////////// BASE CON MURO e PAVIMENTI //////////////////
var pavimento = COLOR(rgb([244, 164, 96]))(T([0])([-6])(CUBOID([26,23,0.1])))

//lato sinistro
var cub1 = T([0,2])([-6,10.01])(CUBOID([1,22,3]))
var cub2 = T([0,2])([-6,0.01])(CUBOID([1,2,10]))
var cubs3 = STRUCT(REPLICA(3)([cub2,T1([1])([10])]))
var muro_sin = COLOR(rgb(bianco))(STRUCT([cub1,cubs3]))

var cub4 = T([0,1,2])([-6,22,10.01])(CUBOID([26,1,3]))
var cub5 = T([0,1,2])([-6,22,0.01])(CUBOID([8,1,10]))
var cub6 = T([0,1,2])([11,22,0.01])(CUBOID([9,1,10]))

var muro_front = COLOR(rgb(bianco))(STRUCT([cub4,cub5,cub6]))

//balconi
var est1 = T([0,1])([-5.9,2])(CUBOID([0.8,0.75,9.999]))
var est2 = T([0,1,2])([-5.9,5.25,0.75])(CUBOID([0.8,1.5,8.5]))
var est3 = T([0,1])([-5.9,9.25])(CUBOID([0.8,0.75,9.999]))

var est4 = T([0,1])([-5.9,2.75])(CUBOID([0.8,6.5,0.75]))///sotto
var est5 = T([0,1,2])([-5.9,2.75,9.25])(CUBOID([0.8,6.5,0.75])) ///sopra

//vetro
///linee vetro bianche
var lin_1 = T([0,1,2])([-5.89,3.583,0.75])(CUBOID([0.71,0.02,8.5]))
var lins_1 = STRUCT(REPLICA(2)([lin_1,T1([1])([0.853])]))

var lin_2 = T([0,1,2])([-5.89,2.75,0.75+1.416])(CUBOID([0.71,2.5,0.02]))
var lins_2 = STRUCT(REPLICA(5)([lin_2,T1([2])([1.436])]))

var union_linee = COLOR(rgb(bianco))(STRUCT([lins_1,lins_2]))

var vetr1 = COLOR(rgba([240, 248, 255,50]))(T([0,1,2])([-5.8,2.75,0.75])(CUBOID([0.6,2.5,8.5])))
vetr1 = STRUCT([vetr1,union_linee])
var vetr2 = STRUCT(REPLICA(2)([vetr1,T1([1])([4])]))

var balcone_struct = COLOR(rgb(bianco))(STRUCT([est1,est2,est3,est4,est5]))
var linea_div = COLOR(rgb(grigio))(POLYLINE([[-5.09,6,0.01],[-5.09,6,10]]))
var linea_div_d = COLOR(rgb(grigio))(POLYLINE([[-5.91,6,0.01],[-5.91,6,10]]))
var disk_pom =  R([0,2])(PI/2)(extrude(DISK(0.23)([64, 2]),0.04))

var pomello = T([0])([0.18])(S([0,1,2])([0.18,0.18,0.18])(MAP(mapping)(dominio)))
pomello = COLOR(rgb([255,246,144]))(T([0,1,2])([-5.09,6.4,5.3])(STRUCT([pomello,disk_pom])))

var balcone = T([2])([0.01])(STRUCT([balcone_struct,vetr2,linea_div,linea_div_d,pomello]))

var balconi = STRUCT(REPLICA(2)([balcone,T1([1])([10])]))
// DRAW(pomello)

/////////// TENDA ///////////////
var domainP = PROD1x1([INTERVALS(1)(32),INTERVALS(1)(32)]);

var curva_tenda = BEZIER(S0)([[0.6,3.24,0], [1.5, 4.95,0], [2.64, 1.81,0], [3.6, 3.24,0]])
var curva_tenda2 = BEZIER(S0)([[0.6,3.24,15], [1.5, 4.95,15], [2.64, 1.81,15], [3.6, 3.24,15]])

var unione_curve = MAP(BEZIER(S1)([curva_tenda2,curva_tenda]))(domainP)
var unione_curve_trasl = T([0])([3])(MAP(BEZIER(S1)([curva_tenda2,curva_tenda]))(domainP))

var replica1 = COLOR(rgba([33,146,188,80]))(STRUCT(REPLICA(3)([unione_curve,T1([0])([6])])))
var replica2 = COLOR(rgba([46,186,92,80]))(STRUCT(REPLICA(3)([unione_curve_trasl,T1([0])([6])])))

var bastone = COLOR(rgb(legno))(T([0,1,2])([1,1.75,9.9])(R([0,2])([PI/2])(cilynder(0.2,9))))

var tenda = S([0,1,2])([0.55,0.5,0.7])(STRUCT([replica1,replica2]))
tenda = T([0,1])([1,20.8])(STRUCT([tenda,bastone]))

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////-----------------DIVANO------------------------------ ////////////////////////////////////////

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
var c_b1 = BEZIER(S0)([[1.16,0, 2.91], [0.79,0, 2.94], [8.24,0, 2.94], [7.87,0, 2.87]])
var c_b2 = BEZIER(S0)([[1.23,0, 2.7], [0.84,-0.05, 2.7], [8.09,-0.05, 2.7], [7.7,0, 2.7]])
var c_b3 = BEZIER(S0)([[1.31,0, 2.421], [1.11,-0.03, 2.421], [7.62,-0.03, 2.421], [7.42,0, 2.421]])

var c_b4 = BEZIER(S0)([[1.31,2.49, 2.421], [7.42,2.49, 2.421]]) // parte dietro
var c_b5 = BEZIER(S0)([[1.16,2.49, 2.91], [7.87,2.49, 2.87]])

var c_b6 = BEZIER(S0)([[1.16,0.01, 2.91], [0.79,0.01, 2.94], [8.24,0.01, 2.94], [7.87,0.01, 2.91]]) //parte superiore
var c_b7 = BEZIER(S0)([[1.16,1, 2.91], [0.79,1, 2.94], [8.24,1, 2.94], [7.87,1, 2.91]])
var c_b8 = BEZIER(S0)([[1.16,2, 2.91], [0.79,2, 2.94], [8.24,2, 2.94], [7.87,2, 2.91]])

var c_b9 = BEZIER(S0)([[7.87,0, 2.87],[7.7,0, 2.7],[7.42,0, 2.421]]) // lato destro chiusura
var c_b10 = BEZIER(S0)([[7.87,2.49, 2.87],[7.42,2.49, 2.421]])

var c_b11 = BEZIER(S0)([[1.16,0, 2.91],[1.23,0, 2.7],[1.31,0, 2.421]]) // lato sinistro chiusura
var c_b12 = BEZIER(S0)([[1.16,2.49, 2.91],[1.31,2.49, 2.421]])

var unione_cb1 = MAP(BEZIER(S1)([c_b1,c_b2,c_b3]))(dom2D)
var unione_cb2 = MAP(BEZIER(S1)([c_b4,c_b5]))(dom2D)
var unione_cb3 = MAP(BEZIER(S1)([c_b1,c_b6,c_b7,c_b8,c_b5]))(dom2D) 
var unione_cb4 = MAP(BEZIER(S1)([c_b3,c_b4]))(dom2D)
var unione_cb5 = MAP(BEZIER(S1)([c_b9,c_b10]))(dom2D)
var unione_cb6 = MAP(BEZIER(S1)([c_b11,c_b12]))(dom2D)

var cuscino_base = COLOR([0,0,0])(STRUCT([unione_cb1,unione_cb2,unione_cb3,unione_cb4,unione_cb5,unione_cb6]))

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
var cva = extrude(SIMPLICIAL_COMPLEX([[8.4, 3.59],[9.6, 4.77],[9.7, 4.67],[8.5, 3.49]])([[0,1,2],[2,3,0]]),2.5);
cva = COLOR(rgb(verde_acqua))(T([1])([2.5])(R([1,2])(PI/2)(cva)))

///////////////////////////////////////////////////////////////////////////////////////////
var divano = T([0,1,2])([3.2,4.8,-0.83])(R([0,1])(PI/2)(STRUCT([struttura_bianca,cuscino_schienale,cuscino_base,quad_giallo,braccio_destro,cva])))

// ///////////////////////////////////////////////////////////////////////////////////////////////
// ////////////------------------------ TAVOLINO --------------------------- /////////////////////
/////----------CUBOID RIPIANI
var primo_ripiano = COLOR(rgb(legno))(T([2])([1.7])(CUBOID([6,6,0.69])))
var rip_aranc = COLOR(rgb(arancione))(T([2])([2.39])(CUBOID([6,6,0.001])))

var secondo_ripiano = SIMPLICIAL_COMPLEX([[0.2,0.2,2.9],[5.8,0.2,2.9],[0.2,5.8,2.9],[5.8,5.8,2.9],[0.7,0.7,2.4],[5.3,0.7,2.4],[0.7,5.3,2.4],[5.3,5.3,2.4]])
										([[0,1,4],[4,5,1],[1,3,7],[7,5,1],[3,2,7],[2,6,7],[0,2,6],[6,4,0],[4,6,7],[4,7,5]]);
secondo_ripiano = COLOR(rgb(grigio_scuro))(secondo_ripiano)
var rip_cel = SIMPLICIAL_COMPLEX([[0.2,0.2,2.9],[5.8,0.2,2.9],[0.2,5.8,2.9],[5.8,5.8,2.9]])([[0,1,3],[0,2,3]])
rip_cel = COLOR(rgba(celeste))(rip_cel)

///// --------APPOGGI---------- /////////////
var base_a1 = T([0,1])([-0.3,-0.3])(STRUCT([CUBOID([1.3,1.3,1.7])])) //avanti
var base_a2 = T([0,1])([5,-0.3])(STRUCT([CUBOID([1.3,1.3,1.7])])) //avanti

var base_d1 = T([0,1])([-0.3,5])(STRUCT([CUBOID([1.3,1.3,1.7])])) //avanti
var base_d2 = T([0,1])([5,5])(STRUCT([CUBOID([1.3,1.3,1.7])])) //avanti

var base_tav = COLOR(rgb(legno))(STRUCT([base_a1, base_a2, base_d1, base_d2]))

var tavolino = T([0,1,2])([5.5,7,0.1])(S([0,1,2])([0.8,0.8,0.8])(STRUCT([primo_ripiano,rip_aranc,secondo_ripiano,rip_cel,base_tav])))

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////// DIVANETTO //////////////////////////////////////////////////////////

///////---------------------STRUTTURA BIANCA-------------- ////////////
//COLOR(bianco)
var base_cuboid = COLOR(rgb(cel_chiaro))(T([0,2])([0.15,0.83])(CUBOID([4.5,1.6,0.15])))

//////// CUSCINO rosa ////////////
var cr1 = BEZIER(S0)([[3.87,0.02, 0.98],[2.64,0.02, 0.98],[1.82,0.02, 0.98],[0.98,0.02, 0.98]])
var cr2 = BEZIER(S0)([[3.87,0.02, 0.98],[4.15,0.02, 1.44],[0.58,0.02, 1.43],[0.98,0.02, 0.98]])

var cr1_y = BEZIER(S0)([[3.87,1.209, 0.98], [2.64,1.209, 0.94], [1.82,1.209, 0.95], [0.98,1.209, 0.98]])
var cr2_y = BEZIER(S0)([[3.87,1.209, 0.98],[4.15,1.209, 1.44],[0.58,1.209, 1.43],[0.98,1.209, 0.98]])

var cr3 = BEZIER(S0)([[3.87,0.02, 0.98],[4.1,-0.1, 1],[0.75,-0.1, 1],[0.98,0.02, 0.98]])

var unione_cr1 = MAP(BEZIER(S1)([cr1,cr3,cr2]))(dom2D)
var unione_cr2 = MAP(BEZIER(S1)([cr1_y,cr2_y]))(dom2D)
var unione_cr3 = MAP(BEZIER(S1)([cr1,cr1_y]))(dom2D)
var unione_cr4 = MAP(BEZIER(S1)([cr2,cr2_y]))(dom2D)

var cuscino_rosa = COLOR(rgb(rosa2))(STRUCT([unione_cr1,unione_cr2,unione_cr3,unione_cr4]))

//////////////////////////// cuscini VERDI ///////////////////////
var cv1 = BEZIER(S0)([[0.73,0.05, 1.83], [0.98,0.05, 0.99]])
var cv2 = BEZIER(S0)([[0.56,0.05, 1.81], [0.81,0.05, 0.99]])
var cv3 = BEZIER(S0)([[0.98,0.05, 0.99], [1,0.05, 0.97], [0.79,0.05, 0.97], [0.81,0.05, 0.99]]) //sotto
var cv4 = BEZIER(S0)([[0.73,0.05, 1.83], [0.74,0.05, 1.86], [0.54,0.05, 1.86], [0.56,0.05, 1.81]]) //sopra

//SINISTRA
var cv5 = BEZIER(S0)([[0.98,0.05, 1], [1,0.01, 0.99], [0.79,0.01, 0.99], [0.81,0.05, 1]]) //sotto gonf
var cv6 = BEZIER(S0)([[0.73,0.05, 1.82], [0.74,0.01, 1.82], [0.54,0.01, 1.8], [0.56,0.05, 1.8]]) //sopra gonf
//DESTRA
var cv5_d = BEZIER(S0)([[0.98,1.2, 1], [1,1.24, 0.99], [0.79,1.24, 0.99], [0.81,1.2, 1]]) //sotto gonf
var cv6_d = BEZIER(S0)([[0.73,1.2, 1.82], [0.74,1.24, 1.82], [0.54,1.24, 1.8], [0.56,1.2, 1.8]]) //sopra gonf

//
var cv7 = BEZIER(S0)([[0.73,0.08, 1.83], [0.8,0.08, 1.84],[0.91,0.08, 1], [0.98,0.08, 0.99]]) //destra
var cv8 = BEZIER(S0)([[0.73,0.9, 1.83], [0.8,0.9, 1.4],[0.98,0.9, 0.99]]) //destra
var cv9 = BEZIER(S0)([[0.56,0.08, 1.81], [0.49,0.08, 1.82],[0.88,0.08, 1], [0.81,0.08, 0.99]]) // sinistra 
var cv10 = BEZIER(S0)([[0.56,0.9, 1.81], [0.65,0.9, 1.4], [0.81,0.9, 0.99]]) //sinistra

var cv1_y = BEZIER(S0)([[0.73,1.2, 1.83], [0.98,1.2, 0.99]])  
var cv2_y = BEZIER(S0)([[0.56,1.2, 1.81], [0.81,1.2, 0.99]])
var cv3_y = BEZIER(S0)([[0.98,1.2, 0.99], [1,1.2, 0.97], [0.79,1.2, 0.97], [0.81,1.2, 0.99]])
var cv4_y = BEZIER(S0)([[0.73,1.2, 1.83], [0.74,1.2, 1.86], [0.54,1.2, 1.86], [0.56,1.2, 1.81]])

var cv7_y = BEZIER(S0)([[0.73,1.17, 1.83], [0.8,1.17, 1.84],[0.91,1.17, 1], [0.98,1.17, 0.99]]) //destra
var cv9_y = BEZIER(S0)([[0.56,1.17, 1.81], [0.49,1.17, 1.82],[0.88,1.17, 1], [0.81,1.17, 0.99]]) //sinistra

var union_cv1 = MAP(BEZIER(S1)([cv1,cv7,cv8,cv7_y,cv1_y]))(dom2D)
var union_cv2 = MAP(BEZIER(S1)([cv2,cv9,cv10,cv9_y,cv2_y]))(dom2D)

var union_cv3 = MAP(BEZIER(S1)([cv3,cv5,cv6,cv4]))(dom2D)
var union_cv4 = MAP(BEZIER(S1)([cv3_y,cv5_d,cv6_d,cv4_y]))(dom2D)

var union_cv5 = MAP(BEZIER(S1)([cv3,cv3_y]))(dom2D)
var union_cv6 = MAP(BEZIER(S1)([cv4,cv4_y]))(dom2D)

var cuscino_verde_sinistra = COLOR(rgb(verde))(T([0])([-0.02])(STRUCT([union_cv1, union_cv2, union_cv3, union_cv4, union_cv5, union_cv6])))
var cuscino_verde_destra = COLOR(rgb(verde))(T([0,1])([4.85,1.25])(R([0,1])(PI)(STRUCT([union_cv1, union_cv2, union_cv3, union_cv4,union_cv5, union_cv6]))))

/////// CUSCINO BLU SCHIENALE //////////
var cbs1 = BEZIER(S0)([[0.97,1.21, 0.99], [1.6+0.1,1.3, 2.38], [0.88,1.4, 2.08], [2.43,1.4, 2.13], [3.98,1.4,2.08], [3.26-0.1,1.3,2.38], [3.89,1.21,0.99]])
var cbs2 = BEZIER(S0)([[0.97,1.41, 0.99], [1.6+0.1,1.5, 2.38], [0.88,1.6, 2.08], [2.43,1.6, 2.13], [3.98,1.6,2.08], [3.26-0.1,1.5,2.38], [3.89,1.41,0.99]])
var cbs3 = BEZIER(S0)([[0.97,1.31, 0.99], [1.5-0.1,1.4, 2.45], [0.78,1.5, 2.15], [2.43,1.5, 2.2], [4.08,1.5,2.15], [3.36+0.1,1.4,2.45], [3.89,1.31,0.99]]) //nel mezzo

//sotto
var cbs4 = BEZIER(S0)([[0.97,1.21, 0.99], [0.94,1.205, 0.91], [3.89,1.205, 0.91], [3.89,1.21, 0.99]])
var cbs4_y = BEZIER(S0)([[0.97,1.41, 0.99], [0.94,1.41, 0.91], [3.89,1.41, 0.91], [3.89,1.41, 0.99]])
//
var cbs5 = BEZIER(S0)([[0.97,1.21, 0.99], [1.17,1.16, 1.63], [3.69,1.16, 1.79], [3.89,1.21, 0.99]])
var cbs6 = BEZIER(S0)([[0.97,1.41, 0.99], [1.17,1.5, 1.63], [3.69,1.5, 1.79], [3.89,1.41, 0.99]])

var union_cbs1 = MAP(BEZIER(S1)([cbs1,cbs3,cbs2]))(dom2D)
var union_cbs2 = MAP(BEZIER(S1)([cbs4,cbs4_y]))(dom2D)

var union_cbs3 = MAP(BEZIER(S1)([cbs1,cbs5,cbs4]))(dom2D)
var union_cbs4 = MAP(BEZIER(S1)([cbs2,cbs6,cbs4_y]))(dom2D)

var cuscino_blu = COLOR(rgb(blu))(T([0,2])([-0.65,-0.09])(S([0,1,2])([1.25,1,1.1])(STRUCT([union_cbs1, union_cbs2, union_cbs3, union_cbs4]))))

/////// PIEDI DIVANO
var pd1 = T([0,1,2])([0.35,0.2,0.23])(cilynder(0.05,0.6))
var pd2 = T([0,1,2])([4.4,0.2,0.23])(cilynder(0.05,0.6)) //avanti
var disk1 = T([0,1,2])([0.35,0.2,0.23])(extrude(DISK(0.055)([64, 2]),0.02))
var disk2 = T([0,1,2])([4.4,0.2,0.23])(extrude(DISK(0.055)([64, 2]),0.02))

////// posteriori obliqui
var po1 = cambia_valore_coordinata(punti_controllo_cerchio_assi_x_y(0.05),2,0.6)
var po2 = cambia_valore_coordinata(punti_controllo_cerchio_assi_x_y(0.05),1,0.25)

var nodi = calcola_nodi(po1,2)

var nn1 = NUBS(S0)(2)(nodi)(po1);
var nn2 = NUBS(S0)(2)(nodi)(po2);
var bezier = BEZIER(S1)([nn1,nn2]);

var pd3 = T([0,1,2])([0.35,1.35,0.23])(MAP(bezier)(dominio3D));
var pd4 = T([0,1,2])([4.4,1.35,0.23])(MAP(bezier)(dominio3D));
var disk3 = T([0,1,2])([0.35,1.595,0.23])(extrude(DISK(0.055)([64, 2]),0.02))
var disk4 = T([0,1,2])([4.4,1.595,0.23])(extrude(DISK(0.055)([64, 2]),0.02))

var p_base = COLOR(rgb(grigio_p))(STRUCT([pd1,pd2,pd3,pd4]))
var disks = COLOR([0,0,0])(STRUCT([disk1,disk2,disk3,disk4]))

var divanetto = STRUCT([base_cuboid, cuscino_rosa, cuscino_verde_destra, cuscino_verde_sinistra,cuscino_blu, disks, p_base])
divanetto = T([0,1,2])([13,14.6,-0.3])(R([0,1])(-PI/2)(S([0,1,2])([2,2,2])(divanetto)))

/////////////////////////// OGGETTO SOPRA TAVOLO //////////////////////////////////////////////////////
//cil obliqui
var co1 = cambia_valore_coordinata(punti_controllo_cerchio_assi_x_y(0.1),1,0.18)
var co2 = cambia_valore_coordinata(punti_controllo_cerchio_assi_x_y(0.1),2,0.15)
var co3 = cambia_valore_coordinata(co1,2,0.3)
var co4 = cambia_valore_coordinata(co1,2,-0.2)

var node = calcola_nodi(co1,2)

var nubs1 = NUBS(S0)(2)(node)(co1);
var nubs2 = NUBS(S0)(2)(node)(co2);
var nubs3 = NUBS(S0)(2)(node)(co3);
var nubs4 = NUBS(S0)(2)(node)(co4);

var a_bezier1 = BEZIER(S1)([nubs1,nubs2]);
var a_bezier2 = BEZIER(S1)([nubs2,nubs3]);
var a_bezier3 = BEZIER(S1)([nubs4,nubs1]);

var union = STRUCT([MAP(a_bezier1)(dominio3D), MAP(a_bezier2)(dominio3D)])

var modello1 = (STRUCT(REPLICA(3)([union,T1([2])([0.3])])))
modello1 = T([1])([-0.55])(STRUCT([modello1,MAP(a_bezier3)(dominio3D)]))

///devo ruotare per avere più pezzi
function oggetti_ruotati(obj,num){
  var struct = STRUCT([obj])
  for (i=(2*PI)/num; i<2*PI; i+=(2*PI)/num){
    struct = STRUCT([struct,R1([0,1])(i)(obj)])
  }
  return struct;
}

var struct_compl = T([2])([0.38])(oggetti_ruotati(modello1,6));
var disk_base = extrude(DISK(0.55)([64, 2]),0.18)
var disk_alto = T([2])([1.28])(extrude(DISK(0.555)([64, 2]),0.06))

///parte superiore

var Su0 = BEZIER(S0)([[0.55,0, 0.01], [0.5,0, 0.15], [1.08,0, 0.22], [0.89,0, 0.26],[0.84,0, 0.34],[0.44,0, 0.06],[0.53,0, 0.01]])
// cerchio
var Su1 = BEZIER(S1)(punti_cerchio_bezier(1));
var parte_superiore = T([1,2])([-0.015,1.35])(MAP(PROFILEPROD_SURFACE([Su0,Su1]))(dom2D));

var disk_m = COLOR(rgb(grigio_blu))(T([2])([1.34])(extrude(DISK(0.551)([64, 2]),0.04))) //disco colorato grigio
var disk_c = T([2])([1.38])(extrude(DISK(0.551)([64, 2]),0.001)) //disco copertura

var oggetto = COLOR(rgb(metallo))(STRUCT([struct_compl,disk_alto,disk_base,parte_superiore,disk_c]))
oggetto = T([0,1,2])([8,9.5,2.42])(STRUCT([oggetto,disk_m]))

//////////////////////////// LAMPADA ////////////////////////////////////////////////////////////////
//disco base
var disk_terra = COLOR(rgb(grigio_Sc))(T([0])([1.2])(extrude(DISK(0.6)([64, 2]),0.2)))
///CUBOID NERO 
var cub_base = COLOR([0,0,0])(T([0,1,2])([1.13,-0.1,0.2])(CUBOID([0.15,0.15,5])))
//dischi ruotati verdi
var d_v1 = R([1,2])(PI/2)(extrude(DISK(0.3)([64, 2]),0.05))
var d_v2 = T([1])([0.2])(R([1,2])(PI/2)(extrude(DISK(0.3)([64, 2]),0.05)))
//disk obliqui 
var d_o1 = T([1])([0.07])(R([0,2])(PI/3.8)(extrude(DISK(0.04)([64, 2]),1.3)))
var d_o2 = T([1])([0.07])(R([0,2])(-PI/3.8)(extrude(DISK(0.04)([64, 2]),1.3)))

var dischi_verdi = T([0,1,2])([1.2,-0.1,5.1])(COLOR(rgb(verde))(STRUCT([d_v1,d_v2,d_o1,d_o2])))

///luce bianca
var luce_b1 = BEZIER(S0)([[0.15,0, 5.23], [0.7,0, 6.02], [1.69,0, 6.02], [2.3,0, 5.21]])
var luce_b2 = BEZIER(S0)([[0.15,0.4, 5.23], [0.7,0.4, 6.02], [1.69,0.4, 6.02], [2.3,0.4, 5.21]])
var unione_luce_b1 = COLOR(rgb(bianco))(T([1,2])([-0.2,0.4])(MAP(BEZIER(S1)([luce_b1,luce_b2]))(dom2D)))

///cuboid rosso
var cub_rosso = COLOR(rgb(rosso))(T([0,1,2])([1,-0.1,5.2])(CUBOID([0.4,0.15,0.3])))

//// cilindro piccolo nel mezzo dei due cilindri verdi
var cerchio1 = BEZIER(S0)(cambia_valore_coordinata(punti_cerchio_bezier(0.04),2,0.01))
var cerchio2 = BEZIER(S0)(cambia_valore_coordinata(punti_cerchio_bezier(0.09),2,0.03))
var cerchio3 = BEZIER(S0)(cambia_valore_coordinata(punti_cerchio_bezier(0.1),2,0.05))

var cerchio4 = BEZIER(S0)(cambia_valore_coordinata(punti_cerchio_bezier(0.1),2,0.35))
var cerchio5 = BEZIER(S0)(cambia_valore_coordinata(punti_cerchio_bezier(0.09),2,0.37))
var cerchio6 = BEZIER(S0)(cambia_valore_coordinata(punti_cerchio_bezier(0.04),2,0.39))

var unione_cerc1 = MAP(BEZIER(S1)([[0,0,0.005],cerchio1,cerchio2,cerchio3]))(dom2D)
var unione_cerc2 = MAP(BEZIER(S1)([cerchio4,cerchio5,cerchio6,[0,0,0.395]]))(dom2D)
var unione_cerc3 = MAP(BEZIER(S1)([cerchio4,cerchio3]))(dom2D)

var unione_cerc = T([0,1,2])([1.2,0.2,5.1])(S([0,1,2])([0.4,1.1,0.4])(R([1,2])(PI/2)(COLOR(rgb(grigio_Sc))(STRUCT([unione_cerc1,unione_cerc2,unione_cerc3])))))

var lampada = R([0,1])(PI/2)(S([0,1,2])([1.7,1.7,1.7])(STRUCT([disk_terra, cub_base, dischi_verdi,unione_luce_b1,cub_rosso, unione_cerc])))

lampada = T([0,1,2])([-1.5,8,0.1])(lampada)

////////////////////////// tavolino tondo bordeaux ///////////////////////////////////////////////////////////////
var d_tondo1 = extrude(DISK(1)([64, 2]),0.5)
var d_tondo2 = T1([2])([1.4])(d_tondo1)
var disk_tb = extrude(DISK(0.13)([64, 2]),0.01)

var cil1 = cilynder(0.1,0.9)
cil1 = COLOR(rgb(metallo))(T([0,1,2])([-0.4,-0.4,0.5])(STRUCT([cil1,disk_tb])))

var cils1 = STRUCT(REPLICA(2)([cil1,T1([0])([0.8])])) //davanti
var cils2 = STRUCT(REPLICA(2)([cils1,T1([1])([0.8])])) //dietro

var strutt_bordeaux = COLOR(rgb(bordeaux))(STRUCT([d_tondo1,d_tondo2]))

var tavolino_b = T([0,1,2])([13,16,0.1])(STRUCT([strutt_bordeaux,cils1,cils2]))
/////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// var salotto = STRUCT([pavimento, muro_sin, muro_front, balconi, tenda, divano, poltrona, tavolino, divanetto, oggetto, lampada])

DRAW(pavimento)
DRAW(muro_sin)
DRAW(muro_front)
DRAW(balconi)
DRAW(tenda)
DRAW(divano)
DRAW(poltrona)
DRAW(tavolino)
DRAW(divanetto)
DRAW(oggetto)
DRAW(lampada)
DRAW(tavolino_b)
