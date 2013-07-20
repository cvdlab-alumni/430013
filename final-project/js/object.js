// oggetto sopra il tavolo

//funzioni supporto

// definizione della TRASLAZIONE, ROTAZIONE E SCALAMENTO senza clone()
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

function punti_controllo_cerchio_assi_x_y(r){
    var c = [[0,-1,0],[0.33,-0.966,0],[0.7,-0.733,0],[0.966,-0.33,0],[1,0,0],[0.966,0.33,0],[0.7,0.733,0],[0.33,0.966,0],[0,1,0],[-0.33,0.966,0],[-0.7,0.733,0],[-0.966,0.33,0],[-1,0,0],[-0.966,-0.33,0],[-0.7,-0.733,0],[-0.33,-0.966,0],[0,-1,0]];
  for(var i=0;i<c.length;i++)
    for(var k=0;k<c[i].length;k++)
    c[i][k] = c[i][k]*r;
  return c;
}

//creazione di un cerchio con bezier
function punti_cerchio_bezier(r){
  var c = [[0,1,0],[1.6,1,0],[1.6,-1.5,0],[0,-1.5,0],[-1.6,-1.5,0],[-1.6,1,0],[0,1,0]];
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

function extrude(obj, h){
  return EXTRUDE([h])(obj);
}

var x = 32
var domain = INTERVALS(1)(x)
var dom2D = PROD1x1([INTERVALS(1)(x),INTERVALS(1)(x)])
var dominio3D = DOMAIN([[0,1],[0,1]])([30,40]);

var metallo = [221,200,181]
var grigio_blu = [181,190,199]

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
oggetto = STRUCT([oggetto,disk_m])
DRAW(oggetto)
