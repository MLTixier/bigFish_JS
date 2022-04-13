//affiche les images d'un tableau en mosaic
function afficheMosaic(tableau) {
    deleteImages()
    const blocMosaic = document.createElement("div");
    blocMosaic.className = "blocMosaic";
    for (let i in tableau) {
        const blocImage = document.createElement("div");
        blocImage.className = "blocImage";
        blocImage.id = i ;
        const image = document.createElement("img");
        image.src = tableau[i];
        blocImage.appendChild(image);
        blocMosaic.appendChild(blocImage);
        blocImage.addEventListener('dblclick', function() {
            blocImage.remove()
        })
    }
    const ancreImage = document.getElementById("galerieAncre")
    ancreImage.appendChild(blocMosaic);
}

//affiche les images d'un tableau en liste
function afficheList(tableau) {
    deleteImages()
    const blocList = document.createElement("div");
    blocList.className = "blocList";
    for (let i in tableau) {
        const blocImage = document.createElement("div");
        blocImage.className = "blocImage";
        blocImage.id = i ;
        const image = document.createElement("img");
        image.src = tableau[i];
        blocImage.appendChild(image);
        blocList.appendChild(blocImage);
        blocImage.addEventListener('dblclick', function() {
            blocImage.remove()
        })
    }
    const ancreImage = document.getElementById("galerieAncre")
    ancreImage.appendChild(blocList);
}

//supprime les images affichées sur la page
function deleteImages() {
    while (document.querySelector(".blocList") != null) {
        document.querySelector(".blocList").remove()
    }
    while (document.querySelector(".blocMosaic") != null) {
        document.querySelector(".blocMosaic").remove()
    }
}

//affiche l'image donnée par l'utilisateur
// function addImage(file){
// const blocMosaic = document.querySelector(".blocMosaic");
// const blocImage = document.createElement("div");
// blocImage.className = "blocImage";
// const image = document.createElement("img");
// image.src = file;
// blocImage.appendChild(image);
// blocMosaic.appendChild(blocImage);
// const ancreImage = document.getElementById("galerieAncre")
// ancreImage.appendChild(blocMosaic);
// }
