var images = ["usa.png", "gift.png", "mexico.png", "delete.png"];
var divs ;
var lastOpenedImg;
var currImg;
var lastClickedDiv;
var currDiv;
var done = 0;
var gridsize;
var tries;

function createGrid(x, y) {
    gridsize = x;
    tries = 0;
    var arrWithDivs = [];
    var count = 0;
    for(var i = 0; i < y; i++) {
        var rowDiv = createDiv("rowDiv" + i);
        rowDiv = addStyle(rowDiv, "rowDiv");
        for(var j = 0; j < x; j++) {
            var childDiv = createDiv("childDiv" + count);
            addStyle(childDiv, "childDiv");
            rowDiv.appendChild(childDiv);
            count++;
        }
        document.getElementById("mainDiv").appendChild(rowDiv)
        
    }
    divs = document.getElementsByClassName("childDiv");
    populateDivNum(arrWithDivs, x, y);
    while(arrWithDivs.length != 0) {
        addImages(arrWithDivs);
    }
    addListeners(divs);
}

function addImages(arr) {
    if(arr.length > 2) {
        var whichDiv_1 = Math.floor(Math.random()*(arr.length));
        var valueDiv_1 = arr[whichDiv_1];
        arr.splice(whichDiv_1, 1);
        var whichDiv_2 = Math.floor(Math.random()*(arr.length));
        var valueDiv_2 = arr[whichDiv_2];
        arr.splice(whichDiv_2, 1);
    } else {
        valueDiv_1 = arr[0], valueDiv_2 = arr[1];
        Array.prototype.sp
        arr.splice(0, 1);
        arr.splice(0, 1);
    }
    console.log(arr + " $$$$ " + whichDiv_1 + " $$$$ " +  whichDiv_2);
    addImageToDiv(valueDiv_1, valueDiv_2);
    
}

function addImageToDiv(whichDiv_1, whichDiv_2) {
    var imgPos = Math.floor(Math.random()*4);
    
    console.log(whichDiv_1 + "  $$$ "  + whichDiv_2);
    var div_1 = document.getElementById("childDiv"+whichDiv_1);
    var div_2 = document.getElementById("childDiv"+whichDiv_2);

    div_1.style.backgroundImage = 'url(' + images[imgPos] + ')';
    div_2.style.backgroundImage = 'url(' + images[imgPos] + ')';

    div_1.classList.add("hide");
    div_2.classList.add("hide");

    //console.log(divs);
}

function addListeners(divs) {

    for(var i = 0; i < divs.length; i++ ){
        divs[i].addEventListener("click", checkComb);
    }
}

function checkComb(event) {

    currDiv = document.getElementById(event.target.id);
    //currImg = div.getElementsByTagName("img")[0];
    //currImg.setAttribute("class", "show");
    
    currImg = currDiv.style.backgroundImage;
    currDiv.classList.remove("hide");
    currDiv.classList.add("show");

    if(!lastOpenedImg) {

        lastClickedDiv = currDiv;
        lastOpenedImg = currImg;
        
    } else if(lastOpenedImg === currImg){

        currDiv.removeEventListener("click", checkComb);
        lastClickedDiv.removeEventListener("click", checkComb);
        setTimeout(changeBackground, 1000);
        done += 2;
    } else {
        setTimeout(hideImage, 1000);
    }
    
}

function hideImage() {
    console.log("csndjc");
    currDiv.classList.add("hide");
    currDiv.classList.remove("show");
    lastClickedDiv.classList.add("hide");
    lastClickedDiv.classList.remove("show");
    
    lastOpenedImg = "";
    lastClickedDiv = "";
    displayScore();
    checkWin();
}

function displayScore() {
    tries += 2;
    document.getElementById("score").innerHTML = "Tiles Turned: " + tries;
}

function changeBackground() {
    
    currDiv.style.background = "blue";
    lastClickedDiv.style.background = "blue";
    hideImage();
}

function checkWin() {
    
    if(done === gridsize*gridsize) {
        alert("You Won!!");
        document.getElementById("mainDiv").innerHTML = "";
        done = 0;
        document.getElementById("score").innerHTML = "";
        createGrid(gridsize+2, gridsize+2);
    }

}

function createImage(imgPos) {
    var img = document.createElement("img");
    img.src = images[imgPos];
    img.setAttribute("class", "hide");
    return img;
}

function populateDivNum(arr, x, y) {
    for(var i = 0; i < x*y; i++) {
        arr.push(i);
    }
}

function createDiv(id) {
    var div = document.createElement("div");
    div.setAttribute("id", id);
    return div;
}


function addStyle(obj, classToAdd) {
   obj.setAttribute("class", classToAdd);
    return obj;
}