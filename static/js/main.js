

var main_url = "localhost:5000/" 
var imageSource;

window.addEventListener("load", function() {
  document.getElementById('meme-form').addEventListener("submit", function(e) {
    e.preventDefault(); 

    img = document.getElementById("diplayedImage");
    img.src = "https://picsum.photos/200/300?t=" + new Date().getTime();

    let data = new FormData();
    generateStr = "?"
    generateStr += "top=" +  document.getElementById("topLine").value;
    generateStr += "&bottom=" +  document.getElementById("bottomLine").value;

    if(imageSource == 0){
      data.append("imageUrl",document.getElementById("urlField").value);
    }
    else if(imageSource == 1){
      data.append("image",document.getElementById("fileField").files[0]);
    }
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        generateStr += "&meme=" + this.responseText;
        const xhr1 = new XMLHttpRequest();
        xhr1.withCredentials = true;
        
        xhr1.addEventListener("readystatechange", function () {
          if (this.readyState === this.DONE) {
            console.log(typeof(this.response));
          }
        });
        
        xhr1.open("GET", "https://ronreiter-meme-generator.p.rapidapi.com/meme" + generateStr);
        xhr1.setRequestHeader("x-rapidapi-key", "bf96b7ac5amsh9220410a8a8c189p145686jsnb2248ab22e29");
        xhr1.setRequestHeader("x-rapidapi-host", "ronreiter-meme-generator.p.rapidapi.com");
        
        xhr1.send(data);
    
      }
    });
    
    xhr.open("POST", "https://ronreiter-meme-generator.p.rapidapi.com/images");
    xhr.setRequestHeader("x-rapidapi-key", "bf96b7ac5amsh9220410a8a8c189p145686jsnb2248ab22e29");
    xhr.setRequestHeader("x-rapidapi-host", "ronreiter-meme-generator.p.rapidapi.com");
    xhr.send(data);
    



  })
});

function hexToBase64(str) {
  return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
}


function displayImageSource(option) {
  if(option == "urlField"){
    imageSource = 0;
  }
  else if(option == "fileField"){
    imageSource = 1;
  }
  document.getElementById("fileField").style.display = "none";
  document.getElementById("urlField").style.display = "none";
  document.getElementById("fileField").required = false;
  document.getElementById("urlField").required = false;
  document.getElementById(option).style.display = "block";
  document.getElementById(option).required  = true;
}

