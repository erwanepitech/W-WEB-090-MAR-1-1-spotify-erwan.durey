window.onload = function (){

    var select = document.getElementById("genre")
    var xhr = new XMLHttpRequest()
    var data = new FormData()
    var html
    data.append("search", "lol")
    xhr.open("POST", "api/classe/genres.php")
    xhr.send(data)

    xhr.onreadystatechange = function () {
        
        if (this.readyState == 4 && this.status == 200) {
            var res = this.response
            console.log(res);

            res.forEach(element => {
                html += '<option value="'+ element["id"]+'">'+element["name"]+'</option>'
            });
            
            select.innerHTML += html
        } else if (this.response == 4) {
            alert("une erreur est survenue !")
        } else if (this.response == 500) {
            alert("connexion a la base de donnée impossible")
        }
    }
    xhr.responseType = "json"
    return true
}
