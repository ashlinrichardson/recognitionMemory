/* 
    Load the background. find out what a representative "opposite" colour to the background, is..
*/

  var invColor;
  var img = new Image(); 
  img.src = 'site/uvicAerial.jpg';  
  var avgColor = [0.,0.,0.];
  
  img.onload = function() {
    /* 
      When the background image loads, calculate an approximation 
	to the average colour of the image. Ideally we would use 
	an offscreen canvas or other method to do this, if we had more time.
	
	First: set the canvas size to the background image:
    */
    ctx.width = img.width; 
    ctx.height = img.height;
    
    /* 
      Draw the background image (temporarily) on the canvas. Read the data
	values back in, and sample them to get an approximate average 
	value of the colour of the background image. 
    */
    ctx.drawImage(img, 0, 0); //write bg image to the canvas. 
    var imageData = ctx.getImageData(0, 0, img.width, img.height);
    var pix = imageData.data; //read back the pixel data. 
    var nn = 0;	//count the number of points used in the sample. 
    var nSkip = 7777; 
    /* use a sample/fraction of the image data, to save time.. */
    for (var i = 0; i < pix.length; i+=4) {
      /* Use (1/nSkip) of the image pixels. */
      if( i%nSkip==0){
				var r = 1.*pix[i  ];//red
				var g = 1.*pix[i+1];//green
				var b = 1.*pix[i+2];//blue
				avgColor[0]+=r; avgColor[1]+=g; avgColor[2]+=b; 
				nn+=1.; /* keep track of the number of elements in the sample. */
			}/* Note: pix[i+3] is 'alpha' (the fourth element) */
		}
    /* divide by sample mean to get an approximation of the average: */
    avgColor[0]/=nn;avgColor[1]/=nn; avgColor[2]/=nn;
    /* calculate the inverted colour. */
    invColor = 'rgb(' 
			+(255-Math.floor(avgColor[0])).toString() +','
			+(255-Math.floor(avgColor[1])).toString() +','
			+(255-Math.floor(avgColor[2])).toString() 
			+')'; 
    avgColor = inverseColor( invColor);//represent the original in the same format. 
  } //img.onload = function() 

  ctx.width = 800; 
  ctx.height= canvasHeight;//  800; 

