	function getKeys(obj) {
		var r = []
		for (var k in obj) {
			if (!obj.hasOwnProperty(k)) 
				continue
			r.push(k)
		}
		return r
	}

