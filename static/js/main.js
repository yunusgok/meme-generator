


var imageSource;

window.addEventListener("load", function() {
  document.getElementById('meme-form').addEventListener("submit", function(e) {
    e.preventDefault(); 

    img = document.getElementById("diplayedImage");
    img.src = "https://picsum.photos/200/300?t=" + new Date().getTime();
    top_line = document.getElementById("top_line").value;
    console.log(top_line)
    if(imageSource == 0){
      url = document.getElementById("urlField").value;
      console.log(url);
    }
    else if(imageSource == 1){
      file = document.getElementById("fileField").files[0];
      console.log(file)
    }
 
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

