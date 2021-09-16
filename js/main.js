document.getElementsByName("search-button").onclick = function () {

	let word = document.getElementById("word-input").value;

	console.log(word);
	fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+word+'')
		.then(response => response.json())
		.then(data => {
			console.log(data);
			//document.getElementById("dog-image").setAttribute("src", data.message);
		});	
}


