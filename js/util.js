	function getKeys(obj) {
		var r = []
		for (var k in obj) {
			if (!obj.hasOwnProperty(k)) 
				continue
			r.push(k)
		}
		return r
	}


  /* convert a string of form:
	'1,2'
	
     to a pair of integers of form:
	[1,2]
  */
  function toPair( ci){
    var parts = ci.split('-');  //use - as separator for our "pair" construction. 
    for(var i=0; i<2; i++){
      parts[i]=parseInt(parts[i]);
    }
    return( parts);
  }

  /* Check if a string (or character) is all upper case. */
  function allUpperCase(s){
    var ss = s.toString();
    return( ss == ss.toUpperCase());
  }


  

