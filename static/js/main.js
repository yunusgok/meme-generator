

var main_url = "localhost:5000/" 
var imageSource;

window.addEventListener("load", function() {
  document.getElementById('meme-form').addEventListener("submit", function(e) {
    e.preventDefault(); 

    img = document.getElementById("diplayedImage");
    //img.src = "https://picsum.photos/200/300?t=" + new Date().getTime();
    console.log("start")
    
    data = {};
    data['url'] = "https://picsum.photos/200/300";
    data['topLine'] = document.getElementById("topLine").value;
    data['bottomLine'] = document.getElementById("bottomLine").value;
    data['topColor'] = document.getElementById("topColor").value;
    data['bottomColor'] = document.getElementById("bottomColor").value;
    
    console.log("init")
    
    if(imageSource == 0){
      data['url'] = document.getElementById("urlField").value;
      
    }
    else if(imageSource == 1){
      file = document.getElementById("fileField").files[0];
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.response);
        img.src = this.response;
      }
    };
    xhttp.open("POST", "generate", true);
    xhttp.send(JSON.stringify(data));
    console.log("sent")
    
  })
});


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

