/* function to convert window mouse coordinates to canvas mouse coordinates. */

  function windowToCanvas(canvas, x,y){
    var bbox = canvas.getBoundingClientRect();
    return { x:(x-bbox.left)*(canvas.width/bbox.width),
       y:(y-bbox.top) *(canvas.height/bbox.height)};
    /*  
      //Example use of windowToCanvas:  
        canvas.onmousemove=function(e){
          var loc = windowToCanvas(canvas, e.clientX, e.clientY);
        };
      //End example..
    */
  }


/* Mouse button down event */
  canvas.addEventListener("mousedown", function(e){  /* e.clientX, e.clientY */
    /* mouse down event listener code... */ 
    var loc = windowToCanvas(canvas, e.clientX, e.clientY);
    mx = loc.x;
    my = loc.y;
    var cw = canvas.width;
    var ch = canvas.height;
    var cI = Math.floor( mx / 100)+'-'+ Math.floor( my/100); 
    /* Did we click on a 'valid' grid square? */
    if( cI in gridContent){
      pickThis = cI; 
      /* was this item already selected? */
      if( selectedItem ==cI){
				/* If the picked item was already selected, unselect it. */
				selectedItem = '';
			}else{
				/* If the picked item was not already selected, select it! */
				selectedItem = cI;
				try{
					/* log the colour of the selected item (if something is selected)... */
					var selectedItemColor = (puzzlePieceData[gridContent[cI]])['color'];
					if(selectedItemColor!=null){
						console.log('selectedItem.color:',selectedItemColor,' selectedItem ',selectedItem);
						try{ 
							console.log( 'master: ',puzzlePieceData[gridContent[selectedItem]]['master'] );
						}catch(e){
						}
					}
				}catch(e){
				}
				/* Track the starting mouse position for the selection 
					.. the idea was to use this as an "offset", later. 
				*/
				selectedX = [mx, my]; 
      }
    }
    
  });

  /* Mouse up event.. */
  canvas.addEventListener("mouseup", function(e){  /* e.clientX, e.clientY */
    var loc = windowToCanvas(canvas, e.clientX, e.clientY);
    mx = loc.x;
    my = loc.y;
    if( pickThis!=''){
      var cI = Math.floor( mx / 100)+'-'+ Math.floor( my/100); 
      if( cI in gridContent){
	if( gridContent[cI]<0 /*==''*/ /* only move to empty space*/ 
	    && (cI!=pickThis)  /* if dest=src then don't move!!!!..  */ ){
	  plopSound.play();
	  console.log('Overwriting '+cI+' with '+pickThis+ ' puzzlePieceName=' 
	    +(gridContent[pickThis]).toString());
	  gridContent[cI]=gridContent[pickThis];
	  gridContent[pickThis]=-1;//'';
	}
      }
    }
    /* keep the status quo. */
    pickThis ='';
  });
  
  canvas.onmousemove=function(e){
    var loc = windowToCanvas(canvas, e.clientX, e.clientY);
    mx = loc.x;
    my = loc.y;
    return;
    console.log(
	'x '+(e.clientX).toString()+' y '+(e.clientY).toString()
      + ' cx '+(loc.x).toString()
      + ' cy '+(loc.y).toString()
      + ' i  '+Math.floor(loc.x / 100).toString()
      + ' j  '+Math.floor(loc.y / 100).toString()
      );
  };


