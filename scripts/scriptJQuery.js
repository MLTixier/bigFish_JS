// script vanilla exécuté et non pas celui-ci en jQuery (fichier pas appelé dans le HTML)
$(document).ready(function () {

    //définition du nombre de poissons à afficher par page
    let x=2;
    const xInput = document.getElementById("nbPoissonsParPage")
    xInput.placeholder = x;
    xInput.addEventListener('click',function(){
        x=xInput.value
    })

    // affiche les n premières cartes poissons de l'API au chargement de la page :'
    apiJQuery(0, x);

    //affiche toutes les cartes poissons au clic sur le picto refresh en JQuery :
    $('#refresh').click(function () {
        apiJQuery("tous");
    });

});





