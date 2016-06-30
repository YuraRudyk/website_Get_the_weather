window.onload = function(){

	document.getElementsByName("search")[0].onclick = loadDoc;
	document.getElementsByName("clear")[0].onclick = clear;
	document.getElementsByName("city")[0].onclick = deletCity;
	document.getElementsByName("city")[0].onblur = changeFocus;
	document.getElementsByName("city")[0].onkeypress=checkKey();

	function loadDoc() {
		var cityName = document.getElementsByName('city')[0].value;
	  var xhttp = new XMLHttpRequest();
	  function createNewPar(obj){
	  	var content = document.getElementById('content');
	  	var par = document.createElement('p');
	  	par.className = 'place';
	  	par.innerHTML = '- <span class = "cityName">'+ obj.name +'</span>, ' + obj.sys.country + ': ' + (Math.round(((obj.main.temp)/1 - 273.15)*10))/10 + '°С, ' + obj.weather[0].description;
	  	content.appendChild(par);
	  }
	  xhttp.onreadystatechange = function() {
	    if (xhttp.readyState == 4 && xhttp.status == 200) {
	      var obj = JSON.parse(xhttp.responseText);
	      createNewPar(obj);
	    }
	  };
	  xhttp.open("GET", "http://api.openweathermap.org/data/2.5/weather?q="+cityName+"?&APPID=edf009f12510d107c0ca12c92fef881b", true);
	  xhttp.send();
	}

	function clear(){
		document.getElementById('content').innerHTML = '';
		document.getElementsByName('city')[0].value = '';
		document.getElementsByName('city')[0].placeholder = 'What’s the weather in...';
	}

	function deletCity(){
		this.value = '';
		this.placeholder = '';
	}

	function changeFocus(){
		this.placeholder='What’s the weather in...';
	}

	function checkKey(){
		return function(event){
			if(event.which == 13) {
				loadDoc();
				this.blur();
			}
		}
	}

}