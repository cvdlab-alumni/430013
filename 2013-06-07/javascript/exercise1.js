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


