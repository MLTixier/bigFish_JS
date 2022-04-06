$(document).ready(function () {
    api();
    $('#refresh').click(function () {
        api();
    });

    function api() {
        // fonction en vanilla JS :
        let url = "https://www.fishwatch.gov/api/species";
        fetch(url).then(res => res.json())
            .then(data=> {
                afficheTout(data);
                // afficheCarousel(data));
            })
            .catch(function (error) {
                console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
            });

        // // fonction en jQuery :
        // $.ajax({
        //     url: "https://www.fishwatch.gov/api/species",
        //     method: "GET",
        //     dataType: "json",
        // })
        //     .done(function (response) {
        //         afficheTout(response);
        //         // afficheCarousel(response);
        //     })
        //     .fail(function (error) {
        //         alert("La requête effectuée à l'API s'est terminée en échec. Infos : " + JSON.stringify(error));
        //     })
    }

    //affichage d'une carte descriptif poisson :
    function affichePoisson(i, jsonDatas) {
        const fishCard = document.createElement("div");
        fishCard.className='fish-card';

        const fishTitle = document.createElement("h3");
        fishTitle.innerHTML = jsonDatas[i]['Species Name'];
        fishTitle.className='fish-title';
        fishCard.appendChild(fishTitle);

        if (jsonDatas[i]['Image Gallery'] != null) {
            if (jsonDatas[i]['Image Gallery'].length > 1) {
                const fishImage = document.createElement("img");
                fishImage.src = jsonDatas[i]['Image Gallery'][0].src;
                fishImage.alt = jsonDatas[i]['Image Gallery'][0].alt;
                fishImage.className='fish-image';
                fishCard.appendChild(fishImage);
            } else if (jsonDatas[i]['Image Gallery'].length === 0) {
                const fishImage = document.createElement("img");
                fishImage.src = jsonDatas[i]['Image Gallery'].src;
                fishImage.alt = jsonDatas[i]['Image Gallery'].alt;
                fishImage.className='fish-image';
                fishCard.appendChild(fishImage);
            }
        } else {
            const fishImage = document.createElement("img");
            fishImage.src = "https://www.aquaportail.com/pictures1910/phones/poisson.jpg"
            fishImage.alt = "photo générique de poisson";
            fishImage.className='fish-image';
            fishCard.appendChild(fishImage);
        }

        const labelList = document.createElement("span");
        const fishLabel = document.createElement("label");
        fishLabel.innerHTML = jsonDatas[i]['Harvest Type'];
        fishLabel.className="fish-label";
        labelList.className="label-list";
        labelList.appendChild(fishLabel);
        fishCard.appendChild(labelList);

        const fishDescription = document.createElement("p");
        fishDescription.innerHTML = "Description physique :" + jsonDatas[i]['Physical Description'];
        fishDescription.className="fish-description";
        fishCard.appendChild(fishDescription);

        // //méthode en jquery :
        // $("#ajax").append(fishCard);

        //méthide en vanilla JS :
        document.getElementById("ajax").appendChild(fishCard);
    }


    //affichage de toutes les cartes descriptif poisson :
    function afficheTout(jsonDatas) {
        for (let i in jsonDatas) {
            affichePoisson(i, jsonDatas);
        }
    }

    //affichage des images issues de l'API dans le carousel :
    // function afficheCarousel(jsonDatas) {
    //     for (let i in jsonDatas) {
    //         if (jsonDatas[i]['Image Gallery'] != null) {
    //             const image = document.createElement("img");
    //             if (jsonDatas[i]['Image Gallery'].length > 1) {
    //                 const fishImage = document.createElement("img");
    //                 fishImage.src = jsonDatas[i]['Image Gallery'][0].src;
    //                 fishImage.alt = jsonDatas[i]['Image Gallery'][0].alt;
    //             } else if (jsonDatas[i]['Image Gallery'].length === 0) {
    //                 const fishImage = document.createElement("img");
    //                 fishImage.src = jsonDatas[i]['Image Gallery'].src;
    //                 fishImage.alt = jsonDatas[i]['Image Gallery'].alt;
    //             }
    //             image.appendChild(fishImage);
    //             $("#carousel").append(affichePoisson(i, jsonDatas));
    //         }
    //     }
    // }

})



