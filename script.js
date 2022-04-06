$(document).ready(function () {
    ajax();
    $('#refresh').click(function () {
        ajax();
    });

    function ajax() {
        $.ajax({
            url: "https://www.fishwatch.gov/api/species",
            method: "GET",
            dataType: "json",
        })
            .done(function (response) {
                afficheTout(response);
                afficheCarousel(response);
            })
            .fail(function (error) {
                alert("La requête s'est terminée en échec. Infos : " + JSON.stringify(error));
            })
    }

    //affichage des images issues de l'API dans le carousel :
    function afficheCarousel(jsonDatas) {
        for (let i in jsonDatas) {
            if (jsonDatas[i]['Image Gallery'] != null) {
                const image = document.createElement("img");
                if (jsonDatas[i]['Image Gallery'].length > 1) {
                    const fishImage = document.createElement("img");
                    fishImage.src = jsonDatas[i]['Image Gallery'][0].src;
                    fishImage.alt = jsonDatas[i]['Image Gallery'][0].alt;
                } else if (jsonDatas[i]['Image Gallery'].length === 0) {
                    const fishImage = document.createElement("img");
                    fishImage.src = jsonDatas[i]['Image Gallery'].src;
                    fishImage.alt = jsonDatas[i]['Image Gallery'].alt;
                }
                image.appendChild(fishImage);
                $("#carousel").append(affichePoisson(i, jsonDatas));
            }
        }
    }

    //affichage d'un article :
    function affichePoisson(i, jsonDatas) {
        const fishCard = document.createElement("div");

        const fishTitle = document.createElement("h3");
        fishTitle.innerHTML = jsonDatas[i]['Species Name'];
        fishCard.append(fishTitle);

        if (jsonDatas[i]['Image Gallery'] != null) {
            if (jsonDatas[i]['Image Gallery'].length > 1) {
                const fishImage = document.createElement("img");
                fishImage.src = jsonDatas[i]['Image Gallery'][0].src;
                fishImage.alt = jsonDatas[i]['Image Gallery'][0].alt;
                fishCard.appendChild(fishImage);
            } else if (jsonDatas[i]['Image Gallery'].length === 0) {
                const fishImage = document.createElement("img");
                fishImage.src = jsonDatas[i]['Image Gallery'].src;
                fishImage.alt = jsonDatas[i]['Image Gallery'].alt;
                fishCard.appendChild(fishImage);
            }
        } else {
            const fishImage = document.createElement("img");
            fishImage.src = "https://www.aquaportail.com/pictures1910/phones/poisson.jpg"
            fishImage.alt = "photo générique de poisson";
            fishCard.appendChild(fishImage);
        }

        const labelList = document.createElement("span");
        const fishLabel = document.createElement("label");
        fishLabel.innerHTML = jsonDatas[i]['Harvest Type'];
        labelList.append(fishLabel);
        fishCard.append(labelList);

        const fishDescription = document.createElement("p");
        fishDescription.innerHTML = "Description physique :" + jsonDatas[i]['Physical Description'];
        fishCard.append(fishDescription);

        return fishCard;
    }


    //affichage de tous les articles :
    function afficheTout(jsonDatas) {
        for (let i in jsonDatas) {
            $("#ajax").append(affichePoisson(i, jsonDatas));
        }
    }
})



