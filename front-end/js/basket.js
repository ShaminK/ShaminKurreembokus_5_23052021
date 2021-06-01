function displayBasket(){
    let basket = JSON.parse(localStorage.getItem("monPanier"));
    console.log(basket)
    let msgPanier = document.getElementById('basket__content')
    let totalPrice = null;
    if(!basket){
        console.log('vide');
        msgPanier.textContent ='Votre panier est vide' ;
    }else{
        console.log('rempli');
        msgPanier.textContent = 'Contenu de votre panier' ;
        let table = document.getElementById('table__basket');
        table.innerHTML = '<tr>'+
                            '<th></th>'+
                            '<th>Produit</th>'+
                            '<th>Prix</th>'+
                          '</tr>'
        
        for (product of basket){
            
            table.innerHTML += '<tr>'+
                                    '<td><img src="'+product[4]+'" alt="Miniature peluche" width="100" height="100"></td>'+
                                    '<td>'+product[2]+'</td>'+
                                    '<td>'+product[3]+' €</td>'+
                               '</td>'
            totalPrice += product[3];
            console.log(totalPrice);
        }
        
        table.innerHTML += '<tr>'+
                                    '<td></td>'+
                                    '<td>Prix total</td>'+
                                    '<td>'+ totalPrice +' €</td>'+
                               '</td>'
    }
}
