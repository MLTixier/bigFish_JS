document.onreadystatechange = function () {

    //définition d'un nombre de poissons à afficher par page par défaut
    let x=2;
    const xInput = document.getElementById("nbPPP")
    xInput.placeholder = x;

    //si on veut faire appel à l'API dès le démarrage... sinon il y a uniquement les derniers arrivages, cad le poisson en dur dans HTML
    // // affiche x (nb Poissons Par Page) cartes poissons de l'API au chargement de la page :'
    // apiVanilla(x,0);

    //variable booleene selon qu'il y a des poissons de l'API affichés sur la page ou non
    let appelApi = false;

    const xClick = document.getElementById("submitNbPPP")
    xClick.addEventListener('click',function(){
        xUpdate()
    });

    const searchClick= document.getElementById("submit-search")
    searchClick.addEventListener('click',function(){
        search()
    });


    const buttonElement = document.getElementById("submitAddFish");
    buttonElement.addEventListener('click', function (event) {
        document.querySelector("#formError").innerHTML="";
        if (validateForm()==""){
            createFish();
        }else{
            let formMsg = document.createElement('p');
            formMsg.innerHTML= validateForm();
            formMsg.className="search-error";
            let ancre = document.querySelector("#formError");
            ancre.appendChild(formMsg);
        }
    });

    console.log("appelApi : ", appelApi)
};





