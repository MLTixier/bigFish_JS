window.addEventListener("DOMContentLoaded", (event) => {

    let tableauImages = [
        "/images/poisson1.jpg",
        "/images/poisson4.jpg",
        "/images/poisson5.jpg",
        "/images/poisson6.jpg",
        "/images/poisson7.jpg",
        "/images/poisson8.jpg",
        "/images/poisson1.jpg",
        "/images/poisson4.jpg",
        "/images/poisson5.jpg",
        "/images/poisson6.jpg",
        "/images/poisson7.jpg",
        "/images/poisson8.jpg",
    ];

    tableauImages = tableauAleatoire(tableauImages)

    let compteur=0;
    let paires=[]
    afficheCartes(tableauImages, compteur, paires)

})