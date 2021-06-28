const urlCatch = new URLSearchParams(location.search);
const idProduct = urlCatch.get('id');
// console.log(idProduct); //affiche 5be9c8541c9d440000665243

productPage(idProduct);

async function productPage(idProduct) {

    // -----------1) Récuperation des données-------------------------------
    const product = await loadProduct(idProduct);
    // console.log(product);   //affiche le tableau du produit ciblé

    // ----------- 2) Mise en page ------------------------------------------
    displayProductPage(product);

    // ----------- 3) Bouton d'ajout au panier--------------------------------
    document.getElementById('product__btn').addEventListener('click', function () {
        addProduct(product)
    })

}

function loadProduct(idProduct) {
    const urlProduct = "http://localhost:3000/api/teddies/" + idProduct;
    // console.log(urlProduct);
    return fetch(urlProduct)
        .then(function (res) {
            return res.json()
        })
        .then(function (product) {
            return product
        })
        .catch(function (error) {
            alert(error)
        })
}

function displayProductPage(product) {
    // insertion HTML image
    document.getElementById('product__img').setAttribute("src", product.imageUrl);

    // insertion HTML nom du produit
    document.getElementById('product__name').textContent = product.name;

    // insertion HTML prix
    document.getElementById('product__price').textContent = product.price + " €";

    // insertion HTML description
    document.getElementById('product__description').textContent = product.description;

    // insertion HTML couleurs
    const colors = product.colors;
    // console.log(colors);
    for (color of colors) {
        document.getElementById('color-select').innerHTML += "<option value="+ color +">"+ color +"</option>"
    }
}

//Fonction qui ajoute le produit dans le panier (localStorage)
function addProduct(product) {

    // Création d'un objet enregistrant les données du produit ajouté au panier
    let tableProduct = {
        color : product.colors, 
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
        description: product.description}
    // console.log(tableProduct);
    // console.log(tableProduct['price']);

    //Récupération du panier dans le localStorage
    let basket = JSON.parse(localStorage.getItem("monPanier"));
        if(basket == null){
            basket = []
        }
    
    //Récperation du prix total dans le local storage
    let totalPrice = JSON.parse(localStorage.getItem("prixTotal"));
    if(totalPrice == null){
        totalPrice = 0 ;
    }
    // console.log(totalPrice)
    
    // if (basket) {   //Si le panier existe déjà
        // console.log('Vrai')

        //Ajoute le nouveau produit dans l'objet basket
        basket.push(tableProduct);
        //Renvoie la var basket dans le localStorage
        localStorage.setItem("monPanier", JSON.stringify(basket));

        //Ajoute le prix du produit ajouté au panier au prix total
        totalPrice += tableProduct['price'];
        // console.log(totalPrice)
        //Renvoie le prix total sans le local storage
        localStorage.setItem("prixTotal", totalPrice)
        
        alert('nouveau produit ajouté');   
}