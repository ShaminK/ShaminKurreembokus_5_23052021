function displayBasket() {
    // Récupère (ou non) le panier du localStorage  
    let basket = JSON.parse(localStorage.getItem("monPanier"));
    // Récupére (ou non) le prix totale du localStorage
    let totalPrice = JSON.parse(localStorage.getItem("prixTotal"))
    
    // console.log(basket)
    // console.log(totalPrice)

    let msgPanier = document.getElementById('basket__content')
    
    if (!basket) {  //Si le panier est inexistant
        // console.log('vide');
        msgPanier.textContent = 'Votre panier est vide';
        let form = document.getElementById('form')
        form.style.display ="none"

    } else {    //Si il y a un panier dans le localStorage
        // console.log('rempli');
        msgPanier.textContent = 'Contenu de votre panier';
        let table = document.getElementById('table__basket');

        // Ligne de titre du tableau
        table.innerHTML = '<thead class="thead-dark"><tr>' +
            '<th></th>' +
            '<th>Produit</th>' +
            '<th>Prix</th>' +
            '</tr></thead>'

        for (product of basket) {   //Parcourt le tableau et crée les lignes du tableau

            table.innerHTML += '<tr>' +
                '<td><img src="' + product['image'] + '" alt="Miniature peluche" width="100" height="100"></td>' +
                '<td>' + product['name'] + '</td>' +
                '<td>' + product['price'] + ' €</td>' +
                '</tr>'
            
        }

        table.innerHTML += '<tr class="table-success">' +
            '<td></td>' +
            '<td class="font-weight-bold">Prix total</td>' +
            '<td class="font-weight-bold">' + totalPrice + ' €</td>' +   //Affiche le prix total
            '</td>'      
    }
}

function deleteOrder(){
    localStorage.clear()
}


// Fonction d'envoie des données vers le service web

function sendForm() {
    if(!document.forms[0].reportValidity()){
        return
    }
    // Récupération du panier du localStorage
    let basket = JSON.parse(localStorage.getItem("monPanier"));
    // console.log(basket)
    // Création du tableau d'Id
    let products = []
    for (id of basket) {
        products.push(id['id'])
    }
    // console.log(products)    //Affiche le tableau des ID



    // Récupération des données entrées dans le formulaire et Création de l'objet Contact
    let contact = {
        "firstName": document.getElementById('firstName').value,
        "lastName": document.getElementById('lastName').value,
        "address": document.getElementById('address').value,
        "city": document.getElementById('city').value,
        "email": document.getElementById('email').value
    }

    // console.log(contact);

    // Fonction générale récuperant la commande et redirection vers la page de la commande
    collectOrder(contact, products);
}

async function createOrder(contact, products) {
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
        const order = await createOrder(contact, products)
        // console.log(order) //affiche la réponse de la requete 

        //Récuperation de l'orderId
        const orderId = order.orderId
        // console.log(orderId)

        //Récupération du prix total
        totalPrice = JSON.parse(localStorage.getItem("prixTotal"))
        // console.log(totalPrice);

        //Envoie dans le localStorage
        localStorage.setItem('orderId', JSON.stringify(orderId))

        //Supprime le panier dans le localStorage
        localStorage.removeItem('monPanier')

        //Redirection vers la page de confirmation
        document.location.href="confirmation.html"
        
    } catch (error) {
        console.log(error)
    }
}