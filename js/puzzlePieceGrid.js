function makeBeziers(s){
  var ret = ([
    {cx1:0,  cy1:15,  cx2:35,cy2:15, ex:37, ey:5},   // left shoulder
    {cx1:37, cy1:5,  cx2:40,cy2:0,  ex:38, ey:-5},  // left neck
    {cx1:38, cy1:-5, cx2:20,cy2:-20,ex:50, ey:-20}, // left head
    {cx1:50, cy1:-20,cx2:80,cy2:-20,ex:62, ey:-5},  // right head
    {cx1:62, cy1:-5, cx2:60,cy2:0,  ex:63, ey:5},   // right neck
    {cx1:63, cy1:5,  cx2:65,cy2:15, ex:100,ey:15},   // right shoulder
  ]);
  for( var i = 0; i<ret.length; i++){
     ret[i].cx1*=s;
     ret[i].cx2*=s;
     ret[i].cy1*=s;
     ret[i].cy2*=s;
     ret[i].ex*=s;
     ret[i].ey*=s;
  }
  return ret;
}


function drawUp(transX,transY, reverseDirection, pw){
  //ctx.translate(transX,transY);
  var bSet = makeBeziers(1.*(pw/100.));
  var tx  = transX; 
  var ty  = transY;
  if( reverseDirection==true){
    for(var i=bSet.length-1; i>=0; i--){
      var b=bSet[i];
      ctx.bezierCurveTo(b.ex+tx,b.ey+ty,b.cx2+tx,b.cy2+ty,b.cx1+tx,b.cy1+ty);
    }
  }else{
    for(var i=0;i<bSet.length;i++){
      var b=bSet[i];
      ctx.bezierCurveTo(b.cx1+tx,b.cy1+ty,b.cx2+tx,b.cy2+ty,b.ex+tx,b.ey+ty);
    }
  }
}
function drawLine(x,y,u,v){ //ctx.beginPath(); 
  ctx.moveTo(x,y);  
  ctx.lineTo(u,v); //ctx.closePath(); //ctx.stroke();
}

/* Draw a puzzle piece that only can have vertical connections. */
function drawPiece(aTransX,aTransY, /* <-translation offset.. */ pw,ph /* <-puzzle piece dims..*/ , isSelected, cI){ 
  
  var puzCoords = toPair( cI);
  var transX = aTransX; 
  var transY = aTransY;
   
  ctx.lineWidth=0.5;
  ctx.strokeStyle='blue';
  var sizeP = ph;//100; 
  var pp = 15 * (100./pw);
  //sizeP = 100-pp;
  /* Draw the shape (without edges). */
  ctx.beginPath();
  drawLine(  transX, transY+sizeP+pp,transX, transY+pp);
  drawUp(transX, transY, false, pw);
  drawLine(  transX+pw, transY+pp, transX+pw, transY+sizeP+pp);
  drawUp(transX, transY+sizeP, true, pw);//false);
  ctx.setTransform(1,0,0,1,0,0);
  ctx.closePath();
  var myFillColor=''; 
  if( puzCoords[0]==7){
		
		myFillColor=/*ctx.fillStyle=*/ hsv2rgb((360/8.)*((puzCoords[1]+3)),1,1);
		(puzzlePieceData[gridContent[cI]])['color']=myFillColor;
		
		function assignTypeString(val) {
			var answer = "";
			switch( val ) {
			case 0: 
				return("INSTRUCTIONS");
				break;
			case 1: 
				return("RESPONSE");
				break;
			case 2: 
				return("DELAY");
				break;
			case 3: 
				return("STUDY-PHASE");
				break;
			case 4: 
				return("TEST-PHASE");
				break;
			Default:
				return(null);//answer = "Massive or Tiny?";
			} 
			return answer;  
		}
		if( puzCoords[1] <=4 ){
			/* this is "the assignment bit".... 
			
				So, if the type is to be, TEST-PHASE,
				
				we need to confirm
					1) that there is a STUDY-PHASE unit in the square above... 
							and
					2) that we can assign the above STUDY-PHASE id, to the TEST-PHASE....
					
					3) when we SELECT an item, we need to make sure the 
						selectedItem basically points to the STUDY-PHASE unit, in both cases... 
						
						if there is no study phase in the square above, don't allow the assignment. 
						
			*/
			
			var typeToAssign = assignTypeString(puzCoords[1]);
			/* */
			if(  typeToAssign == "TEST-PHASE" ){
			  scI = (puzCoords[0]).toString()+'-'+(puzCoords[1]-1).toString();
			  //console.log('scI',scI);
				if( gridContent[scI]!=null && ((puzzlePieceData[gridContent[scI]])['type']=="STUDY-PHASE") ){
					(puzzlePieceData[gridContent[cI]])['type']=typeToAssign;
					/*
							now need to assign the STUDY-PHASE name-id (not grid square id) to this one...
					*/
					(puzzlePieceData[gridContent[cI]])['master']=gridContent[scI];
				}else{
					console.log('nothing there.');
				}
			}else{
				(puzzlePieceData[gridContent[cI]])['type']=typeToAssign;
				delete (puzzlePieceData[gridContent[cI]])['master'];
				
			}//(puzzlePieceData[gridContent[cI]])['type']=typeToAssign;
		}
		else{
			(puzzlePieceData[gridContent[cI]])['type']=null;//assignTypeString(puzCoords[1]);
			myFillColor=/*ctx.fillStyle=*/ (isSelected==true)?avgColor:invColor;//inverseColor(invColor);
			(puzzlePieceData[gridContent[cI]])['color']=invColor;
			
		}
		
  }else{
		myFillColor=/*ctx.fillStyle=*/ (isSelected==true)?avgColor:invColor;//inverseColor(invColor);
		var savedColor =(puzzlePieceData[gridContent[cI]])['color'];
		if( savedColor){
		
			if(  ((savedColor.toString())[0])=='#'){
				savedColor = hexToRgb( savedColor);
				(puzzlePieceData[gridContent[cI]])['color'] = savedColor;
			}
		}
		//console.log('savedColor', savedColor);
		if(savedColor ){

			myFillColor=(isSelected==true)?inverseColor(savedColor):savedColor;
		}
	} 
	ctx.fillStyle=myFillColor;

  ctx.fill();
  
  /* draw the picking area.. MAYBE only draw this when the piece is highlighted!!! */
  ctx.beginPath();
  drawLine(  transX, transY+sizeP+pp,   transX, transY+pp);
  drawLine(     transX, transY+pp,transX+pw, transY+pp);
  drawLine(  transX+pw, transY+pp, transX+pw, transY+sizeP+pp);
  drawLine(  transX+pw, transY+sizeP+pp,transX, transY+sizeP+pp);
  ctx.closePath();
  ctx.strokeStyle='green';
  ctx.stroke();
  
  var fontSize = 11;
  /* Now, draw the text content..  */
  function wrapText(str, startY, isSelected, isBold){  //with some help from ashblue
    var words = str.split(" ");
    var myX = 10;
    var myY = 50;
    var line = '';
    var lines = [ ] ;
    var lineTest = '';
    
    ctx.font = fontSize +"px Arial";
    if(isBold){
			ctx.font = "Bold Italic "+ctx.font;
    }
    ctx.fillStyle = (isSelected)?invColor:avgColor;
    try{
			//ctx.fillStyle = (isSelected)?inverseColor(myFillColor):myFillColor;//invColor:avgColor;//'blue';
    }catch(e){
			ctx.fillStyle = (isSelected)?invColor:avgColor;
    }
    for(var j=0; j<words.length; j++){
      lineTest = line + words[j] + ' ';
      if( ctx.measureText(lineTest).width > 100){
				myY = lines.length * fontSize + fontSize;
				lines.push( {text: line, height: myY});
				line = words[j] + ' ';
      }else{
				line = lineTest; 
      }        
    } 
    // Catch last line in-case something is left over
    if (line.length > 0) {
      currentY = lines.length * fontSize + fontSize;
      lines.push({ text: line.trim(), height: currentY });
    }   
    // Visually output text
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var j = 0, len = lines.length; j < len; j++) {
      ctx.fillText(lines[j].text, transX, lines[j].height+ startY);
    }
  }
  var myString = (puzzlePieceData[gridContent[cI]])['text'];
  var myType = (puzzlePieceData[gridContent[cI]])['type'];
  if( myType ){
		wrapText( myType.toString()+":", transY+15, isSelected, true);
		wrapText( myString, fontSize+transY+15, isSelected,false); 
  }else{
		wrapText( myString, +transY+15, isSelected,false); 
  }
    
}

/*
  Draw the grid. 
  
  Also, (for now), randomly initialize (empty) puzzle piece
    elements on the grid. 
*/
function drawGrid(cw, ch){
  /*
     Draw the grid. 
  */
  var v = 36;
  ctx.globalAlpha = 0.5;
  ctx.lineWidth=1;
  ctx.strokeStyle='blue';
  ctx.setLineDash([5, 15]);
  for( var i=0; i<cw/100; i++){
    drawLine( i * 100, 0+v, i*100, ch+v);    ctx.stroke();
  }
  for(var j=0; j<ch/100; j++){
    drawLine(0, j*100+v, cw, j*100+v);     ctx.stroke();
  }
  
  /* Randomly initialize puzzle piece elements on the grid (for now).. 
	Change this later.. 
  */
  if( progIter<1){
  for( var i =0; i<=cw/100; i++){
    for(var j=0; j<=ch/100; j++){
      var cI = i.toString()+'-'+j.toString();
      if( cI in gridContent){
				//pass
      }else{
				if( Math.random()<.4){////if( i%3==0 || j%==0){
					gridContent[cI]=(nextPuzzlePieceName++);
				}else{
					gridContent[cI]=-1;
				}
      }
    }
  }
 }
 ctx.globalAlpha = 1.;
}

/*
  Draw the puzzle pieces on the grid. 
*/
function drawGridContent(){
  for( var i =0; i<=cw/100; i++){
    for(var j=0; j<=ch/100; j++){
      var cI = i.toString()+'-'+j.toString();
      if( cI in gridContent){
	if(gridContent[cI]>=0){
	  if( pickThis == cI){
	    /* Mouse motion: puzzle piece follows mouse coordiantes: */
	    drawPiece(mx, my, 100,100, cI==selectedItem, cI);
				//0 + 100*i,21 + 100*j, 100,100);
	  }else{
	     //Puzzle piece is static: 
	    drawPiece(0 + 100*i,21 + 100*j, 100,100, cI==selectedItem, cI);
	  }
	      //draw(mx, my, 100, 100);
	}
      }
    }
  }
}

