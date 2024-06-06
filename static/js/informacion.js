let iterator = 0;
const sizeArray = [[400, 400], [300, 300]];

const toPixels = number => {
    return number.toString() + "px";
}

const interactPhoto = (photo) => {
    const position = iterator % sizeArray.length;
    photo.style.width = toPixels(sizeArray[position][0]);
    photo.style.height = toPixels(sizeArray[position][1]);
    iterator++;
}

document.getElementById("imagen").addEventListener("click", interactPhoto);