window.addEventListener("DOMContentLoaded", (event) => {

    let tableauImages = [
        "/images/poisson1.jpg",
        "/images/poisson4.jpg",
        "/images/poisson5.jpg",
        "/images/poisson6.jpg",
        "/images/poisson7.jpg",
        "/images/poisson8.jpg",
    ];

    afficheMosaic(tableauImages)

    const pictoMosaic = document.getElementById("displayMosaic")
    pictoMosaic.addEventListener('click', function() {
        afficheMosaic(tableauImages)
    })
    pictoMosaic.addEventListener('mouseenter', function() {
        pictoMosaic.style.backgroundColor = "white";
    })
    pictoMosaic.addEventListener('mouseleave', function() {
        pictoMosaic.style.backgroundColor = "cadetblue";
    })

    const pictoListe = document.getElementById("displayList")
    pictoListe.addEventListener('click', function() {
        afficheList(tableauImages)
    })
    pictoListe.addEventListener('mouseenter', function() {
        pictoListe.style.backgroundColor = "white";
    })
    pictoListe.addEventListener('mouseleave', function() {
        pictoListe.style.backgroundColor = "cadetblue";
    })

    const pictoAdd = document.getElementById("newImage")
    pictoAdd.addEventListener('change', function() {
        const reader = new FileReader();
        console.log(reader)
        reader.addEventListener("load", () => {
            const uploaded_image = reader.result;
            //créer une balise <img>, avec comme attribut src = uploaded_image
            //ou fonction ci-dessous:
            tableauImages.push(uploaded_image)
            if (document.querySelector(".blocList") != null) {
                afficheList(tableauImages)
            }
           if (document.querySelector(".blocMosaic") != null) {
               afficheMosaic(tableauImages)
            }
        });
        reader.readAsDataURL(this.files[0])
    });

});





