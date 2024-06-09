import pymysql
import json
from flask import Flask, request, render_template, redirect, url_for, session

DB_NAME = "tarea2"
DB_USERNAME = "cc5002"
DB_PASSWORD = "programacionweb"
DB_HOST = "localhost"
DB_PORT = 3306
DB_CHARSET = "utf8"

with open('database/querys.json', 'r') as querys:
	QUERY_DICT = json.load(querys)

# -- conn ---

def get_conn():
	conn = pymysql.connect(
		db=DB_NAME,
		user=DB_USERNAME,
		passwd=DB_PASSWORD,
		host=DB_HOST,
		port=DB_PORT,
		charset=DB_CHARSET
	)
	return conn

# -- querys --

#insert products into the database

def insert_product(tipo, desc, id_com, n_productor, email_productor, cel_productor):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["insert_product"], (tipo, desc, id_com, n_productor, email_productor, cel_productor))
	conn.commit()
	return 

def insert_fv_product(product_id, verdura_fruta_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["insert_fv_product"], (product_id, verdura_fruta_id))
	conn.commit()
	return 

#insert pedido, get fv of a pedido and the last pedido

def insert_pedido(tipo, desc, id_com, n_comprador, email_comprador, cel_comprador):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["insert_pedido"], (tipo, desc, id_com, n_comprador, email_comprador, cel_comprador))
	conn.commit()
	return 

def insert_fv_pedido(pedido_id, verdura_fruta_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["insert_fv_pedido"], (pedido_id, verdura_fruta_id))
	conn.commit()
	return 

#getters of comunas and regions

def get_region_by_name(region_n):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_region_by_name"], (region_n,))
	region = cursor.fetchone()
	return region

def get_comuna_by_name(comuna_n):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_comuna_by_name"], (comuna_n,))
	comuna = cursor.fetchone()
	return comuna

def get_region_comuna(comuna_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_region_comuna"], (comuna_id,))
	reg_com = cursor.fetchone()
	return reg_com

def get_id_of_comuna(comuna):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_id_of_comuna"], (comuna,))
	comuna_id = cursor.fetchone()[0]
	return comuna_id

#getters of fruits and vegetables

def get_id_of_fv(fruta_verdura):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_id_of_fv"], (fruta_verdura,))
	fv_id = cursor.fetchone()[0]
	return fv_id

def get_fv_by_name(fv_name):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_fv_by_name"], (fv_name,))
	fv = cursor.fetchone()
	return fv

#getters of a product

def get_product_by_id(product_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_product_by_id"], (product_id,))
	product = cursor.fetchone()
	return product

def get_product_by_name(product_n):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_product_by_id"], (product_n,))
	product = cursor.fetchone()
	return product

def get_fruta_verdura_product(product_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_fruta_verdura_product"], (product_id,))
	frutas_verduras = cursor.fetchall()
	return frutas_verduras

def get_last_product():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_last_product"])
	last_product = cursor.fetchall()[0]
	return last_product

def get_5_products_by_index(index):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_5_products_by_index"], (index,))
	five_products = cursor.fetchall()
	return five_products
	
def get_5_products_com_by_index(index):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_5_products_by_index_com"], (index,))
	five_products_com = cursor.fetchall()
	return five_products_com

def list_of_fv_product(product_id):
	query = get_fruta_verdura_product(product_id)
	list_fv = ""
	for fv in query:
		list_fv += f"{fv[0]} - "
	return list_fv[:-3]

#getters of a pedido

def get_pedido_by_id(pedido_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_pedido_by_id"], (pedido_id,))
	pedido = cursor.fetchone()
	return pedido

def get_fruta_verdura_pedido(pedido_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_fruta_verdura_pedido"], (pedido_id,))
	frutas_verduras = cursor.fetchall()
	return frutas_verduras
	
def get_last_pedido():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_last_pedido"])
	last_pedido = cursor.fetchall()[0]
	return last_pedido

def get_fruta_verdura_pedido(pedido_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_fruta_verdura_pedido"], (pedido_id,))
	frutas_verduras = cursor.fetchall()
	return frutas_verduras

def get_5_pedidos_by_index(index):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_5_pedidos_by_index"], (index,))
	five_pedidos = cursor.fetchall()
	return five_pedidos

def list_of_fv_pedido(pedido_id):
	query = get_fruta_verdura_pedido(pedido_id)
	list_fv = ""
	for fv in query:
		list_fv += f"{fv[0]} - "
	return list_fv[:-3]

#insert and get photos
	
def insert_photo(ruta, name, product_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["insert_photo"], (ruta, name, product_id))
	conn.commit()

def get_photos_product(product_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_photos_product"], (product_id,))
	photos_product = cursor.fetchall()
	return photos_product

#make a dictionary that contains all the info of a product

def makeDictInfoProduct(product_row):
    product_id, tipo, desc, comuna_id, p_nombre, p_email, p_number = product_row
    reg, comuna = get_region_comuna(comuna_id)
    fv_product = list_of_fv_product(product_id)
    photos_p = get_photos_product(product_id)
    paths_photos = []
    for name_photo in photos_p:
        path_image = url_for('static', filename=f"uploads/{name_photo[0]}")
        paths_photos.append(path_image)
    info_product = {
		"id": product_id,
        "tipo": tipo.title(),
		"desc": desc,
        "list_fv": fv_product, 
        "region": reg,
        "comuna": comuna,
		"p_nombre": p_nombre,
		"p_email": p_email,
		"p_number": p_number,
        "list_photos": paths_photos
    }
    return info_product

#make a dictionary that contains all the info of a pedido

def makeDictInfoPedido(pedido_row):
    pedido_id, tipo, desc, comuna_id, c_nombre, c_email, c_number = pedido_row
    reg, comuna = get_region_comuna(comuna_id)
    fv_pedido = list_of_fv_pedido(pedido_id)
    paths_photos = []
    info_pedido = {
		"id": pedido_id,
        "tipo": tipo.title(),
		"desc": desc,
        "list_fv": fv_pedido, 
        "region": reg,
        "comuna": comuna,
		"c_nombre": c_nombre,
		"c_email": c_email,
		"c_number": c_number,
    }
    return info_pedido

#queries to get the info to create graphs

def count_products_by_fv():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["count_products_group_by_fv"])
	count_products = cursor.fetchall()
	info_products = []
	for product in count_products:
		dict_product_i = {"fv": product[0], "cantidad": product[1]}
		info_products.append(dict_product_i)
	return info_products

def count_pedidos_by_com():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["count_pedidos_group_by_com"])
	count_pedidos = cursor.fetchall()
	info_pedidos = []
	for pedido in count_pedidos:
		dict_pedido_i = {"comuna": pedido[0], "cantidad": pedido[1]}
		info_pedidos.append(dict_pedido_i)
	return info_pedidos