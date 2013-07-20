////////////////// TAVOLINO /////////////////
//funzioni supporto

//Funzione che mi permette di inserire i colori in rgb con range [0,255]
function rgb(color){
	return [color[0]/255, color[1]/255, color[2]/255];
}

var celeste = [178,207,223]
var arancio = [246,119,66]
var legno = [249,217,158]
var grigio_scuro = [31,36,37]

var x = 32
var domain = INTERVALS(1)(x)
var dom2D = PROD1x1([INTERVALS(1)(x),INTERVALS(1)(x)])

/////----------CUBOID RIPIANI
var primo_ripiano = COLOR(rgb(legno))(T([2])([1.7])(CUBOID([6,6,0.7])))
var rip_aranc = COLOR(rgb(arancio))(T([2])([2.4])(CUBOID([6,6,0.001])))

var secondo_ripiano = SIMPLICIAL_COMPLEX([[0.2,0.2,2.9],[5.8,0.2,2.9],[0.2,5.8,2.9],[5.8,5.8,2.9],[0.7,0.7,2.4],[5.3,0.7,2.4],[0.7,5.3,2.4],[5.3,5.3,2.4]])
										([[0,1,4],[4,5,1],[1,3,7],[7,5,1],[3,2,7],[2,6,7],[0,2,6],[6,4,0],[4,6,7],[4,7,5]]);
secondo_ripiano = COLOR(rgb(grigio_scuro))(secondo_ripiano)
var rip_cel = SIMPLICIAL_COMPLEX([[0.2,0.2,2.9],[5.8,0.2,2.9],[0.2,5.8,2.9],[5.8,5.8,2.9]])([[0,1,3],[0,2,3]])
rip_cel = COLOR(rgb(celeste))(rip_cel)

///// --------APPOGGI---------- /////////////
var base = COLOR(rgb(legno))(CUBOID([1.3,1.3,1.7]))
var doppia_base_a = T([0,1])([-0.3,-0.3])(STRUCT(REPLICA(2)([base,T([0])([5.3])]))) //avanti
var doppia_base_d = STRUCT(REPLICA(2)([doppia_base_a,T([1])([5.3])])) //avanti

var tavolino = STRUCT([primo_ripiano,rip_aranc,secondo_ripiano,rip_cel,doppia_base_a,doppia_base_d])
DRAW(tavolino)