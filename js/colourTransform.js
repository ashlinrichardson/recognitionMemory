/*

standard hsv to rgb conversion... 

h is in range [0--> 60]..... 
s, v are in range [0,1]...

*/
var hsv2rgb = function(h,s,v) { /*   var h = hsv.hue, s = hsv.sat, v = hsv.val; */
  var rgb, i, data = [];
  if (s === 0) {
    rgb = [v,v,v];
  }
  else{
    h = h / 60;
    i = Math.floor(h);
    data = [v*(1-s), v*(1-s*(h-i)), v*(1-s*(1-(h-i)))];
    switch(i) {
      case 0:	 rgb= [v, data[2], data[0]]; break;
      case 1:  rgb= [data[1], v, data[0]]; break;
      case 2:  rgb= [data[0], v, data[2]]; break;
      case 3:  rgb= [data[0], data[1], v]; break;
      case 4:  rgb= [data[2], data[0], v]; break;
      default: rgb= [v, data[0], data[1]]; break;
    }
  }
  return '#' + rgb.map(function(x){ 
    return ("0" + Math.round(x*255).toString(16)).slice(-2);
  }).join('');
};

/*  Color conversion.....from 
	http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

The following will do to the RGB to hex conversion and add any required zero padding: 
*/
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}  
function _rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function rgbToHex( rgb){
	var mySlice= rgb.slice(4,rgb.length-1);
	var myFrags =mySlice.split(',');
	return( _rgbToHex( parseInt(myFrags[0]), parseInt(myFrags[1]), parseInt(myFrags[2])));
}

/* converting in the other direction.... also from:
	http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

*/
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return 'rgb('+parseInt(result[1], 16).toString()+','+ parseInt(result[2], 16).toString()+','+ parseInt(result[3], 16)+ ')';
    /*return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;*/
}  /* alert( hexToRgb("#0033ff").g );   */


  function resolveColor(color){
    // return an array containing R, G and B values
    if(color === 'transparent')// IE (6 and ?)
        color = '#FFF';
    var r,g,b;
    var hex_color_pcre = new RegExp("^#[0-9a-f]{3}([0-9a-f]{3})?$",'gi');
    var rgb_color_pcre = new RegExp("rgb\\(\\s*((?:[0-2]?[0-9])?[0-9])\\s*,\\s*((?:[0-2]?[0-9])?[0-9])\\s*,\\s*((?:[0-2]?[0-9])?[0-9])\\s*\\)$",'gi');
    var rgb_percent_color_pcre = new RegExp("rgb\\(\\s*((?:[0-1]?[0-9])?[0-9])%\\s*,\\s*((?:[0-1]?[0-9])?[0-9])%\\s*,\\s*((?:[0-1]?[0-9])?[0-9])%\\s*\\)$",'gi');
    if(color.match(hex_color_pcre)){
        if(color.length == 4){
            r  = color.charAt(1)+""+color.charAt(1);
            g  = color.charAt(2)+""+color.charAt(2);
            b  = color.charAt(3)+""+color.charAt(3);
        }
        else{
            r  = color.charAt(1)+""+color.charAt(2);
            g  = color.charAt(3)+""+color.charAt(4);
            b  = color.charAt(5)+""+color.charAt(6);
        }
        r = h2d(r);
        g = h2d(g);
        b = h2d(b);
    }
    else if(color.match(rgb_color_pcre)){
        r = RegExp.$1;
        g = RegExp.$2;
        b = RegExp.$3;
    }
    else if(color.match(rgb_percent_color_pcre)){
        r = parseInt((RegExp.$1)*2.55);
        g = parseInt((RegExp.$2)*2.55);
        b = parseInt((RegExp.$3)*2.55);
    }
    else
        return false;

    /*var returned =[];
    returned['red'] = r;
    returned['green'] = g;
    returned['blue'] = b;*/
    return( 'rgb('+r.toString()+','+g.toString()+','+b.toString()+')');
//    return returned;
}


    
  function inverseColor( _rgbColor){
 
		var rgbColor = resolveColor(_rgbColor);
    /*Return the string for the complementary inverse color, 
    for a color string of the format:
      rgb(230,226,224) 
    */
    var values = (rgbColor.slice(4, rgbColor.length-1)).split(',');
    /* should now have a string array like this:
	  230,226,224  */
    var s = 'rgb(';
    for( var i=0; i<3; i++){
      s+= (255-parseInt(values[i])).toString();
      if( i<2){
				s+=',';
      }
    }
    return(s+')'); 
  }



