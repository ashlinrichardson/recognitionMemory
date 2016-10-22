var w = 800;//window.innerWidth-20;
var h = canvasHeight;//800;//window.innerHeight-20; 
drawGrid(w,h);
drawGridContent();

/*
	This comment used to read
	"Before drawing or initializing the grid, try to restore it:"
	
	.. but now, we need to adjust that statement, because we would like to 
		initialize the variables schema, in order to dump data into them.. 
*/
if(progIter>0){
	varInit('gridContent');
	varInit('puzzlePieceData');   //next, use JSON.stringify() and JSON.parse()
	/*
		progIter = varInit('progIter');
		document.getElementById("h1").innerHTML = "Recognition Memory Experiment Framework (iter="+progIter.toString()+")";
		progIter++;
		varSave('progIter');
	*/	
}
//----------------------------------------------

 /* Global variables to track animation loop.. */
  var i=0; //loop iteration counter. 
  var movingAverage = 0.; //moving average for fps calc... 
  var t0 = window.performance.now(); //start time..
  var t2 = 0; var t1=t0; //times used in loop..
  
  
  var mx, my; mx=my=0;

  /* function to execute, animation loop.. */
  function frame(){
    //document.bgColor = "#FFFFFF"; //"#000000"

    var w = 800;//window.innerWidth-20;
    var h = canvasHeight;//800;//window.innerHeight-20; 
    /* set the canvas size dynamically so that the software is device independent and so on... */    
    canvas.width  = w;
    canvas.height = h;


    ctx.beginPath();
    ctx.rect(0, 0, w, h);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.stroke();
        
    drawGrid(w,h);
    drawGridContent();
  
    /*loop profiling section */
    var t2 = window.performance.now()
    if( i==1){
      movingAverage = t1 - t0;
    }else{
      movingAverage = (movingAverage +(t2-t1))/2.;
    }
    t1 = t2; 
    if (i % 1000 == 0) {
      console.log(movingAverage.toString()+(' mS = ')+((1./(movingAverage/1000.)))+(' fpS'));
    }
    /* Total time elapsed since start.. */
    var timeElapsed = Math.ceil(( t1-t0)/1000.);  i += 1;
    if(false){
      /* two methods for exploring the dom don't seem to give the same answers...      */
      var all = document.getElementsByTagName("*");
      for (var i=0, max=all.length; i < max; i++) {
	// Do something with the element here	
	console.log( all[i].toString() + ' i='+ i.toString());
      }

      var currentNode,
      ni = document.createNodeIterator(document.documentElement, NodeFilter.SHOW_ELEMENT);

      while(currentNode = ni.nextNode()) {
				console.log(currentNode.nodeName);
      }
    }
    
			if( localStorage.getItem( 'gridContent')==null ){
				/* break out of the loop if we have cleared localStorage..*/
				console.log('clearInterval.');
				clearInterval(refreshId);
				
			}else{
				varSave('gridContent');
				varSave('puzzlePieceData');
			}
  };
  

