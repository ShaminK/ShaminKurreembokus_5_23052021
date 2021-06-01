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
        document.getElementById('product__color').innerHTML += color + " ";
    }
}


function addProduct(product) {
    let tableProduct = [product.colors, product._id, product.name, product.price, product.imageUrl, product.description]
    console.log(tableProduct)
    let basket = JSON.parse(localStorage.getItem("monPanier"));
    if (basket) {
        console.log('Vrai')
        basket.push(tableProduct);
        localStorage.setItem("monPanier", JSON.stringify(basket));
        alert('nouveau produit ajouté');
    } else {
        console.log('Faux')
        let basket = [];
        basket.push(tableProduct);
        localStorage.setItem("monPanier", JSON.stringify(basket));
        alert('produit ajouté');
    }
}