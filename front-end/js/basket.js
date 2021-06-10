let totalPrice = null;
function displayBasket() {
    // Récupère (ou non) le panier dans le localStorage  
    let basket = JSON.parse(localStorage.getItem("monPanier"));
    // console.log(basket)
    let msgPanier = document.getElementById('basket__content')
    
    if (!basket) {  //Si le panier est inexistant
        console.log('vide');
        msgPanier.textContent = 'Votre panier est vide';
    } else {    //Si il y a un panier dans le localStorage
        console.log('rempli');
        msgPanier.textContent = 'Contenu de votre panier';
        let table = document.getElementById('table__basket');

        // Ligne de titre du tableau
        table.innerHTML = '<tr>' +
            '<th></th>' +
            '<th>Produit</th>' +
            '<th>Prix</th>' +
            '</tr>'

        for (product of basket) {   //Parcourt le tableau et crée les lignes du tableau

            table.innerHTML += '<tr>' +
                '<td><img src="' + product[4] + '" alt="Miniature peluche" width="100" height="100"></td>' +
                '<td>' + product[2] + '</td>' +
                '<td>' + product[3] + ' €</td>' +
                '</tr>'
            totalPrice += product[3];   //Incrémente le prix total
            console.log(totalPrice);
        }

        table.innerHTML += '<tr>' +
            '<td></td>' +
            '<td>Prix total</td>' +
            '<td>' + totalPrice + ' €</td>' +   //Affiche le prix total
            '</td>'

        // Création du formulaire 
        let main = document.getElementById('main__content');
        main.innerHTML +=
            '<form>' +

            '<div class="form-group">' +
            '<label for="firstName">Votre prénom: </label>' +
            '<input type="text" name="firstName" id="firstName"  class="form-control" value="nom">' +
            '</div>' +

            '<div class="form-group">' +
            '<label for="lastName">Votre Nom: </label>' +
            '<input type="text" name="lastName" id="lastName" class="form-control"  value="prenom">' +
            '</div>' +

            '<div class="form-group">' +
            '<label for="address">Votre adresse: </label>' +
            '<input type="text" name="address" id="address" class="form-control"  value="adresse">' +
            '</div>' +

            '<div class="form-group">' +
            '<label for="city">Votre ville: </label>' +
            '<input type="text" name="city" id="city" class="form-control"  value="ville">' +
            '</div>' +

            '<div class="form-group">' +
            '<label for="email">Votre e-mail: </label>' +
            '<input type="email" name="email" id="email" class="form-control"  value="mail@mail.fr">' +
            '</div>' +

            '<a class="btn btn-outline-primary" id="btn-confirm" onclick="sendForm()">Confirmer la commande</a>' +

            '</form><br>'

        // Création du bouton de suppréssion du panier
        let btnDelete = document.createElement('button');
        btnDelete.addEventListener('click', function () {
            localStorage.clear();   //function supprimant le contenu du localStorage
        })
        btnDelete.classList.add('btn', 'btn-danger')
        let linkDelete = document.createElement('a');
        linkDelete.setAttribute('href', '../index.html');
        let textDelete = document.createTextNode('Supprimer le panier');
        main.appendChild(btnDelete).appendChild(linkDelete).appendChild(textDelete);
        linkDelete.classList.add('text-white')
       
    }


}




// Fonction d'envoie des données vers le service web

function sendForm() {

    // Récupération du panier
    let basket = JSON.parse(localStorage.getItem("monPanier"));
    console.log(basket)
    // Création du tableau d'Id
    let products = []
    for (id of basket) {
        products.push(id[1])
    }
    console.log(products)    //Affiche le tableau des ID



    // Récupération des données entrées dans le formulaire et Création de l'objet Contact
    let contact = {
        "firstName": document.getElementById('firstName').value,
        "lastName": document.getElementById('lastName').value,
        "address": document.getElementById('address').value,
        "city": document.getElementById('city').value,
        "email": document.getElementById('email').value
    }

    console.log(contact);

    // Fonction générale récuperant la commande et redirection vers la page de la commande
    collectOrder(contact, products);
}

async function getOrder(contact, products) {
    let res = await fetch('http://localhost:3000/api/teddies/order', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ contact, products })
    })
        return res.json()
}

async function collectOrder(contact, products) {
    try {
        const order = await getOrder(contact, products)
        console.log(order) //affiche la réponse de la requete 

        //Récuperation de l'orderId
        const orderId = order.orderId
        console.log(orderId)

        //Récupération du prix total
        console.log(totalPrice);

        //Envoie dans le localStorage
        let orderFin = [orderId, totalPrice]
        localStorage.setItem('ordreId', JSON.stringify(orderFin))

        //Supprime le panier dans le localStorage
        localStorage.removeItem('monPanier')

        //Redirection vers la page de confirmation
        document.location.href="confirmation.html"
        
    } catch (error) {
        console.log(error)
    }


}