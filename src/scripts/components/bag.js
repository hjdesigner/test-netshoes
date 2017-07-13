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


btnBag.addEventListener('click', openBag);