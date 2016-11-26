var refreshId=false; 
var gridContent;
var puzzlePieceData;

/* this guy gets reset when we clear the persistence structure. */
var progIter=0;
  
function setBackupText(text){
    var textBox = document.getElementById("backupBox");
    textBox.value = text;
}

function backupLocalStorage() {
	var s = "";
  for (var i = 0; i < localStorage.length; i++) {
			var myKey = localStorage.key(i);
			if( i>0){
				s+='þ';
			}
			s+= myKey +'þ'+ localStorage.getItem( myKey);;
  }
  setBackupText(s);
}


function restoreLocalStorage(){
	var textBox = document.getElementById("restoreBox");
	var myData = textBox.value;
	var bigTuple = myData.split('þ');
	if( bigTuple.length %2 ==0){
		localStorage.clear();
		for( var i=0; i< bigTuple.length/2; i++){
			localStorage.setItem( bigTuple[i], bigTuple[i+1]);
		}
	}else{
		textBox.value = "Error: data was not an even number of þ-separated values.";
	}
	//	varInit('progIter');
	varInit('gridContent');
	varInit('puzzlePieceData');
	
}

function setDefaultData(){
	var textBox = document.getElementById("restoreBox");
	if( textBox.value==''){
		textBox.value= defaultData();


	}
}

