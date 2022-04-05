$(document).ready(function(){

    // let jsonDatas="";
    //
    // let apiRequest = $.ajax({
    //     url: "https://www.fishwatch.gov/api/species.json",
    //     method: "GET",
    //     dataType: "json",
    // })
    //
    // apiRequest.fail(function (error) {
    //     alert("La requête s'est terminée en échec. Infos : " + JSON.stringify(error));
    // })
    //
    // apiRequest.done(function (response) {
    //     // jsonDatas = JSON.stringify(response);
    //     jsonDatas = response;
    //     //$("div.feeder").append(jsonDatas);
    // })
    //
    // console.log(jsonDatas);

    //affichage d'un article :
    function hydratePoisson(i) {
        const fishCard = document.createElement("div");
        fishCard.className = "fish-card";

        const fishTitle = document.createElement("h3");
        fishTitle.className = "fish-title";
        const fishLabel = document.createElement("label");
        fishLabel.className = "fish-label";
        const fishDescription = document.createElement("p");
        fishDescription.className = "fish-description";
        //const fishImage = document.createElement("img");
        //fishImage.className="fish-image";

        fishTitle.innerHTML = jsonDatas[i].SpeciesName;
        fishLabel.innerHTML = jsonDatas[i].HarvestType;
        fishDescription.innerHTML = "Description physique :" + jsonDatas[i].PhysicalDescription;
        //fishImage.src = jsonDatas[i].ImageGallery.src;
        //fishImage.alt = jsonDatas[i].ImageGallery.alt;

        //j'attribue comme enfants de la sous-div les const définies plus haut
        fishCard.appendChild(fishTitle);
        fishCard.appendChild(fishLabel);
        fishCard.appendChild(fishDescription);
        //fishCard.appendChild(fishImage);
        return fishCard;
    }


    //affichage de tous les articles :
    function afficheTout(jsonDatas) {
        for (let i in jsonDatas) {
            document.getElementById("#feeder").appendChild(hydratePoisson(i));
        }
    }

    $('#refresh').click(afficheTout(jsonDatas));

})