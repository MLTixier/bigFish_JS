// script vanilla exécuté et non pas celui-ci en jQuery (fichier pas appelé dans le HTML)
$(document).ready(function () {

    // affiche les n premières cartes poissons de l'API au chargement de la page :'
    apiJQuery(0);

    //affiche toutes les cartes poissons au clic sur le picto refresh en JQuery :
    $('#refresh').click(function () {
        apiJQuery("tous");
    });

});





