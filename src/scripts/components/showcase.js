const endpoint = 'http://henriquemelanda.com.br/api-net/products.json';
const ulShowcase = document.querySelector('[data-js="showCase"] ul');

let prodData = [];
let installmentPrice;



function viewAll(){
    fetch(endpoint)
        .then(function(response){
            response.json().then(function(data){
                prodData = data.products;
                const viewProduct = prodData.map(function(prod){
                    if(!prod.installments){
                        return `
                            <li>
                                <figure class="showcase-image">
                                    <img src="../images/${prod.id}.jpg" alt="${prod.title}">
                                    <div class="showcase-purchase">
                                        comprar
                                    </div>
                                </figure>
                                <h2 class="showcase-title">${prod.title}</h2>
                                <div class="showcase-prices">
                                    <div class="por"><span class="different-price">r$</span>${parseFloat(prod.price).toFixed(2).replace('.',',')}</div>                                    
                                </div>
                                <div class="showcase-purchase-mobile">
                                    comprar
                                </div>
                            </li>
                        `
                    }else{
                        return `
                            <li>
                                <figure class="showcase-image">
                                    <img src="../images/${prod.id}.jpg" alt="${prod.title}">
                                    <div class="showcase-purchase">
                                        comprar
                                    </div>
                                </figure>
                                <h2 class="showcase-title">${prod.title}</h2>
                                <div class="showcase-prices">
                                    <div class="por"><span class="different-price">r$</span>${parseFloat(prod.price).toFixed(2).replace('.',',')}</div>
                                    <div style="display:none;">${installmentPrice = prod.price / prod.installments}</div>
                                    <div class="installment">ou ${prod.installments} x <span class="different-installment">R$ ${parseFloat(installmentPrice).toFixed(2).replace('.',',')}</span></div>
                                </div>
                                <div class="showcase-purchase-mobile">
                                    comprar
                                </div>
                            </li>
                        `
                    }
                }).join('');

                ulShowcase.innerHTML = viewProduct;
            });
        })

}

viewAll();