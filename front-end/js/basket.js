function displayBasket() {
    // Récupère (ou non) le panier dans le localStorage  
    let basket = JSON.parse(localStorage.getItem("monPanier"));
    // console.log(basket)
    let msgPanier = document.getElementById('basket__content')
    let totalPrice = null;
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
                '</td>'
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


    // let response = await fetch('http://localhost:3000/api/teddies/order', {
    //     method: "POST",
    //     body: JSON.stringify({contact, products}),
    //     headers: { "Content-type": "application/json; charset=UTF-8" }
    // })
    // .then(function (res) {
    //     return res
    // })
    
    // const recup = function recupRep(response){
    //     return response
    // }

    // console.log(recup)
        // .then(response => response.json())
        // .then(response => console.log(response))
        // .catch (err => console.log(err));

    

//     async function postApi(contact, products) {

//         const  reponse = await fetch('http://localhost:3000/api/teddies/order', {
//             method: "POST",
//             body: JSON.stringify({ contact, products }),
//             headers: { "Content-type": "application/json; charset=UTF-8" }
//         })
//             .then(response =>  response.json())
//             .then(function (json) {
//                 return json
//             })     
//             .catch(err => console.log(err));
//             return reponse

//     }

//    a= postApi(contact, products)
//    console.log(a)

    // const postAPI =  (contact, products) => {
    //     const response =  fetch("http://localhost:3000/api/teddies/order", {
    //         method: "POST",
    //         body: JSON.stringify({ contact, products }),
    //         headers: {
    //             "Content-Type": "application/json;charset=UTF-8",
    //         }

    //     })

    //         .then(response => response.json())
    //         .then(function (json) {
    //             return json
    //         })
    //         .catch(err => console.log(err));


    //     orderId = response.orderId  ;
    //     return orderId
    //     //return response.json();
    // };

    // result = postAPI(contact, products)
    // console.log(result)
      

    // const retour = async (postApi(contact, products));
    // console.log(retour)

    // Requête HTTP 
    // fetch('http://localhost:3000/api/teddies/order', {
    //     method: "POST",
    //     header: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({contact, products})
    // })
    // .then(function(res) {
    //     if (res.ok) {
    //         return res.json();
    //     }
    // })
    // .catch(function (error){
    //     console.log('Une erreur est produite')
    // })

    // postApi(contact, products);

    //  async function postApi(contact, products) {
    //      console.log('etape1');
    //      const response = resApi(contact, products);
    //      console.log('etape3')
    //      console.log(response);
    //  }

    //  function resApi(contact, products) {
    //      console.log('etape2');
    //      return fetch('http://localhost:3000/api/teddies/order', {
    //             method: "POST",
    //             header: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({contact, products})
    //         }).then(function (res) {
    //             return res.json()
    //         })

    //  }



    // const postAPI = async (contact, products) => {
    //     console.log('coucou')
    //     const response = await fetch("http://localhost:3000/api/teddies/order", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ contact, products }),
    //     });

    //     console.log(response);
    //     return response.json();

    // };




    // Effaçons le panier vu que la commande est passée
    // localStorage.removeItem('monPanier');
    // Ouverture de la page de confirmation
    // location.replace("confirmation.html")

    

    async function recup(contact, products) {
        const order = await getProducts(contact, products)
        console.log(order.orderId)
    }
    
    
    function getProducts(contact, products) {
        return fetch('http://localhost:3000/api/teddies/order',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ contact, products })
        })
            .then(function (res) {
                return res.json()
            })
            .then(function (toto) {
                return toto
            })
            .catch(function (error) {
                alert(error)
            })
    }
    
    recup(contact, products);

   
}

