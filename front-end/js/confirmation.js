//Récuperation de l'id de commande
let orderId = JSON.parse(localStorage.getItem("orderId"))
console.log(orderId)

//Récuperation de le prix total de la commande
let totalPrice = JSON.parse(localStorage.getItem("prixTotal"))
console.log(totalPrice)


function displayConfirmation(){
    if(orderId){
        document.querySelector('main').innerHTML += `<p class=""> Votre numéro de commande est:  <strong>${orderId}</strong></p>
                                                <p>Le montant de votre commande est de:  <strong>${totalPrice}€</strong></p>
                                                <a href="../index.html"><button class="btn btn__teddy mt-5 mb-5"> Retourner à la page d'Accueil</button></a>`;
    localStorage.clear();
    }else{
        // Bloque l'accés à la page de confirmation si le panier est vide en redirigeant vers la page d'accueil
        document.location.href="../index.html"
    }
    
}
displayConfirmation();

