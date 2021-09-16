
document.getElementById("search-button").onclick = function () {
	let numDefs= 0;
	let numUse= 0;
	let numPhon=0;

	let defs = document.getElementById("defs-col");
	let uses = document.getElementById("use-col");
	let examples = document.getElementById("ex-col");
	let phonetics = document.getElementById("pho-col");
	
	//Eliminar búsqueda previa
	while (defs.firstChild) {
    	defs.removeChild(defs.lastChild);
  	}
  	while (uses.firstChild) {
    	uses.removeChild(uses.lastChild);
  	}
  	while (examples.firstChild) {
    	examples.removeChild(examples.lastChild);
  	}
  	while (phonetics.firstChild) {
    	phonetics.removeChild(phonetics.lastChild);
  	}
	
	let word = document.getElementById("word-input").value;

	//Ir a la API y buscar la palabra
	fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+word+'')
		.then(response => {if (!response.ok) throw Error(response.status);return response;})
		.then(response => response.json())
		.then(data => {
			data.forEach((word) =>{
				let wordInfo = word.meanings;
				let wordPhon = word.phonetics;
				wordInfo.forEach((key)=> {
					let definitions = key.definitions;
					let partOfSpeech = key.partOfSpeech;

					//Agregar Usos
					numUse += 1;
					let div = document.createElement("div");
					let label = document.createElement("label");
					label.setAttribute("id", "partOfSpeech-"+numUse)
					label.innerHTML = numUse+". "+partOfSpeech;
					div.appendChild(label)
					document.getElementById("use-col").appendChild(div);
					
					definitions.forEach((key) => {
						//Agregar Definición
						numDefs += 1;
						let label = document.createElement("label");
						label.setAttribute("id", "def-"+numDefs)
						label.innerHTML = numDefs+". "+key.definition;
						document.getElementById("defs-col").appendChild(label);
						//Agregar ejemplo
						let example="";
						if(key.example == undefined){
							example = "no example on API";
						}else{
							example = key.example;
						}
						let div = document.createElement("div");
						label = document.createElement("label");
						label.setAttribute("id", "ex-"+numDefs)
						label.innerHTML = numDefs+". "+ example;
						div.appendChild(label);
						document.getElementById("ex-col").appendChild(div);
						
					});
				});
				//Agregar fonética
				
				wordPhon.forEach((key) => {

					if(Object.keys(wordPhon[0]).length!=0){
						if(key.audio==undefined){
							numPhon += 1;
							let div = document.createElement("div");
							let label = document.createElement("label");
							label.setAttribute("id", "phonetic-"+numPhon);
							label.innerHTML = numPhon+". "+key.text;
							div.appendChild(label);
							document.getElementById("pho-col").appendChild(div);
						}else{
							numPhon += 1;
							let div = document.createElement("div");
							let label = document.createElement("label");
							label.setAttribute("id", "phonetic-"+numPhon);
							label.innerHTML = numPhon+". "+key.text+"";
							div.appendChild(label);
							let audio = document.createElement("audio");
							let src = document.createElement("source");
							src.setAttribute("src", key.audio);
							src.setAttribute("type", "audio/mp3");
							audio.setAttribute("controls", "controls")
							audio.appendChild(src);
							div.appendChild(audio);
							document.getElementById("pho-col").appendChild(div);
						}	
					}
				});
			});
		}).catch(error => alert("Ingrese una palabra válida"));
}


