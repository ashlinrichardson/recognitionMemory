/* 

  Set up the main variables for the project. 

There are some persistent variables that need to be initialized ...

*/

	var canvasHeight = 801;
  var plopSound = new Audio('site/plop.mp3'); 
  
  /* check if localStorage is supported.. should be, for most relatively current browsers. */
  function hasLocalStorage(){ 
    var test = 'test';
    try{
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    }catch(e){
      return(false);
    }
  }
 
  /* keep hooks to our html5 canvas, and canvas.context.. */
  var canvas, ctx; 

  /* check if html5-canvas is supported.. */
  function canvasSupported(){
    canvas = document.getElementsByTagName("canvas")[0];
    ctx = canvas.getContext('2d');
    return( !!(ctx));
  }
   
  /* check that the prerequisites are satisfied, and set up the canvas.. */ 
  function init(){
    setDefaultData();
      
    console.log('checking prerequisites..');
    if(!hasLocalStorage()){
      alert('Error:\nHTML5:localStorage unavailable.\n\nUpdate your browser.');
      return;
    }
    if(!canvasSupported()){
      alert('Error: HTML5 canvas not supported. Please update your browser.');
      return;
    }else{
      ctx.width = 800; 
			ctx.height= canvasHeight; 
    }

    console.log('prerequisites seem to be ok..');
  };

  /* don't pass go without the canvas and localStorage.. */
  init();
  
  
 /* State variables */  //  
  gridContent = {}; 
  
 if(false){
		/* sometimes for debugging, need to clear saved state.. */
		localStorage.removeItem('gridContent');
		localStorage.removeItem('puzzlePieceData');
 } 
  /* 
  
			gridContent	<--- this variable indicates if the grid square:  
			at location:  
					'(' + i.toString() +',' + j.toString() + ')'   (***) 
      is occupied. 
      
      The variable holds a name (a number >=0) of the occupying 
      puzzle piece. If the grid location is empty, the value is 
      set to -1;
      
      gridContent maps from (***) to the index in puzzlePieceData 
			(or -1 if the square (***) is empty..)
  */
   
  puzzlePieceData = new Array( 5 * Math.ceil( ctx.width / 100) * Math.ceil( ctx.height/100));
  /* There's an arbitrary constant in the above array, 
			because when we support deleting/creating, we need to add space 
			(don't have time to implement the appropriate garbage collection 
			on this iteration... 
			
			Ideally re-use tiles without overly creating/deleting... 
  
  */
  
  for( var i=0; i<puzzlePieceData.length; i++){
    puzzlePieceData[i] = { 'text':'' } ; //let's add a 'text' property later.. and other properties. 
  }
  var nextPuzzlePieceName = 0;

  var pickThis = ''; //this gets set to a certain 'cI' if a certain grid element gets picked. 
  var selectedItem = ''; /* Something that gets picked will get selected. You can unselect it by rePicking. */
  var selectedX  = '';
  /* set up keyboard handlers, and keyboard state variables.. */
  var lastKeyPressed = ''; //track the last key pressed (onkeydown).. 

   /* transfer inMemory variable to localStorage.. 
   
   NB variables need to be defined at the top, for this to work..
   
   */
	function varSave(variableName){
		var myValue = eval('JSON.stringify('+variableName+');');
		localStorage.setItem(variableName, myValue);
		//eval('localStorage.setItem('+variableName+',JSON.stringify('+variableName+'));');
		//localStorage.setItem(variableName, eval('JSON.stringify('+variableName+');'));
	}
	
	/* 
			transfer localStorage version to inMemory variable (if available)..
			otherwise, initialize a new localStorage version.. 
			N.B., not really a version: more like a copy!
	
	*/
  function varInit(variableName){  /* init variable, but restore if not already defined... */
		var item = localStorage.getItem(variableName);
		if(item==null){
			/* no localStorage copy to restore-- so, write one:  */
			varSave(variableName);
			eval('console.log('+variableName+');');
			return(eval(variableName));
		}else{
		 /* restore localStorage copy. */
		  eval(variableName+' = JSON.parse(item);');
		  eval('console.log('+variableName+');');
		  return(JSON.parse(item));
		}
	}

	if(true){
		progIter = varInit('progIter');
		if(false)document.getElementById("h1").innerHTML = "Recognition Memory Experiment Framework (iter="+progIter.toString()+")";
		progIter++;
		varSave('progIter');
	}	

