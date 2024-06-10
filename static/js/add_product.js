const regiones = ["Región Arica y Parinacota", "Región de Tarapacá", "Región de Antofagasta",
    "Región de Atacama", "Región de Coquimbo ", "Región de Valparaíso", "Región del Libertador Bernardo O'Higgins", 
        "Región del Maule", "Región del Ñuble", "Región del Biobío", "Región de La Araucanía", 
            "Región de Los Ríos", "Región de Los Lagos", "Región Aisén del General Carlos Ibáñez del Campo", 
                "Región de Magallanes y la Antártica Chilena", "Región Metropolitana de Santiago "]; 

const comunas = {
    "Región Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
    "Región de Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
    "Región de Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
    "Región de Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
    "Región de Coquimbo ": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paihuano", "Vicuña", "Illapel", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
    "Región de Valparaíso": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"],
    "Región del Libertador Bernardo O'Higgins": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"],
    "Región del Maule": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
    "Región del Ñuble": ["Cobquecura", "Coelemu", "Ninhue", "Portezuelo", "Quirihue", "Ránquil", "Treguaco", "Bulnes", "Chillán Viejo", "Chillán", "El Carmen", "Pemuco", "Pinto", "Quillón", "San Ignacio", "Yungay", "Coihueco", "Ñiquén", "San Carlos", "San Fabián", "San Nicolás"],
    "Región del Biobío": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"],
    "Región de La Araucanía": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
    "Región de Los Ríos": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"],
    "Región de Los Lagos": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"],
    "Región Aisén del General Carlos Ibáñez del Campo": ["Coyhaique", "Lago Verde", "Aisén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"],
    "Región de Magallanes y la Antártica Chilena": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Antártica", "Porvenir", "Primavera", "Timaukel", "Puerto Natales", "Torres del Paine"],
    "Región Metropolitana de Santiago ": ["Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "Santiago", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"]
}

const options = {
    "Fruta": ["Arándano","Frambuesa","Frutilla","Grosella","Mora",
        "Limón","Mandarina","Naranja","Pomelo","Melón","Sandía","Palta",
            "Chirimoya","Coco","Dátil","Kiwi","Mango","Papaya","Piña","Plátano",
                "Damasco","Cereza","Ciruela","Higo","Kaki","Manzana","Durazno","Nectarin",
                    "Níspero","Pera","Uva","Almendra","Avellana","Maní","Castaña","Nuez","Pistacho"],
    "Verdura": ["Brócoli","Repollo","Coliflor","Rábano","Alcachofa",
        "Lechuga","Zapallo","Pepino","Haba","Maíz","Champiñón","Acelga",
            "Apio","Espinaca","Perejil","Ajo","Cebolla","Espárrago","Puerro",
                "Remolacha","Berenjena","Papa","Pimiento","Tomate","Zanahoria"]
};


const toPixels = number => {
    return number.toString() + "px";
}

const width = 350;
const height = 120;
let show_message = false;

let files_not_edited = true;
let invalid_files = 0;

let files_count = 0;
const max_files = 3;
let product_count = 0;
const max_product = 5;

confirm_alert = document.getElementById("confirm_alert").style;
confirm_alert.width = toPixels(width);
confirm_alert.height = toPixels(height);
confirm_alert.left = toPixels(-width/2);
confirm_alert.top = toPixels(-height*0.75);

for (i = 0; i < regiones.length; i++) {
    new_option = document.createElement("option");
    new_option.value = regiones[i];
    new_option.innerText = regiones[i];
    document.getElementById("region_selector").appendChild(new_option);
};

const resetOptions = select => {
    select.length = 1;
    select.value = select[0].value;
};

const resetSelect = select => {
    select.value = select[0].value;
};

const isSelected = select => {
    selection_count = 0;
    const actual_options = select.options;
    for (i = 1; i < actual_options.length; i++) {
        if (actual_options[i].selected) selection_count++;
    }
    return selection_count > 0;
}

const updateProduct = () => {
    const actual_type = document.getElementById("type_selector").value;
    const product_selector = document.getElementById("product_selector");
    product_selector.removeAttribute("disabled");
    resetOptions(product_selector);

    for (i=0; i < options[actual_type].length; i++) {
        const new_option = document.createElement('option');
        new_option.value = options[actual_type][i];
        new_option.innerText = options[actual_type][i];
        document.getElementById("product_selector").appendChild(new_option);
    }
};

const isValidAmountOfProducts = () => {
    product_count = 0;
    const selector = document.getElementById("product_selector")
    const actual_options = selector.options;
    for (i = 1; i < actual_options.length; i++) {
        if (actual_options[i].selected) product_count++;
    }
    return product_count > 0 && product_count <= 5;
};

const addFile = () => {
    const number = files_count + 1;
    if (files_count < max_files) {
        const new_file = document.createElement('input');
        const new_file_str = "file_" + number.toString();
        new_file.type = "file";
        new_file.id = new_file_str;
        new_file.name = new_file_str;
        if (number == 1) new_file.addEventListener("change", validateFile1);
        if (number == 2) new_file.addEventListener("change", validateFile2);
        if (number == 3) new_file.addEventListener("change", validateFile3);
        document.getElementById("files_upload").appendChild(new_file);
    }
    files_count++;
    console.log("hola");
};

const validateFile = file => {
    files_not_edited = false;
    let allowedTypes = ["image/jpeg", "image/png", "image/gif", "png", "jpg", "jpeg", "gif"];
    if (!allowedTypes.includes(file.type)) {
        invalid_files += 1;
    } else {
        if (invalid_files > 0) invalid_files -= 1;
        addFile();
    }
};

const validateFile1 = () => {
    let file = document.getElementById("file_1").files[0];
    validateFile(file);
};

const validateFile2 = () => {
    let file = document.getElementById("file_2").files[0];
    validateFile(file);
};

const validateFile3 = () => {
    let file = document.getElementById("file_3").files[0];
    validateFile(file);
};

const resetFiles = () => {
    divFiles = document.getElementById("files_upload");
    while (divFiles.firstChild) {
        divFiles.removeChild(divFiles.firstChild);
    }
    files_count = 0;
    addFile();
}


const updateRegion = () => {
    const actual_region = document.getElementById("region_selector").value;
    const comuna_selector = document.getElementById("comuna_selector");
    comuna_selector.removeAttribute("disabled");
    resetOptions(comuna_selector);

    for (i=0; i < comunas[actual_region].length; i++) {
        const new_option = document.createElement('option');
        new_option.value = comunas[actual_region][i];
        new_option.innerText = comunas[actual_region][i];
        comuna_selector.appendChild(new_option);
    }
};

const isValidName = userName => {
    return userName && userName.length >= 3 && userName.length <= 80;
};

const isValidEmail = email => {
    const emailRegex = /([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+/;
    return emailRegex.test(email);
};

const isValidNumber = phoneNumber => {
    const isNumber = /^[0-9]+$/.test(phoneNumber);
    const maxLenght = 11;
    const isValidCode = /^569/.test(phoneNumber)
    return (isNumber && isValidCode && phoneNumber.length == maxLenght) || phoneNumber == "";
};

const printInvalidMessage = (condition, emisor, message) => {
    if (condition) {
        emisor.innerText = message; 
    }
};

const notDisplayConfirmAlert = () => {
    document.getElementById("confirm_alert").style.display = "none"
};

const displayConfirmAlert = () => {
    document.getElementById("confirm_alert").style.display = "block"
};

const validateForm = () => {
    const type_selector = document.getElementById("type_selector");
    const region_selector = document.getElementById("region_selector");
    const comuna_selector = document.getElementById("comuna_selector");
    const productorName = document.getElementById("productor_name");
    const productorEmail = document.getElementById("productor_email");
    const phoneNumber = document.getElementById("phone_number");
    const invalidMessage = document.getElementById("invalid_message"); 
    invalidMessage.style.color = "#920202";
    invalidMessage.innerText = "";
    if (!isSelected(type_selector)) {
        invalidMessage.innerText = "Seleccione tipo de producto";
        return;
    }
    if (!isValidAmountOfProducts()) {
        invalidMessage.innerText = "Seleccione una cantidad válida de productos";
        return;
    }
    if (files_count == 1 && files_not_edited) {
        invalidMessage.innerText = "Suba una foto para su producto";
        return;
    }
    if (invalid_files > 0 && !files_not_edited) {
        invalidMessage.innerText = "Suba un archivo valido para las fotos (png, jpg, jpeg)";
        return;
    }
    if (!isSelected(region_selector)) {
        invalidMessage.innerText = "Seleccione región y comuna de origen";
        return;
    }
    if (!isSelected(comuna_selector)) {
        invalidMessage.innerText = "Seleccione comuna de origen";
        return;
    }
    if (!isValidName(productorName.value)) {
        invalidMessage.innerText = "Ingrese un nombre con un largo entre 3 y 80 caracteres";
        return;
    }
    if (!isValidEmail(productorEmail.value)) {
        invalidMessage.innerText = "Ingrese un Email válido";
        return;
    }
    if (!isValidNumber(phoneNumber.value)) {
        invalidMessage.innerText = "Ingrese un número de telefono con prefijo 569. Ejemplo: 56912345678";
        return;
    }
    displayConfirmAlert();
};

document.getElementById("submit").addEventListener("click", validateForm);
document.getElementById("cancel").addEventListener("click", notDisplayConfirmAlert);
addFile();