main()

// Fonction général qui récupérer les produits et les affichent
async function main() {
    const products = await getProducts()
    for (let product of products) {
        displayProduct(product)
    }
}

// Fonction qui récupère les données du service web
function getProducts() {
    return fetch('http://localhost:3000/api/teddies')
        .then(function (res) {
            return res.json()
        })
        .then(function (products) {
            return products
        })
        .catch(function (error) {
            alert(error)
        })
}

// Aprés avoir récupèrer les données, insertion dans la page HTML
function displayProduct(product) {
    document.getElementById('listTeddies').innerHTML +=

        '<article class="col-md-4">'+
            '<div class="card text-center mb-4">'+
                '<div class=""><img src="'+ product.imageUrl + '"class="card-img-top card__img"></div>'+
                '<div class="card-body">'+
                    '<h5 class="card-title">' + product.name + '</h5>'+
                    '<p class="card-text">' + product.price + ' €</p>'+
                    '<a href="pages/product.html?id=' + product._id + '"class="text-dark teddy__link"><button class="btn btn__teddy">Voir produit</button></a>'+
                '</div>'+
            '</div>'+
        '</article>'
}



