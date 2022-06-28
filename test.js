const search = document.getElementById("autocomplete")
const display = document.getElementsByClassName("search_result")

search.onkeyup = function () {
    
    var xhr = new XMLHttpRequest()
    var data = new FormData()
    var string = search.value
    
    data.append("search", string)
    xhr.open("POST", "api/classe/tracks.php")
    if (string.length >= 1) {
        xhr.send(data)
    }
    xhr.onreadystatechange = function () {
        
        if (this.readyState == 4 && this.status == 200) {
            var res = this.response
            var html = '<div class="list-group">'
			if (res["msg"]) {
                
                html += '<a href="#" id="result" class="list-group-item list-group-item-action disabled">'+res["msg"]+'</a>'
			} else {
                for (var count = 0; count < res.length; count++) {
					html += '<span id="result" class="list-group-item list-group-item-action" onclick="get_text(this)">'+res[count]["name"]+'</span>'
				}
			}
			html += '</div>'
			document.getElementById('search_result').innerHTML = html
        
        } else if (this.response == 4) {
            alert("une erreur est survenue !")
        } else if (this.response == 500) {
            alert("connexion a la base de donnée impossible")
        }
    }
    
    document.getElementById('search_result').innerHTML = ""
    xhr.responseType = "json"
    return true
}

function get_text(e) {

    var string_add = e.textContent;
    var string = document.getElementById('autocomplete').value
	var html = string_add

	fetch("api/classe/tracks.php", {

		method:"POST",

		body: JSON.stringify({
			search_query : string
		}),

		headers : {
			"Content-type" : "application/json; charset=UTF-8"
		}
	}).then(function(response){
        
		return response.json();

	}).then(function(responseData){
        document.getElementById('autocomplete').value = html
        document.getElementById('search_result').innerHTML = ''
	})
}