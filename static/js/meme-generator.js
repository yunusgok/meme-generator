let topTextInput, bottomTextInput, topTextSizeInput, bottomTextSizeInput, imageInput, generateBtn, canvas, ctx;

function generateMeme (img, topText, bottomText, topTextSize, bottomTextSize ,topColor, bottomColor) {
    
    let fontSize;

    canvas.width = img.width;
    canvas.height = img.height;


    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, 0, 0);


    ctx.strokeStyle = 'black';
    ctx.textAlign = 'center';

    ctx.fillStyle = topColor;
    fontSize = canvas.width * topTextSize;
    ctx.font = fontSize + 'px Impact';
    ctx.lineWidth = fontSize / 20;


    ctx.textBaseline = 'top';
    topText.split('\n').forEach(function (t, i) {
        ctx.fillText(t, canvas.width / 2, i * fontSize, canvas.width);
        ctx.strokeText(t, canvas.width / 2, i * fontSize, canvas.width);
    });


    ctx.fillStyle = bottomColor;
    fontSize = canvas.width * bottomTextSize;
    ctx.font = fontSize + 'px Impact';
    ctx.lineWidth = fontSize / 20;

    ctx.textBaseline = 'bottom';
    console.log(bottomColor);
    bottomText.split('\n').reverse().forEach(function (t, i) { // .reverse() because it's drawing the bottom text from the bottom up
        ctx.fillText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
        ctx.strokeText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
    });
}

function init () {
    // Initialize variables
    topTextInput = document.getElementById('top-text');

    bottomTextInput = document.getElementById('bottom-text');


    topTextSizeInput = document.getElementById('top-text-size-input');
    bottomTextSizeInput = document.getElementById('bottom-text-size-input');
    imageInput = document.getElementById('image-input');
    generateBtn = document.getElementById('generate-btn');
    canvas = document.getElementById('meme-canvas');
    
    ctx = canvas.getContext('2d');

    canvas.width = canvas.height = 0;




    generateBtn.addEventListener('click', function () {

        topColor = document.getElementById('topColor').value;
        bottomColor = document.getElementById('bottomColor').value;
        let reader = new FileReader();
        reader.onload = function () {
            let img = new Image;
            img.src = reader.result;
            generateMeme(img, topTextInput.value, bottomTextInput.value, topTextSizeInput.value, bottomTextSizeInput.value, topColor, bottomColor);
        };
        reader.readAsDataURL(imageInput.files[0]);
    });
}

init();
