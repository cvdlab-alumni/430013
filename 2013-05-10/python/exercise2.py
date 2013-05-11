#EXERCISE 2

# FERRARI 458 ITALIA
from pyplasm import *
#############################################################
import sys
sys.path.append("/home/roby/larpy")

from lar import *
from scipy import *

def GRID(args):
	model = ([[]],[[0]])
	for (k,steps) in enumerate(args):
		model = larExtrude(model,steps*[1])
	V,cells = model
	verts = AA(list)(scipy.array(V)/AA(float)(args))
	return MKPOL([verts,AA(AA(lambda h:h+1))(cells),None])

x = 20
dominio = INTERVALS(1)(x)
dom2D = GRID([x,x])

#estrudi
def extrude(obj, h):
	return PROD([obj, Q(h)])

#cerchio
def circle(r):
	dom2D = PROD([INTERVALS(2*PI)(50), INTERVALS(1)(1)])
	def map(p):
		return lambda v: [r*COS(v[0]), r*SIN(v[0])]
	mapping = map(r)
	return (MAP(mapping)(dom2D))

# funzione che mi restituisce una semicirconferenza
def semicircle(r):
	domain = INTERVALS(PI)(36)
	def map(r):
 		return lambda v: [r*COS(v[0]), r*SIN(v[0])]
 	mapping = map(r)
 	return (MAP(mapping)(domain))

def cilynder(r,h):
 	return extrude(CIRCLE(r)([20,20]),h);

def punti_controllo_cerchioBEZIER(r):
	c = [[1,0,0],[1,1.61,0],[-1.55,1.61,0],[-1.55,0,0],[-1.55,-1.61,0],[1,-1.61,0],[1,0,0]]
	for i in range(len(c)):
			for k in range(len(c[i])):
				c[i][k] = c[i][k]*r
	return c


#PROFILO SINISTRO immagine: Slide.jpg
cofano_sup = BEZIER(S1)([[4.38,0, 3.03],[3.64,0, 3.2],[0.66,0, 2.36],[0,0, 1.72]])
cofano_inf = BEZIER(S1)([[0,0, 1.72], [0.9,0, 1.7], [2.2,0, 1.98], [2.54,0, 2.03]])

cofano_s_map = MAP(cofano_sup)(dominio)
cofano_i_map = MAP(cofano_inf)(dominio)

#unione con la rientranza
unione_r = POLYLINE([[0,0,1.72],[0.06,0,1.56]])
#rientranza sotto il cofano
r1 = BEZIER(S1)([[0.06,0, 1.56], [0.97,0, 1.56], [0.77,0, 1.45], [0.79,0, 1.14]])
r2 = BEZIER(S1)([[0.79,0, 1.14], [0.75,0, 0.89],[0.8,0, 0.73],[0.07,0, 0.79]])

r1_map = MAP(r1)(dominio)
r2_map = MAP(r2)(dominio)

#unione con polyline
unione_p1 = POLYLINE([[0.09,0, 0.72],[0.07,0, 0.79]])
unione_p2 = POLYLINE([[0.16,0, 0.7],[0.14,0, 0.6]])
unione_p3 = POLYLINE([[2.74,0, 0.39],[2.74,0, 0.48]])
#sotto rientranza
s_r = BEZIER(S1)([[0.09,0, 0.72], [0.9,0, 0.54], [2.34,0, 0.5], [2.74,0, 0.49]])
s_r_2 = BEZIER(S1)([[0.14,0, 0.6], [0.91,0, 0.48], [2.2,0, 0.42], [2.74,0, 0.39]])

s_r_map = MAP(s_r)(dominio)
s_r_2_map = MAP(s_r_2)(dominio)

#semicerchio ruota anteriore
semi_c_a = BEZIER(S1)([ [2.76,0, 0.48],[2.11,0, 3.22],[6.14,0, 3.5], [5.63,0, 0.46]])
s_c_a_map = MAP(semi_c_a)(dominio)

#sotto portiera
s_portiera = BEZIER(S1)([[5.63,0, 0.46], [10.95,0, 0.48], [11.35,0, 0.36], [12.8,0, 0.42]])
s_p_map = MAP(s_portiera)(dominio)

#semicerchio ruota posteriore
semi_c_p = BEZIER(S1)([[12.8,0, 0.42], [11.86,0, 3.19], [16.14,0, 3.84], [15.68,0, 0.56]])
s_c_p_map = MAP(semi_c_p)(dominio)

#retro della macchina
rm1 = BEZIER(S1)([[16.47,0, 0.78], [16.73,0, 1.79], [16.82,0, 1.74], [16.43,0, 1.84]])
rm1_map = MAP(rm1)(dominio)
rm1_polyline = POLYLINE([[15.68,0, 0.56],[16.47,0, 0.78]])

rm2 = BEZIER(S1)([[15.72,0, 0.4], [16.03,0, 0.39], [16.51,0, 0.4],[16.43,0, 0.77]])
rm2_map = MAP(rm2)(dominio)
rm2_polyline = POLYLINE([[15.72,0, 0.4],[15.74,0, 0.58]])

rm3 = BEZIER(S1)([[15.72,0, 0.39], [16.29,0, 0.42], [16.62,0, 0.41], [16.57,0, 0.81]])
rm3_map = MAP(rm3)(dominio)

rm4 = BEZIER(S1)([[16.77,0, 0.827],[16.83,0, 1.56], [16.69,0, 1.58]])
rm4_map = MAP(rm4)(dominio)
rm4_polyline = POLYLINE([[16.573,0, 0.72],[16.99,0, 0.94]])

rm5 = BEZIER(S1)([[16.99,0, 0.94], [16.87,0, 1.01], [17.09,0, 1.37], [17.06,0, 1.6]])
rm5_map = MAP(rm5)(dominio)

rm6 = BEZIER(S1)([[16.82,0, 2.39], [17.07,0, 2.39], [16.85,0, 1.84], [17.06,0, 1.6]])
rm6_map = MAP(rm6)(dominio)

#sporgenza in basso
# s_b = BEZIER(S1)([[16.47,0, 0.89], [16.78,0, 0.88], [16.58,0, 1.26], [16.89,0, 1.19]])
# s_b_map = MAP(s_b)(dominio)

# s_b2 = BEZIER(S1)([[16.46,0, 0.8], [16.76,0, 0.88], [16.64,0, 1.07], [16.77,0, 1.06]])
# s_b2_map = MAP(s_b2)(dominio)
# s_b3 = BEZIER(S1)([[16.92,0, 1.19], [17.01,0, 1.13], [16.77,0, 1.06]])
# s_b3_map = MAP(s_b3)(dominio)

#marmitta
marm_polyline = POLYLINE([[17.04,0, 1.39],[17.11,0, 1.39],[17.11,0, 1.08],[16.96,0, 1.09]])

#curva freni
cf1 = BEZIER(S1)([[17.04,0, 2.43], [16.77,0, 2.62], [16.86,0, 3], [16.66,0, 3.31]])
cf1_map = MAP(cf1)(dominio)
cf1_polyline = POLYLINE([[16.945,0, 2.27],[17.06,0, 2.31],[17.04,0, 2.43]])

cf2 = BEZIER(S1)([[16.03,0, 3.01], [16.23,0, 2.79], [16.41,0, 2.44], [16.92,0, 2.44]])
cf2_map = MAP(cf2)(dominio)
#linea dal freno al lunotto
cf2_polyline = POLYLINE([[15.43,0, 3.3],[16.03,0, 3.01]])

cf3 = BEZIER(S1)([[16.17,0, 3.3],[15.85,0, 3.33], [15.5,0, 3.27]])
cf3_map = MAP(cf3)(dominio)
#freno
cf3_polyline = POLYLINE([[16.27,0, 2.73],[16.26,0, 3.27],[16.17,0, 3.3],[16.16,0, 2.85]])

cf4 = BEZIER(S1)([[16.66,0, 3.31], [16.37,0, 3.17], [16.263,0, 3.21]])
cf4_map = MAP(cf4)(dominio)

#ritorno verso la portiera - lunotto
p_l = BEZIER(S1)([[12.05,0, 3.68], [12.84,0, 3.75], [14.33,0, 3.38], [15.43,0, 3.3]])
p_l_map = MAP(p_l)(dominio)

p_l2 = BEZIER(S1)([[12.05,0, 3.68], [11.95,0, 3.73], [10.77,0, 3.38], [10.32,0, 3.25]])
p_l2_map = MAP(p_l2)(dominio)

#tetto
p_l3 = BEZIER(S1)([[12.89,0, 3.65], [11.3,0, 4.06], [11.02,0, 4.08], [11.11,0, 4.29]])
p_l3_map = MAP(p_l3)(dominio)
p_l4 = BEZIER(S1)([[7.52,0, 4.36], [8.82,0, 4.67], [9.9,0, 4.5], [11.11,0, 4.29]])
p_l4_map = MAP(p_l4)(dominio)
p_l5_polyline = POLYLINE([[7.52,0, 4.36],[7.71,0, 4.16]])
p_l6 = BEZIER(S1)([[7.71,0, 4.16], [7.19,0, 3.91], [6.64,0, 3.62], [5.67,0, 2.93]])
p_l6_map = MAP(p_l6)(dominio)

#parte alta finestrino
p_l7 = BEZIER(S1)([[11.92,0, 3.67], [9.18,0, 4.56], [7.82,0, 4.56], [5.86,0, 2.9]])
p_l7_map = MAP(p_l7)(dominio)

p_l8 = BEZIER(S1)([[6,0, 2.9], [7.95,0, 4.55], [10.33,0, 4.39], [11.36,0, 3.55]])
p_l8_map = MAP(p_l8)(dominio)
#finestrino 
f_polyline = POLYLINE([[10.3,0, 3.255],[10.4,0, 4.02]])
f_spess_polyline = POLYLINE([[10.2,0, 3.235],[10.36,0, 4.03]])

#parte alta portiera-finestrino(senza considerare lo specchietto)
p_f = BEZIER(S1)([[6.03,0, 2.9], [10.25,0, 2.85], [11.33,0, 3.67], [12.05,0, 3.68]])
p_f_map = MAP(p_f)(dominio)
p_f2 = BEZIER(S1)([[4.38,0, 3.03], [5.04,0, 3.04], [5.59,0, 2.9], [6.03,0, 2.9]])
p_f2_map = MAP(p_f2)(dominio)

#portiera
port = BEZIER(S1)([[5.93,0, 0.7], [5.74,0, 2.32], [5.78,0, 2.78], [6.01,0, 2.91]])
port_polyline = POLYLINE([[5.66,0, 0.69],[5.93,0, 0.7]])
port_map = MAP(port)(dominio)
port2a = BEZIER(S1)([[5.93,0, 0.7], [9.68,0, 0.86], [10.08,0, 0.58], [10.3,0, 1.25]])
port2a_map = MAP(port2a)(dominio)
port2b = BEZIER(S1)([[10.29,0, 3.25], [11.01,0, 2.68], [10.44,0, 1.71], [10.3,0, 1.25]])
port2b_map = MAP(port2b)(dominio)

#sotto-portiera
s_port = BEZIER(S1)([[5.76,0, 0.52], [12.13,0, 0.9],[10.5,0, 0.46],[12.78,0, 0.48]])
s_port_map = MAP(s_port)(dominio)
s_port_polyline = POLYLINE([[5.76,0, 0.52],[5.76,0, 0.46]])

#unione delle varie parti
parte_davanti_profilo_sinistro = STRUCT([cofano_s_map,cofano_i_map,s_r_2_map,s_r_map,r1_map,r2_map,unione_r,unione_p1,unione_p2,unione_p3])
parte_laterale_portiera = STRUCT([s_c_a_map,s_p_map,s_c_p_map,p_l_map,p_l3_map,p_l4_map,p_l5_polyline,p_l6_map,p_l7_map,p_l8_map,f_polyline,f_spess_polyline,p_f_map,p_f2_map,port_map,port2a_map,port2b_map,s_port_map,port_polyline,s_port_polyline])
parte_posteriore = STRUCT([rm1_map,rm1_polyline,rm2_map,rm2_polyline,rm3_map,rm4_map,rm4_polyline,rm5_map,rm6_map,cf1_map,cf1_polyline,cf2_map,cf2_polyline,cf3_map,cf3_polyline,cf4_map,marm_polyline])

profilo_sinistro = STRUCT([parte_laterale_portiera,parte_davanti_profilo_sinistro,parte_posteriore])

# VIEW(profilo_sinistro)

#PROFILO FRONTALE immagine: Top.jpg

#parte superiore
p_s1 = BEZIER(S1)([[0,5.31, 4.49], [0,6.57, 4.46], [0,6.61, 4.19], [0,7.28, 3.03]])
p_s1_map = MAP(p_s1)(dominio)

p_s2_polyline = POLYLINE([[0,5.27, 4.45],[0,5.31, 4.49]])

p_s3 = BEZIER(S1)([[0,5.27, 4.45], [0,4.58, 4.51], [0,4.13, 4.53], [0,3.25, 4.45]])
p_s3_map = MAP(p_s3)(dominio)

p_s4_polyline = POLYLINE([[0,3.25, 4.45],[0,3.22, 4.49]])

p_s5 = BEZIER(S1)([[0,1.26, 3.03], [0,2.01, 4.44], [0,2.23, 4.43], [0,3.22, 4.49]])
p_s5_map = MAP(p_s5)(dominio)

#vetro
v_1 = BEZIER(S1)([[0,1.38, 3.01], [0,2.12, 4.35], [0,1.75, 4.26], [0,4.22, 4.34]])
v_2 = BEZIER(S1)([[0,7.15, 3.01], [0,6.47, 4.42], [0,6.57, 4.25], [0,4.22, 4.34]])

v_1_map = MAP(v_1)(dominio)
v_2_map = MAP(v_2)(dominio)

#sopra il cofano
s_c1 = BEZIER(S1)([[0,6.95, 2.96], [0,4.61, 3.06], [0,3.98, 3.05], [0,1.685, 2.95]])
s_c1_map = MAP(s_c1)(dominio)

#fanali avanti
f_a1 = BEZIER(S1)([[0,1.61, 2.52], [0,1.26, 2.67], [0,1.56, 3.46], [0,0.63, 2.76]])
#specchio
f_a1_s = BEZIER(S1)([[0,6.91, 2.52], [0,7.29, 2.67], [0,6.97, 3.46], [0,7.9, 2.76]])

f_a1_map = MAP(f_a1)(dominio)
f_a1s_map = MAP(f_a1_s)(dominio)

f_a2 = BEZIER(S1)([[0,1.28, 3.02],[0,2.02, 2.95], [0,2.33, 2.63]])
#specchio
f_a2_s = BEZIER(S1)([[0,6.28, 2.63], [0,6.73, 2.95], [0,7.25, 3.02]])

f_a2_map = MAP(f_a2)(dominio)
f_a2s_map = MAP(f_a2_s)(dominio)

#unione cofano
unione_cof_polyline = POLYLINE([[0,1.61, 2.52],[0,2.81, 2.04],[0,5.71, 2.04],[0,6.91, 2.52]])

#faro avanti
fa_polyline = POLYLINE([[0,0.63, 2.73],[0,1.08, 2.84],[0,1.39, 2.84]])
fa2_polyline = POLYLINE([[0,7.14, 2.84],[0,7.45, 2.84],[0,7.9, 2.73]])

#faro-cofano
fac_polyline = POLYLINE([[0,2.04, 2.15],[0,2.81, 2.04]])
#specchio
fac_s_polyline = POLYLINE([[0,6.47, 2.15],[0,5.71, 2.04]])

#faro1
curva_faro1 = BEZIER(S1)([[0,1.95, 1.94], [0,1.34, 1.95], [0,1.48, 2.11], [0,1.08, 2.84]])
curva_faro1_map = MAP(curva_faro1)(dominio)
curva_faro2 = BEZIER(S1)([[0,1.95, 1.94],[0,2.1, 2.15], [0,2, 2.355]])
curva_faro2_map = MAP(curva_faro2)(dominio)

faro1 = STRUCT([curva_faro1_map,curva_faro2_map])

#faro2
faro2 = T([2,3])([8.5,-0])(R([2,1])(PI)(faro1))

#ruota-laterale
r_l = BEZIER(S1)([[0,0.63, 2.76], [0,0.63, 2.08], [0,0.8, 1.08], [0,0.71, 0.76]])
r_l_map = MAP(r_l)(dominio)
r_l_polyline = POLYLINE([[0,0.71, 0.76],[0,0.87, 0.49],[0,1.28, 0.58]])

ruota_laterale1 = STRUCT([r_l_map,r_l_polyline])
#specchio 
ruota_laterale2 = T([2,3])([8.53,-0])(R([2,1])(PI)(ruota_laterale1))

unione_tra_ruote = BEZIER(S1)([[0,7.25, 0.58], [0,6.17, 0.69], [0,3.55, 0.79], [0,1.28, 0.58]])
unione_tra_ruote_map = MAP(unione_tra_ruote)(dominio)

#spessore sottostante
s_s = BEZIER(S1)([[0,7.17, 0.5], [0,5.8, 0.61], [0,3.5, 0.71], [0,1.37, 0.5]])
s_s_map = MAP(s_s)(dominio)

s_s_polyline = POLYLINE([[0,0.91, 0.49],[0,0.91, 0.4],[0,1.37, 0.5]])

s_s2_polyline = POLYLINE([[0,7.17, 0.5],[0,7.63,0.4],[0,7.63,0.49]])

#parte centrale
p_c1 = BEZIER(S1)([[0,4.25, 1.57], [0,2.56, 1.56], [0,1.39, 1.67], [0,1.6, 1.34]])
p_c1_map = MAP(p_c1)(dominio) 
p_c1b_polyline = POLYLINE([[0,1.6, 1.34],[0,1.74, 1.06]])

p_c2 = BEZIER(S1)([[0,4.25, 1.43], [0,2.56, 1.39], [0,1.55, 1.5], [0,1.66, 1.27]])
p_c2_map = MAP(p_c2)(dominio)
#parte sotto
p_c3 = BEZIER(S1)([[0,3.5, 0.81], [0,1.66, 0.73], [0,1.84, 0.88], [0,1.66, 1.27]])
p_c4 = BEZIER(S1)([[0,3.5, 0.81], [0,3.49, 0.83], [0,3.25, 1.33], [0,3.08, 1.27]])
p_c3_map = MAP(p_c3)(dominio)
p_c4_map = MAP(p_c4)(dominio)
p_c5_polyline = POLYLINE([[0,3.08, 1.27],[0,1.66, 1.27]])

centro1 = STRUCT([p_c1_map,p_c2_map,p_c3_map,p_c4_map,p_c5_polyline,p_c1b_polyline])
centro2 = T([2,3])([8.5,-0])(R([2,1])(PI)(centro1))

unione_centro1 = POLYLINE([[0,3.5, 0.81], [0,5.02, 0.81]])
unione_centro2 = MAP(BEZIER(S1)([[0,5.178, 1.1], [0,5.07, 1.27], [0,3.79, 1.39], [0,3.33, 1.1]]))(dominio)

centro = STRUCT([centro1,centro2,unione_centro1,unione_centro2])

#specchietto
sp1 = BEZIER(S1)([[0,0.04, 3.17], [0,0.74, 3.5], [0,0.75, 3.13], [0,0.74, 2.99]])
sp2 = BEZIER(S1)([[0,0.04, 3.17], [0,-0.03, 2.86], [0,0.18, 2.85], [0,0.47, 2.8]])
sp1_map = MAP(sp1)(dominio)
sp2_map = MAP(sp2)(dominio)

sp3_polyline = POLYLINE([[0,0.633, 2.72],[0,0.47, 2.8]])
sp4_polyline = POLYLINE([[0,0.74, 2.99],[0,0.79, 2.875]])

specchietto1 = STRUCT([sp1_map,sp2_map,sp3_polyline,sp4_polyline])
specchietto2 = T([2,3])([8.53,-0])(R([2,1])(PI)(specchietto1))


parte_superiore = STRUCT([p_s1_map,p_s2_polyline,p_s3_map,p_s4_polyline,p_s5_map,v_2_map,v_1_map])
parte_centrale = STRUCT([centro,s_c1_map,f_a1_map,f_a2_map,f_a1s_map,f_a2s_map,unione_cof_polyline,fa_polyline,fa2_polyline,faro1,faro2,fac_polyline,fac_s_polyline])
parti_laterali = STRUCT([ruota_laterale1,ruota_laterale2,unione_tra_ruote_map,s_s_map,s_s_polyline,s_s2_polyline,specchietto1,specchietto2])

profilo_frontale = STRUCT([parte_superiore,parte_centrale,parti_laterali])

# VIEW(profilo_frontale)

# VISUALE DALL'ALTO
#prima meta'
#lato destro cofano
l_d_c1 = BEZIER(S1)([[0.97, 7.23,0], [2.66, 8.06,0], [3.47, 7.97,0], [5.82, 7.83,0]])
l_d_c1_map = MAP(l_d_c1)(dominio)
l_d_c2 = BEZIER(S1)([[0.97, 7.23,0], [0.25, 6.53,0], [0.04, 4.98,0], [0.01, 4.25,0]])
l_d_c2_map = MAP(l_d_c2)(dominio)
#portiera
l_d_c3 = BEZIER(S1)([[5.96, 7.41,0], [5.76, 7.58,0], [5.82, 7.83,0]])
l_d_c3_map = MAP(l_d_c3)(dominio)
l_d_c4 = BEZIER(S1)([[10.61, 7.85,0], [10.73, 7.83,0], [10.77, 7.75,0], [10.26, 7.06,0]])
l_d_c4_map = MAP(l_d_c4)(dominio)

#finestrino
f1 = BEZIER(S1)([[11.85, 6.72,0], [7.97, 5.94,0], [7.46, 6.82,0], [5.9, 7.3,0]])
f1_map = MAP(f1)(dominio)

ld3_polyline = POLYLINE([[5.97, 7.3,0],[5.96, 7.41,0]])
#tutto lato destro
t_l_d1 = BEZIER(S1)([[15.16, 7.88,0], [8.94, 7.83,0], [7.09, 7.83,0], [5.82, 7.83,0]])
t_l_d1_map = MAP(t_l_d1)(dominio)

#cofano parte avanti
cpa1 = BEZIER(S1)([[1.9, 6.92,0], [2.81, 7.29,0], [4.55, 7.29,0], [5.1, 7.29,0]])
cpa1_map = MAP(cpa1)(dominio)
cpa2_polyline = POLYLINE([[5.1, 7.29,0],[5.25, 7.14,0]])

cpa3_polyline = POLYLINE([[0.72, 5.71,0], [1.9, 6.92,0]])
cpa4 = BEZIER(S1)([[0.4, 4.25,0], [0.39, 4.62,0], [0.63, 5.67,0], [0.72, 5.71,0]])
cpa4_map = MAP(cpa4)(dominio)

cpa5 = BEZIER(S1)([[2.92, 7.17,0], [2.65, 7.1,0],[3.8, 7.92,0]])
cpa5_map = MAP(cpa5)(dominio)
#faro 
f_1 = BEZIER(S1)([[0.85, 6.58,0], [0.91, 7.21,0], [2.01, 7.28,0], [3.13, 7.41,0]])
f_1_map = MAP(f_1)(dominio)
f1_polyline = POLYLINE([[0.85, 6.58,0],[1.5, 6.51,0]])

#vetro davanti
vd1 = BEZIER(S1)([[7.72, 6.22,0], [8.07, 6.58,0], [5.63, 7.26,0]])
vd2 = BEZIER(S1)([[7.72, 6.22,0], [7.46, 5.09,0], [7.5, 4.24,0]])
vd1_map = MAP(vd1)(dominio)
vd2_map = MAP(vd2)(dominio)

#vetro-cofano
vc1 = BEZIER(S1)([[3.81, 4.23,0], [3.94, 5.43,0], [4.1, 6.54,0], [5.25, 7.14,0]])
vc1_map = MAP(vc1)(dominio)
#portiera
p1 = BEZIER(S1)([[11.25, 6.6,0], [10.32, 7.56,0], [5.38, 7.43,0], [5.25, 7.14,0]])
p1_map = MAP(p1)(dominio)

#da portiera al motore
pm1 = BEZIER(S1)([[11.85, 6.73,0], [12.95, 6.39,0], [15.05, 5.61,0], [15.66, 5.53,0]])
pm2 = BEZIER(S1)([[16.12, 4.22,0], [16.1, 4.79,0], [16.25, 5.54,0], [15.66, 5.53,0]])
pm1_map = MAP(pm1)(dominio)
pm2_map = MAP(pm2)(dominio)
#motore
pm3 = BEZIER(S1)([[15.23, 4.21,0],[15.21, 5.32,0], [14.99, 5.68,0]])
pm3_map = MAP(pm3)(dominio)
pm4 = BEZIER(S1)([[11.13, 5.8,0], [11.04, 6.44,0], [12.27, 6.31,0], [12.94, 6.37,0]])
pm4_map = MAP(pm4)(dominio)

pm4_polyline = POLYLINE([[14.04, 6,0],[11.13, 5.8,0],[11.13, 3, 0]])

#retro
r1 = BEZIER(S1)([[15.16, 7.88,0], [16.62, 7.84,0], [16.8, 7.1,0]])
r2 = BEZIER(S1)([[17.05, 4.16,0], [16.98, 6.49,0], [16.8, 7.1,0]])
r1_map = MAP(r1)(dominio)
r2_map = MAP(r2)(dominio)

r3 = BEZIER(S1)([[15.23, 7.86,0], [16.43, 7.68,0], [16.48, 7.05,0], [16.57, 6.96,0]])
r4 = BEZIER(S1)([[16.85, 4.25,0], [16.77, 6.69,0], [16.66, 6.65,0], [16.57, 6.96,0]])
r3_map = MAP(r3)(dominio)
r4_map = MAP(r4)(dominio)
#faro dietro
f_d1 = BEZIER(S1)([[16.12, 7.53,0], [15.11, 7.49,0], [15.31, 6.94,0], [16.32, 6.82,0]])
f_d2 = BEZIER(S1)([[16.74, 4.17,0], [16.74, 5.23,0], [16.48, 6.44,0], [16.32, 6.82,0]])

ff = BEZIER(S1)([[16.14, 6.91,0], [15.72, 6.9,0], [14.94, 7.38,0], [16.14, 7.49,0]])
ff_polyline = POLYLINE([[16.14, 7.49,0],[16.14, 6.91,0],[16.18, 6.91,0],[16.18, 7.49,0]])

f_d1_map = MAP(f_d1)(dominio)
f_d2_map = MAP(f_d2)(dominio)
ff_map = MAP(ff)(dominio)

f_d3 = BEZIER(S1)([[15.56, 5.59,0], [15.52, 6.52,0], [15.21, 6.91,0], [15.49, 7.14,0]])
f_d3_map = MAP(f_d3)(dominio)

parte1 = STRUCT([ff_map,ff_polyline,f_d1_map,f_d2_map,f_d3_map,pm1_map,pm2_map,pm3_map,pm4_map,pm4_polyline,vd1_map,vd2_map,f1_map,l_d_c1_map,l_d_c2_map,l_d_c3_map,ld3_polyline,l_d_c4_map,t_l_d1_map,cpa1_map,cpa2_polyline,cpa3_polyline,cpa4_map,cpa5_map,f_1_map,f1_polyline,vc1_map,p1_map,r1_map,r2_map,r3_map,r4_map])
parte2 = T([2])([8.5])(R([2,3])(PI)(parte1))

profilo_alto = STRUCT([parte1,parte2])

draw = STRUCT([profilo_alto,profilo_frontale,profilo_sinistro])

# #se si vuole riportare al centro degli assi la macchina
draw_t = T([1,2])([-9.18, -4.27,0])(draw)

VIEW(draw)

VIEW(draw_t)

