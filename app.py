from flask import Flask, request, render_template, redirect, url_for, session
from werkzeug.utils import secure_filename
import database.db as db
import utils.validations as vl
import utils.validations as valid
import hashlib
import filetype
import os

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)

app.secret_key = "s3cr3t_k3y"

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000 # 16 MB

@app.errorhandler(413)
def request_entity_too_large(error):
    return 'File exceeds the maximum file size allowed', 413


# --- Routes ---
@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

@app.route("/agregar-producto", methods=["GET", "POST"])
def agregar_producto():
    data = {"message":"","send":False}
    if request.method == "GET":
        return render_template("agregar-producto.html", **data)
    elif request.method == "POST":
        #get all the info from the form
        tipo_producto = request.form.get("type_selector")
        productos = request.form.getlist("product_selector")
        desc = request.form.get("description")
        files = request.files
        region = request.form.get("region_selector")
        comuna = request.form.get("comuna_selector")
        nombre_p = request.form.get("productor_name")
        email_p = request.form.get("productor_email")
        cel_p = request.form.get("phone_number")

        #validate the info of the form
        if not vl.isValidProduct(tipo_producto, productos, desc, files, region, comuna, nombre_p, email_p, cel_p):
            data["message"] = "Ha ocurrido un error en enviar su producto."
            return render_template("agregar-producto.html", **data)

        #insert info on table 'producto'
        comuna_id = db.get_id_of_comuna(comuna)
        db.insert_product(tipo_producto, desc, comuna_id, nombre_p, email_p, cel_p)
        product_id = db.get_last_product()[0]

        #insert the fruits or vegetables of the product on table 'producto_verdura_fruta'
        for fv in productos:
            id_fv = db.get_id_of_fv(fv)
            db.insert_fv_product(product_id, id_fv)
        
        #insert the photos of the product on table 'foto'
        for file in files:
            photo = files[file]
            if valid.validate_photo(photo):
                filename = hashlib.sha256(
                    secure_filename(photo.filename)
                    .encode("utf-8")
                    ).hexdigest()
                extension = filetype.guess(photo).extension
                img_filename = f"{filename}.{extension}"

                photo.save(os.path.join(app.config["UPLOAD_FOLDER"], img_filename))
                db.insert_photo(UPLOAD_FOLDER, img_filename, product_id)
                
        data["message"] = "Hemos recibido el registro de producto. Muchas gracias 😊."
        data["send"] = not data["send"]
        return render_template("agregar-producto.html", **data)


@app.route("/ver-productos/<index>", methods=["GET"])
def ver_productos(index):
    index = int(index)
    five_products = db.get_5_products_by_index(index)
    data = []
    for product in five_products:
        info_product_i = db.makeDictInfoProduct(product)
        data.append(info_product_i)
    return render_template("ver-productos.html", data=data, index=index)

@app.route("/agregar-pedido", methods=["GET", "POST"])
def agregar_pedido():
    data = {"message":"", "send":False}
    if request.method == "GET":
        return render_template("agregar-pedido.html", **data)
    elif request.method == "POST":
        #get all the info from the form
        tipo_pedido = request.form.get("type_selector")
        pedidos = request.form.getlist("product_selector")
        desc = request.form.get("descripcion")
        region = request.form.get("region_selector")
        comuna = request.form.get("comuna_selector")
        name_c = request.form.get("comprador_name")
        email_c = request.form.get("comprador_email")
        number_c = request.form.get("phone_number")

        #validate the info of the form
        if not vl.isValidPedido(tipo_pedido, pedidos, desc, region, comuna, name_c, email_c, number_c):
            data["message"] = "Ha ocurrido un error en enviar su pedido."
            return render_template("agregar-pedido.html", **data)
        
        #insert info on table 'pedido'
        comuna_id = db.get_id_of_comuna(comuna)
        db.insert_pedido(tipo_pedido, desc, comuna_id, name_c, email_c, number_c)
        pedido_id = db.get_last_pedido()[0]

        #insert the fruits or vegetables of the pedido on table 'pedido_verdura_fruta'
        for fv in pedidos:
            id_fv = db.get_id_of_fv(fv)
            db.insert_fv_pedido(pedido_id, id_fv)

        data["message"] = "Hemos recibido el registro de pedido. Muchas gracias 😊."
        data["send"] = not data["send"]
        return render_template("agregar-pedido.html", **data)        

@app.route("/ver-pedidos", methods=["GET"])
def ver_pedidos():
    if request.method == "GET":
        return render_template("ver-pedidos.html")

@app.route("/informacion-pedidos", methods=["GET"])
def info_pedidos():
    return render_template("informacion-pedido.html")

@app.route("/informacion-productos/<product>", methods=["GET"])
def info_productos(product):
    product = db.get_product_by_id(int(product))
    info_product = db.makeDictInfoProduct(product)
    return render_template("informacion-producto.html", data=info_product)

if __name__ == "__main__":
    app.run(debug=True)
