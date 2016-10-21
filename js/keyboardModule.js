/* 
  This was adapted from a short section of code taken from the internet, functionality to respond to different keys differently, and set some local variables, was added.   
*/
  
function keyboard_module(onUpdate) {
    var kb = {};
    var unicode_mapping = {};
    /* handler for key down event.. override automatic key repeats!
    
	With the exception of BACKSPACE.. !!!
    */
    document.onkeydown = function(e) {
      //console.log( 'key code: '+ (e.keyCode).toString()+ ' charCode: '+(e.charCode).toString()); 
      var unicode = e.charCode ? e.charCode : e.keyCode
      var key = getKey(unicode);
      if(lastKeyPressed!='' && (lastKeyPressed==key) && ( unicode!=8)){
        return;
      }
      console.log('unicode: ',unicode)
      lastKeyPressed =key;
      kb[key] = true;
      if (onUpdate) {
        onUpdate(kb);//alert(key);
      }
      if( unicode ==16){
				shiftKey =true; 
      }
      if( selectedItem!=''){
				//console.log('Selected item!!!!');
				var myName = gridContent[ selectedItem];
				var curText = (puzzlePieceData[myName])['text'];
				if( !curText){ curText = '';}
				var newValue = String.fromCharCode(unicode);
				if( unicode==8){
					/* backSpace (need to add other 'control' characters..) */
					if( curText.length >0){
						curText = curText.slice(0, curText.length-1);
					}
				}else{
					//var gridCoords = toPair( selectedItem);

					if( unicode ==13){
						newValue = '\n';
						/* right now enter doesn't effectively do anything. 
					(would have to modify the wrapText method). 
						*/
					}
					function reMap(u,newVal, shiftVal){
						var ret = newValue; 
						if(unicode==u){
							ret = newVal; 
							if(shiftKey){
								ret = shiftVal; 
							}
						}
						return(ret);
					}
					newValue= reMap(190,  '.',  '>');
					newValue= reMap(188,  ',',  '<'); //might need to  
					newValue= reMap(186,  ';',  ':');
					newValue= reMap(222,  "'",  '"');
					newValue= reMap(191,  '/',  '?');
					newValue= reMap(219,  '[',  '{');
					newValue= reMap(221,  ']',  '}');
					newValue= reMap(220,  "\\", '|'); //might need to disable backslash later. 
					newValue= reMap(221,  ']',  '}');
					newValue= reMap(192,  '`',  '~');
					newValue= reMap( 49,  '1',  '!');
					newValue= reMap( 50,  '2',  '@');    
					newValue= reMap( 51,  '3',  '#');
					newValue= reMap( 52,  '4',  '$');
					newValue= reMap( 53,  '5',  '%');
					newValue= reMap( 54,  '6',  '^');
					newValue= reMap( 55,  '7',  '&');
					newValue= reMap( 56,  '8',  '*');
					newValue= reMap( 57,  '9',  '(');
					newValue= reMap( 48,  '0',  ')');
					newValue= reMap(189,  '-',  '_');
					newValue= reMap(187,  '=',  '+');
					if( shiftKey ){
						newValue = (newValue.toString()).toUpperCase();
					}else{
						newValue = (newValue.toString()).toLowerCase();
					}
					curText+= newValue.toString(); //unicode.toString();
				}
				(puzzlePieceData[myName])['text']=curText;
			}
		}
    /* handler for key up event.. */
    document.onkeyup = function(e) {
      var unicode = e.charCode ? e.charCode : e.keyCode
      var key = getKey(unicode);
      lastKeyPressed = '';
      delete kb[key];
      if (onUpdate) {
        onUpdate(kb);
      }

			if( unicode ==16){
				shiftKey =false; 
			}
    }
    /* function to check the keyboard state.. */
    function getKey(unicode) {
      if (unicode_mapping[unicode]) {
        var key = unicode_mapping[unicode];
      } else {
        var key = unicode_mapping[unicode] = String.fromCharCode(unicode);
      }
      return key;
    }
    return kb;
  }/* function keyboard_module(onUpdate).. keyboard handler..  */

  /* by default, log which keys are currently down.. */
  function testing(kb) {
    console.log('These keys are down: ', kb); //These keys are down:  Object {S: true} //e.g., for S pressed... 
  }
