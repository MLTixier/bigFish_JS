document.onreadystatechange = function () {

    //définition du nombre de poissons à afficher par page
    let x=2;
    const xInput = document.getElementById("nbPoissonsParPage")
    xInput.placeholder = x;
    xInput.addEventListener('click',function(){
        x=xInput.value
    })

    if (document.readyState == "interactive") {
        // affiche les n premières cartes poissons de l'API au chargement de la page :'
        apiVanilla(1,x);
    }

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
};





