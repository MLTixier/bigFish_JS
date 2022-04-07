document.onreadystatechange = function () {
    if (document.readyState == "interactive") {

        // affiche les n premières cartes poissons de l'API au chargement de la page :'
        apiVanilla(0);
    }

    // document.querySelector("#submitAddFish").onclick = function() {
    //     console.log("coucou");
    //     createFish();
    // };

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





