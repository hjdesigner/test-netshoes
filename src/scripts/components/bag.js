const btnBag = document.querySelector('[data-js="status-bag"]');

function openBag(){
  const bag = document.querySelector('[data-js="bag"]');

  if(bag.classList.contains('bag-active')){
    bag.classList.remove('bag-active');
    bag.classList.add('bag-close');
  }else{
    bag.classList.remove('bag-close');
    bag.classList.add('bag-active');
  }
}

function deleteItem(data_id, data_price){
    
    let numberBag = document.querySelector('[data-js="item-bag"]');    
    numberBag.innerHTML = parseInt(numberBag.textContent) - 1;

    document.querySelectorAll('.bag-items').forEach(function(el, i){
        if(el.getAttribute('data-js') === data_id){
            el.remove();
        }
    });

    resultFinishi();
}

function resultFinishi(){
    let valor = 0;
    let total = 0;
    let totalBag = document.querySelector('[data-js="totalBag"]');
    let priceInstallment = document.querySelector('[data-js="priceInstallment"]');
    let teste = document.querySelector('.bag-items');
    document.querySelectorAll('.bag-items').forEach(function(el, i){
        valor = el.children[2].textContent.replace('R$ ', '').replace(',','.').replace(/^\s+|\s+$/g,"");
        total = total + parseFloat(valor);
        console.log(valor);
        if(total > 0){
            totalBag.innerHTML = total.toFixed(2).replace('.',',');
            priceInstallment.innerHTML = parseFloat(total / 10).toFixed(2).replace('.',',');
        }else{
            totalBag.innerHTML = '0,00';
            priceInstallment.innerHTML = '0,00';
        }
    });
    
}



btnBag.addEventListener('click', openBag);