import filetype
import sys
import re
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'database')))
import db

def isValidType(product):
    options = ["Fruta", "Verdura"]
    return product in options

def isValid_fv(fv_list):
    is_valid = True
    for fv in fv_list:
        if db.get_fv_by_name(fv) is None:
            is_valid = False
    return is_valid

def isValidDesc(desc):
    return len(desc) <= 300

def validate_photo(photo):
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
    ALLOWED_MIMETYPES = {"image/jpeg", "image/png", "image/gif"}

    ftype_guess = filetype.guess(photo)

    if ftype_guess != None:
        if ftype_guess.extension not in ALLOWED_EXTENSIONS:
            return False
        if ftype_guess.mime not in ALLOWED_MIMETYPES:
            return False
        return True
    
def isValid_region(region_n):
   return db.get_region_by_name(region_n) is not None

def isValid_comuna(comuna_n):
   return db.get_comuna_by_name(comuna_n) is not None

def isValidName(userName): 
    return userName and len(userName) >= 3 and len(userName) <= 80

def isValidEmail(email):
    regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')
    return bool(re.fullmatch(regex, email))

def isValidNumber(phoneNumber):
    isValidCode = re.match(r'^569\d*$', phoneNumber)
    isNumber = re.match(r'^\d+$', phoneNumber)
    maxLenght = 11
    return (isNumber and isValidCode and len(phoneNumber) == maxLenght) or phoneNumber == ""

def isValidProduct(type_product, product_fv, desc, photos, region, comuna, name_p, email_p, number_p):
    for file in photos:
        photo = photos[file]
        if photo.filename != "":
            if not validate_photo(photo):
                return False
    return isValidType(type_product) and isValid_fv(product_fv) and isValidDesc(desc) \
            and isValid_region(region) and isValid_comuna(comuna) and isValidName(name_p) \
                and isValidEmail(email_p) and isValidNumber(number_p)

def isValidPedido(type_pedido, pedido_fv, desc, region, comuna, name_c, email_c, number_c):
    print(type_pedido, pedido_fv, desc, region, comuna, name_c, email_c, number_c, "\n")
    print(isValidType(type_pedido), isValid_fv(pedido_fv), isValidDesc(desc), \
        isValid_region(region), isValid_comuna(comuna), isValidName(name_c), \
            isValidEmail(email_c), isValidNumber(number_c))

    return isValidType(type_pedido) and isValid_fv(pedido_fv) and isValidDesc(desc) \
            and isValid_region(region) and isValid_comuna(comuna) and isValidName(name_c) \
                and isValidEmail(email_c) and isValidNumber(number_c)