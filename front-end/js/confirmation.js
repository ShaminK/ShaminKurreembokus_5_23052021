let respondId = JSON.parse(localStorage.getItem("ordreId"))
console.log(respondId)

let orderId = respondId[0]
console.log(orderId)

let orderPrice = respondId[1]
console.log(orderPrice)

function displayConfirmation(){
    document.querySelector('main').innerHTML += `<p>${orderId}</p>
                                                <p>${orderPrice}</p>
                                                <a href="../index.html"> retourner à la page d'Accueil</a>`;
    localStorage.clear();
}
displayConfirmation();

