// fonction affiche n poissons de l'API en vanilla JS à partir du ième élément de l'API :
function apiVanilla() {
    // console.log("apiVanilla debut - indice :", iUpdate())
    let url = "https://www.fishwatch.gov/api/species";
    fetch(url)
        .then(res=>res.json())
        .then(data => {
            const i = iUpdate();
            afficheNPoissons(data, i); //n'affiche qu'un nombre de x objets sur la 1ère page, à partir du ième numéro de la BDD
            // afficheCarousel(data));
        })
        .catch(function (error) {
            console.log("error", error);
            let msg = document.createElement("p");
            msg.innerHTML = "Il y a eu un problème avec votre API :" + error.message;
            document.getElementById("errorAPI").append(msg);
        });
}

// // fonction affiche n poissons de l'API en jQuery : attention modifier les paramètres
// function apiJQuery(nombre) {
//     const number = nombre;
//     const y = xUpdate();
//     $.ajax({
//         url: "https://www.fishwatch.gov/api/species",
//         method: "GET",
//         dataType: "json",
//     })
//         .done(function (response) {
//             afficheNPoissons(response, number, 0);
//             // afficheCarousel(response);
//         })
//         .fail(function (error) {
//             alert("La requête effectuée à l'API s'est terminée en échec. Infos : " + JSON.stringify(error));
//         })
// }

//affichage d'une carte descriptif poisson - en vanilla JS :
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
    fishDescription.innerHTML = "<p style='font-weight:bold'> Description physique : </p></br>" + json['Physical Description'];
    fishDescription.className = "fish-description";
    fishCard.appendChild(fishDescription);

    // //méthode en jquery :
    // $("#ajax").append(fishCard);

    //méthode en vanilla JS :
    const ancre = document.querySelector("#ajax")
    ancre.appendChild(fishCard);
    console.log("fin affichePoisson")
}

//affichage de n cartes descriptif poisson en vanilla JS
//ajout d'une fonctionnalité qui fait qu'il n'y a que x cartes affichées par page, à partir du ieme indice dans le json
function afficheNPoissons(jsonDatas, indice) {
    previousFishDelete()
    const x = xUpdate()
    console.log("debut afficheNPoissons, indice : ", indice, ", x : ", x)

    //ajout d'une balise cachée portant l'indice du 1er poisson affiché de la page
    let iValue=""
    if (document.querySelector(".iValue")==null){
        iValue = document.createElement("input")
        iValue.type="hidden"
        iValue.classList.add("iValue")
    }else{
        iValue = document.querySelector(".iValue")
    }
    iValue.value = indice
    // console.log("iValue.value dans afficheNPoissons", iValue.value)
    const ancreIndice = document.getElementById("indice")
    ancreIndice.appendChild(iValue);

    for (let i in jsonDatas) {
        if (((indice + i)==jsonDatas.length) || (i==x)) {  //attention, ne fonctionne pas avec 3 égal, laisser avec 2 pour jsonDatas.length.
            break;
        }
        // console.log("indice json souhaite dans afficheNpoissons : ", parseInt(indice + i))
        let jsonPoisson = jsonDatas[parseInt(indice) + parseInt(i)]; //parseInt permet de conserver en tant qu'entier
        affichePoisson(jsonPoisson);
        console.log("passage dans boucle jsonDatas")
    }

    //création d'un menu avec boutons pages suiv / pages prec adapté en fonction de où on en est
    if (document.querySelector(".menuPages") != null) {
        document.querySelector(".menuPages").remove();
    }
    const pagesSuivPrec = document.createElement('div')
    pagesSuivPrec.className = "menuPages";

    //si il y a des pages précédentes à afficher, création du bouton pages Prec :
    if (indice !== 0) {
        const pagesPrec = document.createElement('button')
        pagesPrec.className = "indicPagePrec"
        pagesPrec.classList.add("pagesButton")
        pagesPrec.innerHTML = "page precedente";
        pagesSuivPrec.appendChild(pagesPrec);
    }

    //si il y a des pages suivantes à afficher, création du bouton pages Suiv :
    if (indice < (jsonDatas.length - x)) {
        const pagesSuiv = document.createElement('button')
        pagesSuiv.className = "indicPageSuiv "
        pagesSuiv.classList.add("pagesButton");
        pagesSuiv.innerHTML = "page suivante";
        pagesSuivPrec.appendChild(pagesSuiv);
    }

    const ancre = document.querySelector(".feeder");
    ancre.append(pagesSuivPrec);

    // fonctionnalité des boutons pages prec et pages suiv : affiche les pages suiv ou prec
    if (document.querySelector('.indicPagePrec') != null) {
        document.querySelector('.indicPagePrec').onclick = function () {
            //pour ne pas demander un indice du dataJson en-dessous de zero :
            if ((indice - x) >= 0) {
                afficheNPoissons(jsonDatas,parseInt(indice)-parseInt(x));
            } else {
                afficheNPoissons(jsonDatas,  0);
            }
        }
    }
    if (document.querySelector('.indicPageSuiv') != null) {
        document.querySelector('.indicPageSuiv').onclick = function () {
            afficheNPoissons(jsonDatas, parseInt(indice)+parseInt(x));
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

//affiche le menu déroulant au clic sur le bouton hamburger en vanilla JS :
function show() {
    document.getElementById("topdown-menu").classList.replace("hidden", "visible");
}

//affiche le résultat de la recherche au clic sur le picto search en vanilla JS :
function search() {
    const url = "https://www.fishwatch.gov/api/species";
    fetch(url).then(res => res.json()).then(data => {
        let recherche = document.getElementById("search-request").value;
        let trouve = false;
        previousFishDelete()
        for (let json of data) {
            if (json["Species Name"].toLowerCase().includes(recherche.toLowerCase())) {
                affichePoisson(json);
                trouve = true;
                //supprime les éventuels anciens messages d'ereur de recherche
                if(document.querySelector(".search-error")!=null){
                    let previousMsg = document.querySelector(".search-error")
                        previousMsg.remove()
                }
                //affiche un message de succès :
                let succesmsg = document.createElement("span");
                succesmsg.innerHTML = "Résultat de votre recherche :";
                let searchbar = document.getElementById("search-msg");
                succesmsg.className = 'search-error';
                searchbar.appendChild(succesmsg);
            }
        }
        if (trouve == false) {
            let errormsg = document.createElement("span");
            errormsg.innerHTML = "la recherche ne correspond à aucun poisson de notre base de données";
            let searchbar = document.getElementById("search-msg");
            errormsg.className = 'search-error';
            searchbar.appendChild(errormsg);
        }
    });
}

//efface toutes les cartes poissons précédemment affichées
function previousFishDelete() {
    if ((document.getElementById("arrivage-title")) != null) {
        let title = document.getElementById("arrivage-title");
        title.remove();
    }
    if ((document.getElementById("ajax")) != null) {
        let liste = document.getElementById("ajax");
        while (liste.firstChild) {
            liste.removeChild(liste.firstChild);
        }
    }
    //marqueur indiquant qu'aucun poisson venant de l'API est affiché sur la page
    appelApi = false;
}

//créée une carte poisson avec les champs du formulaire "fishAddForm" au clic sur le bouton.
function createFish() {
    // previousFishDelete();
    const json = {
        "Species Name": document.getElementById("name").value,
        "Physical Description": document.getElementById("description").value,
        "Harvest Type": document.getElementById("label").value,
    };
    affichePoisson(json);
}

//vérifie les champs du formulaire "fishAddForm" et renvoie une string avec le message d'erreur.
function validateForm() {
    let msg = "";
    if (document.getElementById("name").value.length == 0) {
        msg += "Le champ Nom du Poisson ne doit pas être vide."
    }
    if (document.getElementById("description").value.length == 0) {
        msg += "Le champ Description du Poisson ne doit pas être vide."
    }
    return msg;
}

//fonction qui retourne la valeur de x (nb poissons par page à afficher) et met cette valeur en placeholder dans l'input
function xUpdate(){
    let x=0;
    const xInput = document.getElementById("nbPPP")
    if (xInput.value!=0){
        x = xInput.value
    }else{
        x = 2
    }
    xInput.placeholder = x;
    // console.log("appel de xUpdate, valeur de x : " , x)
    return x;
}

//fonction qui retourne la valeur de i (indice dans jsondata  du 1er poisson affiché sur la page)
function iUpdate(){
    let i=0;
    if (document.querySelector(".iValue")!=null) {
        const iValue = document.querySelector(".iValue")
    }
    // console.log("appel de iUpdate, valeur de i : " , i)
    return i;
}