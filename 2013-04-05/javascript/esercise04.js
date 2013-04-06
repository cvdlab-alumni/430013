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

// //////// piano terra ////////
/*traslazione dell'origine*/
var pillar0 = extrude(base_pillar, z_pillar0);

// // 5 pilastri piano terra
var pillars01x = STRUCT(REPLICA(5)([pillar0, T([1])([2.75])]));
// //pilastro laterale asse y
var pillar01y = T([2])([5.32])(pillar0);
var pillar01y_trasl = STRUCT(REPLICA(2)([pillar01y, T([1])([11])]))
// //unione pilastri piano terra esterni
var pillars_es = STRUCT([pillars01x,pillar01y_trasl]);

// // 4 pilastri interni piano terra
var l = 0.25;
var l_small = 0.2;
var pillar_rett = CUBOID([l,l,z_pillar0]);

// //primo pilastro
var pillar_01_int = T([1,2])([1.46,5.32])(pillar_rett);
// // 3 pilastri interni/ traslazione
var pillars_03_int = STRUCT(REPLICA(3)([pillar_rett, T([1])([2.75])]));
var pillars_03_trasl = T([1,2])([2.75,5.32])(pillars_03_int);

// //unione di tutti i pilastri interni ed esterni piano terra
var pillars0 = STRUCT([pillars_es,pillar_01_int,pillars_03_trasl]);

// //////// primo piano ////////
var h_piano = 0.3905;
var pillar_rett_small = CUBOID([l_small,l_small,z_pillar0]);
// // 5 pilastri primo piano traslati
var pillars1_5 = STRUCT(REPLICA(5)([pillar_rett, T([1])([2.75])]));
var pillars1_5_trasl = T([3])([2.5+h_piano])(pillars1_5);
// //traslazione asse y pilastri interni
var pillar1_y = T([2,3])([5.32,(2.5+h_piano)])(pillar_rett);
var pillars1_3_y = STRUCT(REPLICA(3)([pillar1_y, T([1])([2.75])]));
// //pilastro cilindrico primo piano
var pillars1_cil = T([1,2,3])([8.25,5.32,(2.5+h_piano)])(pillar0);
// //pilastro piu piccolo primo piano
var pillar1_small = T([1,2,3])([0.73,5.32,(2.5+h_piano)])(pillar_rett_small);
// //quarto pilastro traslato 
var pillar1_4_y = T([1,2,3])([11,5.32,2.5+h_piano])(pillar_rett);

// //pilastri completi del primo piano
var pillars1 = STRUCT([pillars1_5_trasl,pillar1_y,pillars1_3_y,pillars1_cil, pillar1_small,pillar1_4_y]);

// //////// secondo piano ////////
// //2 pilastri consecutivi
var pillars2_2 = STRUCT(REPLICA(3)([pillar_rett, T([1])([2.75])]));
var pillars2_2_trasl = T([3])([(2.5+h_piano)*2])(pillars2_2);
// //pilastro a lato 
var pillar2_1 = T([1,3])([11,(2.5+h_piano)*2])(pillar_rett);
var pillars2_3_y = STRUCT(REPLICA(5)([pillar_rett, T([1])([2.75])]));
var pillars2_3_y_trasl = T([2,3])([5.32,(2.5+h_piano)*2])(pillars2_3_y);

// // totale dei pilastri del secondo piano
var pillars2 = STRUCT([pillars2_2_trasl, pillar2_1, pillars2_3_y_trasl]);

// //////// terzo piano ////////
// //pilastri laterali destra
var pillars3_2_x = STRUCT(REPLICA(2)([pillar_rett, T([1])([5.5])]));
var pillars3_2_xtrasl = T([1,3])([5.5,(2.5+h_piano)*3])(pillars3_2_x);
// //pilastri laterali destra posteriori(uso la variabile pillars usata per il primo piano)
var pillars3_3_y = T([1,3])([5.5,(2.5+h_piano)*2])(pillars1_3_y);
// //pilastri piccoli sinistra
var pillars3_2_small = STRUCT(REPLICA(2)([pillar_rett_small, T([1])([2.75])]));
var pillars3_2_small_trasl = T([2,3])([5.3825,(2.5+h_piano)*3])(pillars3_2_small);
// //pilastro isolato 
var pillars3_1 = T([1,2,3])([11,5.32+1.18575,(2.5+h_piano)*3])(pillar_rett);
//allineamento del pilastro dove non e' presente il pavimento
var pillar2_rett = CUBOID([l,l,h_piano]);
var pillars2_2_all = STRUCT(REPLICA(2)([pillar2_rett, T([1])([2.75])]));
var pillars_no_pavimento = T([1,2,3])([2.75,5.32,(2.5+h_piano)*2+2.5])(pillar2_rett);
//pilastro fuori angolo
var pillar3_ang = T([3])([(2.5+h_piano)*3])(pillar0);
//totale pilastri terzo piano
var pillars3 = STRUCT([pillars3_2_xtrasl,pillars3_3_y, pillars3_2_small_trasl, pillars3_1, pillars_no_pavimento,pillar3_ang]);

//////esercise02.js

var appoggio_piano_terra = CUBOID([11.25,6.7557]);
//////// piano terra ////////

//funzione che mi restituisce una semicirconferenza
function semicircle(r){
 var domain = DOMAIN([[0,PI]])([36]);

 var circ = function (r) {
 	 return function (v) {
  return [r*COS(v[0]), r*SIN(v[0])];
  };
 };

 var mapping = circ(r);

 return (MAP(mapping)(domain));
}
 
//misure semicerchi 
var semcirc_gr_2D = semicircle(1.35);
var semcirc_pic_2D = semicircle(0.54);

//  definizione dei due semicerchi ruotati
var semicirc_grande = R([1,2])(-PI/2)(extrude(semcirc_gr_2D,0.39));
var semicirc_piccola = R([1,2])(PI)(extrude(semcirc_pic_2D,0.39));

var sem_gr_trasl = T([1,2])([9.24,5.4])(semicirc_grande);
var sem_pic_trasl = T([1,2])([1.67,1.75])(semicirc_piccola);

//quadrato grande 
var quad_piano_terra = CUBOID([8.15,5,0.39]);
var quad_pt_trasl = T([1,2])([1.13,1.75])(quad_piano_terra);
//quadrato lato balcone
var quad_2_pt = CUBOID([2.3,1.43,0.39]);
var quad_2_pt_trasl = T([2])([5.32])(quad_2_pt);

var floor0 = STRUCT([sem_gr_trasl, sem_pic_trasl,quad_pt_trasl,quad_2_pt_trasl]);



//////// primo piano ////////
//primo quadrato per pavimento primo piano
var floor_1 = CUBOID([2.21,1.5,0.39]);
var floor_1_trasl = T([2,3])([5.25,2.5])(floor_1);
//secondo quadrato per pavimento
var floor_2 = CUBOID([3.46,0.25,0.39]);
var floor_2_trasl = T([1,2,3])([2.21,6.5,2.5])(floor_2);
//terzo quadrato per pavimento
var floor_3 = CUBOID([5.58,1.5,0.39]);
var floor_3_trasl = T([1,2,3])([5.67,5.25,2.5])(floor_3);
//quarto quadrante per completare il primo piano
var floor_4 = CUBOID([11.25,5.25,0.39]);
var floor_4_trasl = T([3])([2.5])(floor_4);

//unione pilastri corrispondenti scale
var pillars1_2_trasl = T([1,2,3])([2.75,5.32,2.5])(pillars2_2_all);

var balcone1 = CUBOID([1.44,1.21,0.39]);
var balcone1_trasl = T([1,2,3])([-1.44,5.32,2.5])(balcone1);

var floor1 = STRUCT([floor_1_trasl,floor_2_trasl,floor_3_trasl, floor_4_trasl,pillars1_2_trasl, balcone1_trasl]);

//////// secondo piano ////////
//pentag 
var pentag = extrude(SIMPLICIAL_COMPLEX([[5.47,0],[11.25,0],[11.25,6.75],[4.51,6.75],[4.51,5.32]])([[0,2,4],[3,4,1],[3,2,4],[0,1,2]]),0.39);
var pentag_3D = extrude(pentag,h_piano);
var pentag_trasl = T([3])([2.5+h_piano+2.5])(pentag_3D);
//supporto laterale
var rett_1 = CUBOID([5.47,0.25,0.39]);
var rett_1_trasl = T([3])([2.5+h_piano+2.5])(rett_1);

var rett_2 = CUBOID([0.25,5.32,0.39]);
var rett_2_trasl = T([3])([2.5+h_piano+2.5])(rett_2);

var rett_3 = CUBOID([1.05,1.43,0.39]);
var rett_3_trasl = T([2,3])([5.32,2.5+h_piano+2.5])(rett_3);

//delineo il vuoto per la scala
var rett_4 = CUBOID([3.46,0.25,0.39]);
var rett_4_trasl = T([1,2,3])([1.05,6.5,2.5+h_piano+2.5])(rett_4);
var rett_4_parall = CUBOID([3.46,0.125,0.39]);
var rett_4_trasl_parall = T([1,2,3])([1.05,5.44,2.5+h_piano+2.5])(rett_4);

var floor2 = STRUCT([pentag_trasl,rett_1_trasl, rett_2_trasl, rett_3_trasl, rett_4_trasl, rett_4_trasl_parall]);

//////// terzo piano ////////
//definizione dei cubi per costruire il terzo piano
//quadrato piu' grande 
var quad_1 = CUBOID([5.75,5.57,0.39]);
var quad_1_trasl = T([1,3])([5.5,((2.5+h_piano)*2)+2.5])(quad_1);
//quadrato con pilastro isolato piu piccolo destra
var quad_2 = CUBOID([3,1.43,0.39]);
var quad_2_trasl = T([1,2,3])([5.5+2.75,5.32,((2.5+h_piano)*2)+2.5])(quad_2);

//contorno scala
var contorno_sc = CUBOID([2.75,0.25,0.39]);
var cont_sc_trasl = T([1,2,3])([5.5,6.5,((2.5+h_piano)*2)+2.5])(contorno_sc);

//quadrato lato sinistro struttura
var quad_3 = CUBOID([5.5,6.75,0.39]);
var quad_3_trasl = T([3])([((2.5+h_piano)*2)+2.5])(quad_3);


var floor3 = STRUCT([quad_1_trasl,quad_2_trasl,quad_3_trasl, cont_sc_trasl]);

//////// piano 4 / TETTO ////////
//quadrato grande 
var quad_4_gr = CUBOID([5.75,6.7557,0.39]);
var quad_4_trasl = T([1,3])([5.5,((2.5+h_piano)*3)+2.5])(quad_4_gr);
//rettangolo fine copertura
var rett_4_tetto = CUBOID([5.5,1.43,0.39]);
var rett_4_tetto_trasl = T([2,3])([5.32,((2.5+h_piano)*3)+2.5])(rett_4_tetto);
//contorno esterno
var contorno1 = CUBOID([0.25,6.75,0.39]);
var cont_1_trasl = T([3])([((2.5+h_piano)*3)+2.5])(contorno1);
var contorno2 = CUBOID([5.5,0.25,0.39]);
var cont_2_trasl = T([3])([((2.5+h_piano)*3)+2.5])(contorno2);

var floor4 = STRUCT([quad_4_trasl,rett_4_tetto_trasl, cont_1_trasl,cont_2_trasl]);

//totale dei piani compreso l'appoggio della lastra per il piano terra
var floors = STRUCT([appoggio_piano_terra,floor0,floor1,floor2,floor3,floor4]);


//////// esercise03.py ////

//////// FACE WEST ////////

//muro piano terra
var muro_princ = CUBOID([7.16,0.25,2.5]);
var muro_princ_trasl = T([2])([6.50])(muro_princ);

var muro_basso_finestra = CUBOID([0.84,0.25,1.66]);
var mbf_trasl = T([1,2])([7.16,6.50])(muro_basso_finestra);

var muro_lato_fin = CUBOID([0.5,0.25,2.5]);
var mlf_trasl = T([1,2])([8,6.50])(muro_lato_fin);

//muro primo piano

var muro_des = CUBOID([5.12,0.25,2.5]);
var muro_des_trasl= T([2,3])([6.50,2.5+0.39])(muro_des);

var muro_s_fin = CUBOID([1.23*2,0.25,1.27]);
var msf_trasl = T([1,2,3])([5.12,6.50,2.5+0.39])(muro_s_fin);

var muro_sin = CUBOID([3.67,0.25,2.5]);
var ms_trasl = T([1,2,3])([7.58,6.50,2.5+0.39])(muro_sin);

//muro secondo piano
var muro_des_2 = CUBOID([8.91,0.25,2.5]);
var md2_trasl = T([2,3])([6.50,(2.5+0.39)*2])(muro_des_2);

//muro terzo piano
var muro_t = CUBOID([11.25,0.25,2.5]);
var mt_trasl = T([2,3])([6.50,(2.5+0.39)*3])(muro_t);

var muro_basso_fin2 = CUBOID([0.26,0.25,1.26]);
var mbf2_trasl = T([1,2,3])([8.91,6.50,(2.5+0.39)*2])(muro_basso_fin2);

var muro_tra_fin = CUBOID([0.25,0.25,2.5]);
var mtf_trasl = T([1,2,3])([9.17,6.50,(2.5+0.39)*2])(muro_tra_fin);

//muro sotto seconda finestra
var mssf_trasl = T([1,2,3])([9.42,6.50,(2.5+0.39)*2])(muro_basso_fin2);
var muro_sin_fin = CUBOID([1.57,0.25,2.5]);
var msin_fin_trasl = T([1,2,3])([9.67,6.50,(2.5+0.39)*2])(muro_sin_fin);

var west = STRUCT([muro_princ_trasl,mbf_trasl, mlf_trasl, muro_des_trasl,msf_trasl,ms_trasl,md2_trasl,mbf2_trasl,mtf_trasl,mssf_trasl,msin_fin_trasl,mt_trasl]);
//////// FACE NORTH ////////

//muro primo piano
var muro_sotto_fin = CUBOID([0.25,6.24,1.27]);
var muro_primopiano_trasl =  T([1,3])([11,2.5+0.39])(muro_sotto_fin);

//muro tra le 2 finestre
var muro_in_fin = CUBOID([0.25,1.58,1.23]);
var mif_trasl = T([1,2,3])([11,4.67,1.27+(2.5+0.39)])(muro_in_fin)

//muro secondo piano
var muro_secpiano_trasl2 = T([1,3])([11,(2.5+0.39)*2])(muro_sotto_fin)
//muro tra le 2 finestre
var mif_trasl2 = T([1,2,3])([11,4.67,1.27+(2.5+0.39)*2])(muro_in_fin)

//muro terzo piano
var muro_terpiano_trasl3 = T([1,3])([11,(2.5+0.39)*3])(muro_sotto_fin)

//muro tra le 2 finestre
var mif_trasl3 = T([1,2,3])([11,4.67,1.27+(2.5+0.39)*3])(muro_in_fin)

var north = STRUCT([muro_primopiano_trasl,mif_trasl,muro_secpiano_trasl2,mif_trasl2,muro_terpiano_trasl3,mif_trasl3]);

//////// FACE SOUTH ////////

//balcone
var balc_fac = CUBOID([0.25,1.21,1.4]);
var balc_trasl = T([1,2,3])([-1.44,5.32,2.5])(balc_fac);

var mur_tra_fin1 = CUBOID([0.25,0.5,2.5]);
var mtr1f_trasl = T([2,3])([4.92,2.5+0.39])(mur_tra_fin1);

//secondo piano
var muro_sopra_balc = CUBOID([0.25,1.71,2.5]);
var msb_trasl =T([2,3])([4.92,(2.5+0.39)*2])(muro_sopra_balc);

//terzo piano
var muro_terrazzo = CUBOID([0.25,6.5,1.27]);
var muro_terr_trasl = T([3])([(2.5+0.39)*3])(muro_terrazzo);

var south = STRUCT([balc_trasl,mtr1f_trasl,msb_trasl,muro_terr_trasl]);

//////// FACE EAST ////////
//primo piano
var muro_princ1 = CUBOID([5.79,0.25,2.5]);
var muro_prin1_trasl = T([3])([2.5+0.39])(muro_princ1);

var muro_sotto_fin1 = CUBOID([5.46,0.25,1.27]);
var msfs_trasl = T([1,3])([5.79,2.5+0.39])(muro_sotto_fin1);
//secondo piano
var muro_prin2_trasl = T([3])([(2.5+0.39)*2])(muro_princ1);
var msfs2_trasl = T([1,3])([5.79,(2.5+0.39)*2])(muro_sotto_fin1);
//terzo piano
var msfs3_traslA = T([3])([(2.5+0.39)*3])(muro_sotto_fin1);
var msfs3_traslB = T([1,3])([5.79,(2.5+0.39)*3])(muro_sotto_fin1);

var east = STRUCT([muro_prin1_trasl,msfs_trasl,msfs2_trasl,muro_prin2_trasl,msfs3_traslB,msfs3_traslA]);

//// esercise04 //////

var finestra1 = CUBOID([0.84,0.25,0.84]);
var fin_trasl = T([1,2,3])([7.16,6.5,1.66])(finestra1);
var finestra_nera = COLOR([0,0,0])(fin_trasl);

var finestra2 = CUBOID([1.23*2,0.25,1.23]);
var fin2_trasl = T([1,2,3])([5.12,6.5,2.5+0.39+1.27])(finestra2);
var finestra2_nera = COLOR([0,0,0])(fin2_trasl);


var buildings = STRUCT([pillars0,pillars1,pillars2, pillars3, floors, west, east, south, north,finestra2_nera,finestra_nera]);

DRAW(buildings)