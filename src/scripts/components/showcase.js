const endpoint = 'http://henriquemelanda.com.br/api-net/products.json';
const ulShowcase = document.querySelector('[data-js="showCase"] ul');
const itemsBag = document.querySelector('[data-js="items-bag"]');

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
                                    <div class="showcase-purchase" data-js="purchase" data-id="${prod.id}" data-title="${prod.title}" data-price="${prod.price}">
                                        comprar
                                    </div>
                                </figure>
                                <h2 class="showcase-title">${prod.title}</h2>
                                <div class="showcase-prices">
                                    <div class="por"><span class="different-price">r$</span>${parseFloat(prod.price).toFixed(2).replace('.',',')}</div>                                    
                                </div>
                                <div class="showcase-purchase-mobile" data-js="purchase" data-id="${prod.id}" data-title="${data.title}" data-price="${data.price}">
                                    comprar
                                </div>
                            </li>
                        `
                    }else{
                        return `
                            <li>
                                <figure class="showcase-image">
                                    <img src="../images/${prod.id}.jpg" alt="${prod.title}">
                                    <div class="showcase-purchase"  data-js="purchase" data-id="${prod.id}" data-title="${prod.title}" data-price="${prod.price}">
                                        comprar
                                    </div>
                                </figure>
                                <h2 class="showcase-title">${prod.title}</h2>
                                <div class="showcase-prices">
                                    <div class="por"><span class="different-price">r$</span>${parseFloat(prod.price).toFixed(2).replace('.',',')}</div>
                                    <div style="display:none;">${installmentPrice = prod.price / prod.installments}</div>
                                    <div class="installment">ou ${prod.installments} x <span class="different-installment">R$ ${parseFloat(installmentPrice).toFixed(2).replace('.',',')}</span></div>
                                </div>
                                <div class="showcase-purchase-mobile" data-js="purchase" data-id="${prod.id}" data-title="${prod.title}" data-price="${prod.price}">
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
function viewBag(){

    let numberBag = document.querySelector('[data-js="item-bag"]');
    let totalBag = document.querySelector('[data-js="totalBag"]');
    let priceInstallment = document.querySelector('[data-js="priceInstallment"]');
    let totalFinish = parseFloat(totalBag.textContent) + parseFloat(this.getAttribute('data-price'));

    numberBag.innerHTML = parseInt(numberBag.textContent) + 1;
    totalBag.innerHTML = totalFinish.toFixed(2).replace('.',',');
    priceInstallment.innerHTML = parseFloat(totalFinish / 10).toFixed(2).replace('.',',');

    let itemHtml = `
        <div class="bag-items">
			<div class="bag-items-image">
				<img src="../images/${this.getAttribute('data-id')}.jpg" alt="">
			</div>
			<div class="bag-items-text">
				<div class="bag-items-title">${this.getAttribute('data-title')}</div>
				<div class="bag-items-sku">GGG | Preto e branco</div>
				<div class="bag-items-amount">Quantidade: 1</div>
			</div>
			<div class="bag-items-price">
				R$ ${parseFloat(this.getAttribute('data-price')).toFixed(2).replace('.',',')}
			</div>
			<div class="bag-items-delete" data-id="${this.getAttribute('data-id')}" data-price="${this.getAttribute('data-price')}" >delete</div>
		</div>
    `;

    itemsBag.insertAdjacentHTML('beforeend', itemHtml);
}

viewAll();


setTimeout(function(){
    const btnPurchase = document.querySelectorAll('.showcase-purchase');
    const btnPurchaseMobile = document.querySelectorAll('.showcase-purchase-mobile');
    btnPurchase.forEach(button => button.addEventListener('click', viewBag));
    btnPurchaseMobile.forEach(button => button.addEventListener('click', viewBag));
},500);

