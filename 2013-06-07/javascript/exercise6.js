//exercise 6
function export_value_lar(lar_model){

	var result = "";
	var v = lar_model[0];
	var fv= lar_model[1];

//elenco vertici
	for (var k=0; k<v.length; k++){
		result += "v";
		for(var i = 0; i<v[k].length; i++){
			result += " "+ v[k][i];
		}
		result += "\n";
	}
//elenco Face Definitions
	for(var j=0; j<fv.length; j++){
		result += "fv";
		for(var s=0; s<fv[j].length; s++){
			result += " "+ fv[j][s];
		}
		result += "\n";
	}
	
	return result;
}

////------ TEST -------/////

FV = [[5,6,7,8],
      [0,5,8],
      [0,4,5],
      [1,2,4,5],
      [2,3,5,6],
      [0,8,7], 
      [3,6,7], 
      [1,2,3], 
      [0,1,4]];
      
V = [[0,6],
     [0,0],
     [3,0],
     [6,0,4],
     [0,3,4],
     [3,3],
     [6,3],
     [6,6],
     [3,6]];

var lar_model = [V,FV]
var object = export_value_lar(lar_model);
console.log(object)
