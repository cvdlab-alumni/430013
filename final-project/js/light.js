//////////////////////LAMPADA////////////////////////////////

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

var rosso = [234,21,23]
var verde = [46,186,92]

var bianco = [325,325,325]
var grigio_Sc = [47,47,47]


var x = 32
var domain = INTERVALS(1)(x)
var dom2D = PROD1x1([INTERVALS(1)(x),INTERVALS(1)(x)])
var dominio3D = DOMAIN([[0,1],[0,1]])([30,40]);


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

var lampada = STRUCT([disk_terra, cub_base, dischi_verdi,unione_luce_b1,cub_rosso, unione_cerc])
DRAW(lampada)

