from PIL import Image, ImageDraw, ImageFont
import os

# Crear una imagen placeholder simple
width, height = 256, 256
image = Image.new('RGB', (width, height), color='#333333')
draw = ImageDraw.Draw(image)

# Agregar texto "TV" en el centro
try:
    # Intentar usar una fuente del sistema
    font = ImageFont.truetype("arial.ttf", 40)
except:
    # Si no está disponible, usar fuente por defecto
    font = ImageFont.load_default()

text = "TV"
bbox = draw.textbbox((0, 0), text, font=font)
text_width = bbox[2] - bbox[0]
text_height = bbox[3] - bbox[1]

x = (width - text_width) // 2
y = (height - text_height) // 2

draw.text((x, y), text, fill='white', font=font)

# Guardar la imagen
image.save('C:/Users/marco/Desktop/EpiStream/public/tv-placeholder.png')
print("Imagen placeholder creada exitosamente")