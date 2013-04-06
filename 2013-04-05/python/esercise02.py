#appoggio piano terra
from pyplasm import *
#############################################################
def extrude(obj, h):
	return PROD([obj, Q(h)])

#cerchio
def circle(r):
	def ball(p):
		a,r = p
		return [r*COS(a), r*SIN(a)]
	dom2D = PROD([INTERVALS(2*PI)(50), INTERVALS(1)(1)])
	return S([1,2])([r,r])(MAP(ball)(dom2D))

raggio_pillar0 = 0.125

base_pillar = T([1,2])([raggio_pillar0,raggio_pillar0])(circle(raggio_pillar0))

z_pillar0 = 2.5

#### piano terra ####
#traslazione dell'origine
pillar0 = extrude(base_pillar, z_pillar0)

# 5 pilastri piano terra
pillars01x = STRUCT(NN(5)([pillar0, T([1])([2.75])]))
#pilastro laterale asse y
pillar01y = T([2])([5.32])(pillar0)
pillar01y_trasl = STRUCT(NN(2)([pillar01y, T([1])([11])]))
#unione pilastri piano terra esterni
pillars_es = STRUCT([pillars01x,pillar01y_trasl])

# 4 pilastri interni piano terra
l = 0.25 
l_small = 0.2
pillar_rett = CUBOID([l,l,z_pillar0])

#primo pilastro
pillar_01_int = T([1,2])([1.46,5.32])(pillar_rett)
# 3 pilastri interni/ traslazione
pillars_03_int = STRUCT(NN(3)([pillar_rett, T([1])([2.75])]))
pillars_03_trasl = T([1,2])([2.75,5.32])(pillars_03_int)

#unione di tutti i pilastri interni ed esterni piano terra
pillars0 = STRUCT([pillars_es,pillar_01_int,pillars_03_trasl])

##VIEW(pillars0)

#### primo piano ####
h_piano = 0.3905
pillar_rett_small = CUBOID([l_small,l_small,z_pillar0])
# 5 pilastri primo piano traslati
pillars1_5 = STRUCT(NN(5)([pillar_rett, T([1])([2.75])]))
pillars1_5_trasl = T([3])(2.5+h_piano)(pillars1_5)
#traslazione asse y pilastri interni
pillar1_y = T([2,3])([5.32,2.5+h_piano])(pillar_rett)
pillars1_3_y = STRUCT(NN(3)([pillar1_y, T([1])(2.75)]))
#pilastro cilindrico primo piano
pillars1_cil = T([1,2,3])([8.25,5.32,2.5+h_piano])(pillar0)
#pilastro piu piccolo primo piano
pillar1_small = T([1,2,3])([0.73,5.32,2.5+h_piano])(pillar_rett_small)
#quarto pilastro traslato 
pillar1_4_y = T([1,2,3])([11,5.32,2.5+h_piano])(pillar_rett)

#pilastri completi del primo piano
pillars1 = STRUCT([pillars1_5_trasl,pillar1_y,pillars1_3_y,pillars1_cil, pillar1_small,pillar1_4_y])

#### secondo piano ####
#2 pilastri consecutivi
pillars2_2 = STRUCT(NN(3)([pillar_rett, T([1])([2.75])]))
pillars2_2_trasl = T([3])((2.5+h_piano)*2)(pillars2_2)
#pilastro a lato 
pillar2_1 = T([1,3])([11,(2.5+h_piano)*2])(pillar_rett)
pillars2_3_y = STRUCT(NN(5)([pillar_rett, T([1])([2.75])]))
pillars2_3_y_trasl = T([2,3])([5.32,(2.5+h_piano)*2])(pillars2_3_y)

# totale dei pilastri del secondo piano
pillars2 = STRUCT([pillars2_2_trasl, pillar2_1, pillars2_3_y_trasl]) 

#### terzo piano ####
#pilastri laterali destra
pillars3_2_x = STRUCT(NN(2)([pillar_rett, T([1])([5.5])]))
pillars3_2_xtrasl = T([1,3])([5.5,(2.5+h_piano)*3])(pillars3_2_x)
#pilastri laterali destra posteriori(uso la variabile pillars usata per il primo piano)
pillars3_3_y = T([1,3])([5.5,(2.5+h_piano)*2])(pillars1_3_y)
#pilastri piccoli sinistra
pillars3_2_small = STRUCT(NN(2)([pillar_rett_small, T([1])([2.75])]))
pillars3_2_small_trasl = T([2,3])([5.3825,(2.5+h_piano)*3])(pillars3_2_small)
#pilastro isolato 
pillars3_1 = T([1,2,3])([11,5.32+1.18575,(2.5+h_piano)*3])(pillar_rett)
#allineamento del pilastro dove non e' presente il pavimento
pillar2_rett = CUBOID([l,l,h_piano])
pillars2_2_all = STRUCT(NN(2)([pillar2_rett, T([1])([2.75])]))
pillars_no_pavimento = T([1,2,3])([2.75,5.32,(2.5+h_piano)*2+2.5])(pillar2_rett)
#pilastro fuori angolo
pillar3_ang = T([3])([(2.5+h_piano)*3])(pillar0)
#totale pilastri terzo piano
pillars3 = STRUCT([pillars3_2_xtrasl,pillars3_3_y, pillars3_2_small_trasl, pillars3_1, pillars_no_pavimento,pillar3_ang])

############################ esercise02.py 

appoggio_piano_terra = CUBOID([11.25,6.7557])
#### piano terra ####

#funzione che mi restituisce una semicirconferenza
def semicircle(r):
 def ball(p):
 	 a,r = p
 	 return [r*COS(a), r*SIN(a)]
 dom2D = PROD([INTERVALS(PI)(50), INTERVALS(1)(1)])
 return S([1,2])([r,r])(MAP(ball)(dom2D))
 
 #misure semicerchi 
semcirc_gr_2D = semicircle(1.35)
semcirc_pic_2D = semicircle(0.54)

#  definizione dei due semicerchi ruotati
semicirc_grande = R([1,2])(-PI/2)(extrude(semcirc_gr_2D,0.39))
semicirc_piccola = R([1,2])(PI)(extrude(semcirc_pic_2D,0.39))

sem_gr_trasl = T([1,2])([9.24,5.4])(semicirc_grande)
sem_pic_trasl = T([1,2])([1.67,1.75])(semicirc_piccola)

#quadrato grande 
quad_piano_terra = CUBOID([8.15,5,0.39])
quad_pt_trasl = T([1,2])([1.13,1.75])(quad_piano_terra)
#quadrato lato balcone
quad_2_pt = CUBOID([2.3,1.43,0.39])
quad_2_pt_trasl = T([2])([5.32])(quad_2_pt)

floor0 = STRUCT([sem_gr_trasl, sem_pic_trasl,quad_pt_trasl,quad_2_pt_trasl])



#### primo piano ####
#primo quadrato per pavimento primo piano
floor_1 = CUBOID([2.21,1.5,0.39])
floor_1_trasl = T([2,3])([5.25,2.5])(floor_1)
#secondo quadrato per pavimento
floor_2 = CUBOID([3.46,0.25,0.39])
floor_2_trasl = T([1,2,3])([2.21,6.5,2.5])(floor_2)
#terzo quadrato per pavimento
floor_3 = CUBOID([5.58,1.5,0.39])
floor_3_trasl = T([1,2,3])([5.67,5.25,2.5])(floor_3)
#quarto quadrante per completare il primo piano
floor_4 = CUBOID([11.25,5.25,0.39])
floor_4_trasl = T([3])([2.5])(floor_4)

#unione pilastri corrispondenti scale
pillars1_2_trasl = T([1,2,3])([2.75,5.32,2.5])(pillars2_2_all)

balcone1 = CUBOID([1.44,1.21,0.39])
balcone1_trasl = T([1,2,3])([-1.44,5.32,2.5])(balcone1)

floor1 = STRUCT([floor_1_trasl,floor_2_trasl,floor_3_trasl, floor_4_trasl,pillars1_2_trasl, balcone1_trasl])

#### secondo piano ####
#trapezio 
pentag = MKPOL([[[5.47,0],[11.25,0],[11.25,6.75],[4.51,6.75],[4.51,5.32]],[[1,2,3,4,5]],None])
pentag_3D = extrude(pentag,h_piano)
pentag_traslato = T([3])([2.5+h_piano+2.5])(pentag_3D)
#supporto laterale
rett_1 = CUBOID([5.47,0.25,0.39])
rett_1_trasl = T([3])([2.5+h_piano+2.5])(rett_1)

rett_2 = CUBOID([0.25,5.32,0.39])
rett_2_trasl = T([3])([2.5+h_piano+2.5])(rett_2)

rett_3 = CUBOID([1.05,1.43,0.39])
rett_3_trasl = T([2,3])([5.32,2.5+h_piano+2.5])(rett_3)

#delineo il vuoto per la scala
rett_4 = CUBOID([3.46,0.25,0.39])
rett_4_trasl = T([1,2,3])([1.05,6.5,2.5+h_piano+2.5])(rett_4)
rett_4_parall = CUBOID([3.46,0.125,0.39])
rett_4_trasl_parall = T([1,2,3])([1.05,5.44,2.5+h_piano+2.5])(rett_4)

floor2 = STRUCT([pentag_traslato,rett_1_trasl, rett_2_trasl, rett_3_trasl, rett_4_trasl, rett_4_trasl_parall])

#### terzo piano ####
#definizione dei cubi per costruire il terzo piano
#quadrato piu' grande 
quad_1 = CUBOID([5.75,5.57,0.39])
quad_1_trasl = T([1,3])([5.5,((2.5+h_piano)*2)+2.5])(quad_1)
#quadrato con pilastro isolato piu piccolo destra
quad_2 = CUBOID([3,1.43,0.39])
quad_2_trasl = T([1,2,3])([5.5+2.75,5.32,((2.5+h_piano)*2)+2.5])(quad_2)

#contorno scala
contorno_sc = CUBOID([2.75,0.25,0.39])
cont_sc_trasl = T([1,2,3])([5.5,6.5,((2.5+h_piano)*2)+2.5])(contorno_sc)

#quadrato lato sinistro struttura
quad_3 = CUBOID([5.5,6.75,0.39])
quad_3_trasl = T([3])([((2.5+h_piano)*2)+2.5])(quad_3)


floor3 = STRUCT([quad_1_trasl,quad_2_trasl,quad_3_trasl, cont_sc_trasl])

#### piano 4 / TETTO ####
#quadrato grande 
quad_4_gr = CUBOID([5.75,6.7557,0.39])
quad_4_trasl = T([1,3])([5.5,((2.5+h_piano)*3)+2.5])(quad_4_gr)
#rettangolo fine copertura
rett_4_tetto = CUBOID([5.5,1.43,0.39])
rett_4_tetto_trasl = T([2,3])([5.32,((2.5+h_piano)*3)+2.5])(rett_4_tetto)
#contorno esterno
contorno1 = CUBOID([0.25,6.75,0.39])
cont_1_trasl = T([3])([((2.5+h_piano)*3)+2.5])(contorno1)
contorno2 = CUBOID([5.5,0.25,0.39])
cont_2_trasl = T([3])([((2.5+h_piano)*3)+2.5])(contorno2)

floor4 = STRUCT([quad_4_trasl,rett_4_tetto_trasl, cont_1_trasl,cont_2_trasl])

#totale dei piani compreso l'appoggio della lastra per il piano terra
floors = STRUCT([appoggio_piano_terra,floor0,floor1,floor2,floor3,floor4])


buildings = STRUCT([pillars0,pillars1,pillars2, pillars3, floors])


VIEW(buildings)