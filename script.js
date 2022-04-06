$(document).ready(function () {
    api(1);
    $('#refresh').click(function () {
        api("tous");
    });

    function api(nombre) {
        // fonction en vanilla JS :
        const number = nombre;
        let url = "https://www.fishwatch.gov/api/species";
        fetch(url).then(res => res.json())
            .then(data => {
                afficheTousLesPoissons(data,number);
                // afficheCarousel(data));
            })
            .catch(function () {
                document.getElementById("errorAPI").text = "Il y a eu un problème avec votre API";
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
    function affichePoisson(json) {
        const fishCard = document.createElement("div");
        fishCard.className = 'fish-card';

        const fishTitle = document.createElement("h3");
        fishTitle.innerHTML = json['Species Name'];
        fishTitle.className = 'fish-title';
        fishCard.appendChild(fishTitle);

        if (json['Image Gallery'] != null) {
            if (json['Image Gallery'].length > 1) {
                const fishImage = document.createElement("img");
                fishImage.src = json['Image Gallery'][0].src;
                fishImage.alt = json['Image Gallery'][0].alt;
                fishImage.className = 'fish-image';
                fishCard.appendChild(fishImage);
            } else if (json['Image Gallery'].length === 0) {
                const fishImage = document.createElement("img");
                fishImage.src = json['Image Gallery'].src;
                fishImage.alt = json['Image Gallery'].alt;
                fishImage.className = 'fish-image';
                fishCard.appendChild(fishImage);
            }
        } else {
            const fishImage = document.createElement("img");
            fishImage.src = "https://www.aquaportail.com/pictures1910/phones/poisson.jpg"
            fishImage.alt = "photo générique de poisson";
            fishImage.className = 'fish-image';
            fishCard.appendChild(fishImage);
        }

        const labelList = document.createElement("span");
        const fishLabel = document.createElement("label");
        fishLabel.innerHTML = json['Harvest Type'];
        fishLabel.className = "fish-label";
        labelList.className = "label-list";
        labelList.appendChild(fishLabel);
        fishCard.appendChild(labelList);

        const fishDescription = document.createElement("p");
        fishDescription.innerHTML = "Description physique :" + json['Physical Description'];
        fishDescription.className = "fish-description";
        fishCard.appendChild(fishDescription);

        // //méthode en jquery :
        // $("#ajax").append(fishCard);

        //méthide en vanilla JS :
        document.getElementById("ajax").appendChild(fishCard);
    }


    //affichage de n cartes descriptif poisson :
    function afficheTousLesPoissons(jsonDatas, nombre) {
        for (let i in jsonDatas) {
            let jsonPoisson = jsonDatas[i];
            affichePoisson(jsonPoisson);
            if (i == nombre) {
                break;
            }
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

function show(){
    document.getElementById("topdown-menu").classList.replace("hidden", "visible");
}


