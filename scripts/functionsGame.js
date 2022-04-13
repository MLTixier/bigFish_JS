//modifie l'ordre des éléments dans le tableau de manière aléatoire
function tableauAleatoire(tableau) {
    const nb = tableau.length
    for (let i = 0; i < nb; i++) {
        let nbAleatoire = Math.floor(Math.random() * nb)
        let nbACopier = tableau[i]
        tableau[i] = tableau[nbAleatoire]
        tableau[nbAleatoire] = nbACopier
    }
    return tableau;
}

//affiche les images d'un tableau en mosaic
function afficheCartes(tableau, compteur, paires) {
    deleteCartes();
    const blocGame = document.createElement("div");
    blocGame.className = "blocGame";
    for (let i in tableau) {
        const blocImage = document.createElement("div");
        blocImage.className = "blocImage";
        blocImage.id = i;
        const image = document.createElement("img");
        image.src = tableau[i];
        let classes = image.classList
        classes.add("displayGameImage")
        image.addEventListener('click', function () {
            let src = image.src
            src = src.replace('http://bigfishjs.local/', '/')
            if (compteur < 2) {
                let result = classes.toggle("displayGameImage")
                if (!result) {
                    compteur += 1
                    paires.push(src)
                }
                if (result) {
                    compteur -= 1
                    for (let i in paires) {
                        if (paires[i] == src) {
                            paires.splice(i, 1)
                        }
                    }
                }
            } else if ((compteur == 2) && (!classes.contains("displayGameImage"))) {
                let result = classes.toggle("displayGameImage")
                compteur -= 1
                for (let i in paires) {
                    if (paires[i] == src) {
                        paires.splice(i, 1)
                    }
                }
            }
        })
        image.addEventListener('dblclick', function () {
            supprimePaires(paires, tableau)
        })
        blocImage.appendChild(image);
        blocGame.appendChild(blocImage);
    }
const ancreImage = document.getElementById("galerieAncre")
ancreImage.appendChild(blocGame);
}

function supprimePaires(tableauPaires, tableau) {
    if ((tableauPaires.length == 2) && (tableauPaires[1] == tableauPaires[0])) {
        for (let i in tableau) {
            if (tableau[i] === tableauPaires[0]) {
                tableau.splice(i, 1)
                console.log(tableau.length)
            }
        }
        tableauPaires = [];
        compteur = 0;
        // console.log("supprimePaires",tableauPaires,tableau,compteur)
        afficheCartes(tableau, compteur, tableauPaires)
    }
}

function deleteCartes() {
    if (document.querySelector('.blocGame') != null) {
        let bloc = document.querySelector('.blocGame')
        bloc.remove()
    }
}