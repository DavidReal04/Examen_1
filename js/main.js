var numDefs= 0;
var numUse= 0;
document.getElementById("search-button").onclick = function () {

	let word = document.getElementById("word-input").value;

	console.log(word);
	fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+word+'')
		.then(response => response.json())
		.then(data => {
			console.log(data);
			data.forEach((word) =>{
				let wordInfo = word.meanings;
				console.log(wordInfo);
				wordInfo.forEach((key)=> {
					let definitions = key.definitions;
					let partOfSpeech = key.partOfSpeech;

					numUse += 1;
					let div = document.createElement("div");
					let label = document.createElement("label");
					label.setAttribute("id", "partOfSpeech-"+numUse)
					label.innerHTML = numUse+". "+partOfSpeech;
					div.appendChild(label)
					document.getElementById("use-col").appendChild(div);
					console.log(partOfSpeech);

					definitions.forEach((key) => {
						numDefs += 1;
						let label = document.createElement("label");
						label.setAttribute("id", "def-"+numDefs)
						label.innerHTML = numDefs+". "+key.definition;
						document.getElementById("defs-col").appendChild(label);
					});
				});
			});
		});	
}


