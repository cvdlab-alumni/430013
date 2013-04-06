/*TRASLAZIONE*********************************/
T = function(dims){
/*devo aggiungere una mappatura*/
	dims = dims.map(function(dim){
	return dim -1;
	});
	return function(value){
		return function(object){
			return object.clone().translate(dims,value);
		}
	}
}

/*SCALAMENTO*********************************/
S = function(dims){
/*devo aggiungere una mappatura*/
	dims = dims.map(function(dim){
	return dim -1;
	});
	return function(value){
		return function(object){
			return object.clone().scale(dims,value);
		}
	}
}

/*ROTAZIONE***********************************/
R = function(dims){
/*devo aggiungere una mappatura*/
	dims = dims.map(function(dim){
	return dim -1;
	});

	return function(angle){
		return function(object){
			return object.clone().rotate(dims,angle);
		}
	}
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

var raggio_pillar0 = 0.125;

var base_pillar = T([1,2])([raggio_pillar0,raggio_pillar0])(circle(raggio_pillar0));

var z_pillar0 = 2.5;

// #### piano terra ####
/*traslazione dell'origine*/
var pillar0 = extrude(base_pillar, z_pillar0);

// # 5 pilastri piano terra
var pillars01x = STRUCT(REPLICA(5)([pillar0, T([1])([2.75])]));
// #pilastro laterale asse y
var pillar01y = T([2])([5.32])(pillar0);
// #unione pilastri piano terra esterni
var pillars_es = STRUCT([pillars01x,pillar01y]);

// # 4 pilastri interni piano terra
var l = 0.25;
var l_small = 0.2;
var pillar_rett = CUBOID([l,l,z_pillar0]);

// #primo pilastro
var pillar_01_int = T([1,2])([1.46,5.32])(pillar_rett);
// # 3 pilastri interni/ traslazione
var pillars_03_int = STRUCT(REPLICA(3)([pillar_rett, T([1])([2.75])]));
var pillars_03_trasl = T([1,2])([2.75,5.32])(pillars_03_int);

// #unione di tutti i pilastri interni ed esterni piano terra
var pillars0 = STRUCT([pillars_es,pillar_01_int,pillars_03_trasl]);

// #### primo piano ####
var h_piano = 0.3905;
var pillar_rett_small = CUBOID([l_small,l_small,z_pillar0]);
// # 5 pilastri primo piano traslati
var pillars1_5 = STRUCT(REPLICA(5)([pillar_rett, T([1])([2.75])]));
var pillars1_5_trasl = T([3])([2.5+h_piano])(pillars1_5);
// #traslazione asse y pilastri interni
var pillar1_y = T([2,3])([5.32,(2.5+h_piano)])(pillar_rett);
var pillars1_3_y = STRUCT(REPLICA(3)([pillar1_y, T([1])([2.75])]));
// #pilastro cilindrico primo piano
var pillars1_cil = T([1,2,3])([8.25,5.32,(2.5+h_piano)])(pillar0);
// #pilastro piu piccolo primo piano
var pillar1_small = T([1,2,3])([1.46,5.32,(2.5+h_piano)])(pillar_rett_small);
// #quarto pilastro traslato 
var pillar1_4_y = T([1,2,3])([11,5.32,2.5+h_piano])(pillar_rett);

// #pilastri completi del primo piano
var pillars1 = STRUCT([pillars1_5_trasl,pillar1_y,pillars1_3_y,pillars1_cil, pillar1_small,pillar1_4_y]);

// #### secondo piano ####
// #2 pilastri consecutivi
var pillars2_2 = STRUCT(REPLICA(3)([pillar_rett, T([1])([2.75])]));
var pillars2_2_trasl = T([3])([(2.5+h_piano)*2])(pillars2_2);
// #pilastro a lato 
var pillar2_1 = T([1,3])([11,(2.5+h_piano)*2])(pillar_rett);
var pillars2_3_y = STRUCT(REPLICA(5)([pillar_rett, T([1])([2.75])]));
var pillars2_3_y_trasl = T([2,3])([5.32,(2.5+h_piano)*2])(pillars2_3_y);

// #allineamento dei 4 pilastri dove non e' presente il pavimento
var pillar2_rett = CUBOID([l,l,h_piano]);
var pillars2_2_all = STRUCT(REPLICA(2)([pillar2_rett, T([1])([2.75])]));
var pillars2_2_all_trasl = T([3])([2.5+h_piano+2.5])(pillars2_2_all);
var pillars2_2_y = T([2,3])([5.32,(2.5+h_piano+2.5)])(pillars2_2_all);
// # totale dei pilastri del secondo piano
var pillars2 = STRUCT([pillars2_2_trasl, pillar2_1, pillars2_3_y_trasl,pillars2_2_all_trasl, pillars2_2_y]);

// #### terzo piano ####
// #pilastri laterali destra
var pillars3_2_x = STRUCT(REPLICA(2)([pillar_rett, T([1])([5.5])]));
var pillars3_2_xtrasl = T([1,3])([5.5,(2.5+h_piano)*3])(pillars3_2_x);
// #pilastri laterali destra posteriori(uso la variabile pillars usata per il primo piano)
var pillars3_3_y = T([1,3])([5.5,(2.5+h_piano)*2])(pillars1_3_y);
// #pilastri piccoli sinistra
var pillars3_2_small = STRUCT(REPLICA(2)([pillar_rett_small, T([1])([2.75])]));
var pillars3_2_small_trasl = T([2,3])([5.3825,(2.5+h_piano)*3])(pillars3_2_small);
// #pilastro isolato 
var pillars3_1 = T([1,2,3])([11,5.32+l+1.18575,(2.5+h_piano)*3])(pillar_rett);
// #totale pilastri terzo piano
var pillars3 = STRUCT([pillars3_2_xtrasl,pillars3_3_y, pillars3_2_small_trasl, pillars3_1]);

var buildings = STRUCT([pillars0,pillars1,pillars2, pillars3]);

DRAW(buildings)

