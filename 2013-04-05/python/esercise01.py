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

#insieme di pilastri 
buildings = STRUCT([pillars0,pillars1,pillars2, pillars3])
VIEW(buildings)






