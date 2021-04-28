from PIL import Image, ImageDraw, ImageFont
import requests
from io import StringIO, BytesIO
from flask import render_template, send_file
from datetime import datetime
import uuid

def serve_pil_image(pil_img):
    img_io = BytesIO()
    pil_img.save(img_io, 'JPEG', quality=70)
    img_io.seek(0)
    print(type(img_io.getvalue()))
    return img_io.getvalue()



def add_text_to_image(url, topLine, topColor=(255,255,255,255), bottomLine="", bottomColor = (0,0,0,0) ):

    image = Image.open(requests.get(url, stream=True).raw)

    width, height = image.size 
    draw = ImageDraw.Draw(image)
    
    text = topLine if len(topLine) > len(bottomLine) else bottomLine
    size = 1
    fnt = ImageFont.truetype("static/fonts/Roboto-Regular.ttf", size)
    textwidth, textheight = fnt.getsize(text)
    if(textwidth > 0):

        while width - textwidth > 20  :
            size += 1
            fnt = ImageFont.truetype("static/fonts/Roboto-Regular.ttf", size)
            textwidth, textheight = fnt.getsize(text)


    margin = 10
    y = height - textheight 

    textwidth, _ = fnt.getsize(topLine)
    draw.text(((width- textwidth)//2 , margin), topLine, font= fnt, fill=topColor)

    textwidth, _ = fnt.getsize(bottomLine)
    draw.text(((width- textwidth)//2, y - margin), bottomLine, font= fnt, fill=bottomColor)

    file_name =  uuid.uuid4().hex + ".jpeg"
    file_path = "tmp/" + file_name
    image.show()
    return image


if __name__ == '__main__':
    url = 'https://picsum.photos/200/300'
    topLine =  "meme"
    bottomLine = "generator"
    topColor=(255,255,255,255)
    bottomColor=(255,255,255,255)
    
    add_text_to_image(url, topLine, topColor, bottomLine, bottomColor)