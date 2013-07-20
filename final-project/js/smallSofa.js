////// DIVANETTO 
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

function extrude(obj, h){
  return EXTRUDE([h])(obj);
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

var rosa = [246,87,117]
var bianco = [325,325,325]
var cel_chiaro = [216,234,243]
var verde = [46,186,92]
var blu = [42,69,119]
var grigio_p = [97,84,69]

var x = 32
var domain = INTERVALS(1)(x)
var dom2D = PROD1x1([INTERVALS(1)(x),INTERVALS(1)(x)])
var dominio3D = DOMAIN([[0,1],[0,1]])([30,40]);

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

var cuscino_rosa = COLOR(rgb(rosa))(STRUCT([unione_cr1,unione_cr2,unione_cr3,unione_cr4]))

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
DRAW(divanetto)
