main()

async function main() {
    const products = await getProducts()
    for (let product of products) {
        displayProducts(product)
    }


}

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

function displayProducts(product) {
    document.getElementById('listTeddies').innerHTML +=

        '<article class="teddy__card col-md-4 p-2 rounded mb-3">'+
            '<img src="'+ product.imageUrl + '" class="teddy__img rounded h-75">'+
            '<div class="h-25 teddy__info mb-3">'+
                '<h4 class="teddy__name h-50 m-0">' + product.name + '</h2>'+
                '<p class="h-10 m-0">' + product.price + ' €</p>'+
                '<a href="pages/product.html?id=' + product._id + '"class="h-10 m-0">Voir produit</a>'+
            '</div>'
        '</article>'
}



