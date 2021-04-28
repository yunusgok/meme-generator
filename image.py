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
    return send_file(img_io, mimetype='image/jpeg')



def add_text_to_image(url, top_line, t_color=(255,255,255,255), bottom_line="", b_color = (0,0,0,0) ):


    image = Image.open(requests.get(url, stream=True).raw)

    width, height = image.size 
    draw = ImageDraw.Draw(image)
    
    text = top_line if len(top_line) > len(bottom_line) else bottom_line
    size = 1
    fnt = ImageFont.truetype("static/fonts/Roboto-Regular.ttf", size)
    textwidth, textheight = fnt.getsize(text)
    while width - textwidth > 20  :
        size += 1
        fnt = ImageFont.truetype("static/fonts/Roboto-Regular.ttf", size)
        textwidth, textheight = fnt.getsize(text)



    margin = 10
    y = height - textheight 

    textwidth, _ = fnt.getsize(top_line)
    draw.text(((width- textwidth)//2 , margin), top_line, font= fnt, fill=t_color)

    textwidth, _ = fnt.getsize(bottom_line)
    draw.text(((width- textwidth)//2, y - margin), bottom_line, font= fnt, fill=b_color)

    file_name =  uuid.uuid4().hex + ".jpg"
    file_path = "static/memes/" + file_name
    image.save(file_path)
    return file_name


if __name__ == '__main__':
    url = 'https://picsum.photos/200/300'
    top_line =  "meme"
    bottom_line = "generator"
    t_color=(255,255,255,255)
    b_color=(255,255,255,255)

    add_text_to_image(url, top_line, t_color, bottom_line, b_color)