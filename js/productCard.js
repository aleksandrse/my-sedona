 import {createPagination} from "./pagination.js";
 import { Card } from "./data.js";

 let step = 4;
let minSlice = 0;
let maxSlice =step ; 
let newCard = Card;



// Отображение карточек товаров 
const productCardList = document.querySelector(".product-card-list");
const productCardItems = document.querySelectorAll(".product-card-item");
const similarCardTemplate = document.querySelector("#cards").content.querySelector(".product-card-item");
const showMoreButton = document.querySelector(".show-more-button"); 
const similarCardFragment = document.createDocumentFragment();

 function createCards (newCard){
  productCardList.innerHTML = "";
   newCard.forEach((card)=>{
      productCardItems.forEach((item)=>item.remove());
      const cardElement = similarCardTemplate.cloneNode(true);
      cardElement.querySelector(".product-card-title").textContent = card.name;
      cardElement.querySelector(".price").textContent = card.price + "Р";
      cardElement.querySelector(".product-card-image").src = "image/katalog/" + card.url;
      cardElement.querySelector(".rating").textContent = card.rating;
      cardElement.querySelector(".product-card-text").textContent = card.typeOfHousing;
      cardElement.querySelector(".product-card-rating-icon").classList.add(card.class);
      similarCardFragment.appendChild(cardElement);
   }) 
   productCardList.appendChild(similarCardFragment); 
 }
 numberProduct(newCard);  
 createCards (newCard);
 createPagination(Card, step);
 showMoreButton.classList.add("visually-hidden");

// фильтрация инфраструктурой (бассейн, парковка, wifi)

let catalogFilterList = document.querySelectorAll(".catalog-filter-list");
let controlInputInfrastructure =  catalogFilterList[0].querySelectorAll(".control-input");
let objInfrastructure = [];

function catalogFilterInfrastructure (arr){
objInfrastructure = [];
controlInputInfrastructure.forEach((item)=>{
if( item.checked ){
  objInfrastructure.push(item.value);
} 
//console.log(objInfrastructure);
});

let arrCheckBox=[];
  if (objInfrastructure.length === 0 ){
  return Card
  }

   Card.forEach((item)=>{
    objInfrastructure.forEach((item1)=>{
      if(item.infrastructure[item1]){
       // console.log(item.infrastructure[item1]);
       arrCheckBox.push(item);
     }
    })
 })
  console.log(arrCheckBox);
  return arrCheckBox
}

// функция bar выводит элементы массива имеющие одинаковые значения
function bar(arr, copies) {
  let res    = [];
  let unique = [];
  mainFor: for (let i = 0; i < arr.length; ++i) {
      for (let elem of unique)
          if (elem === arr[i])
              continue mainFor;
      unique.push(arr[i]);
      let counter = 1;
      for (let j = i + 1; j < arr.length; ++j)
          counter += arr[j] === arr[i];
      if (counter >= copies)
          res.push(arr[i]);
  }
  return res;
}

// Фильтрация радиокнопками (гостиница, мотель, апартаменты)

let controlInputRadio = catalogFilterList[1].querySelectorAll(".control-input");

function filterRadio (arr1){
  let objRadio = [];
controlInputRadio.forEach((item)=>{
if(item.checked){
  let newCardRadio = Card.filter((item1)=>{
  return  item1.typeOfHousing === item.value
  })
  objRadio.push(...newCardRadio)
}
})

return objRadio
}

 

// Фильтрация ценовым диапазоном
let form = document.querySelector(".catalog-filter");
function getFilterPrice (arr) {
  
  let minPriceValue = form.querySelector('input[name="min-price"]').value;
  let maxPriceValue = form.querySelector('input[name="max-price"]').value;

  let filterPrice = arr.filter((item)=>{
    return item.price <= +maxPriceValue &&  item.price >= +minPriceValue;
  });
  return filterPrice
}



// Кнопка применить фильтры 
let filterButton = document.querySelector(".button-apply")

filterButton.addEventListener("click",(e)=>{
  e.preventDefault();
  let filter1 = bar(catalogFilterInfrastructure(Card),objInfrastructure.length);
  console.log(filter1);
  let filter2 = filterRadio(filter1);
  console.log(filter2);
  let filter3 =getFilterPrice(filter2);
  newCard = filter3;
  console.log(filter3);
  let newCard1 = filter3.slice( minSlice,maxSlice);
  createCards(newCard1);
  numberProduct(filter3);
  createPagination (filter3, step);
  if(newCard.length === 0){
    showMoreButton.classList.add("visually-hidden")
  };
});
  
// Кнопка "Сбросить фильтры"
const clearButton = document.querySelector(".button-clear");
clearButton.addEventListener("click",(e)=>{
  e.preventDefault();
  numberProduct(Card);  
 createCards (Card);
 createPagination(Card, step);
})


// Кнопка "загрузить еще"
showMoreButton.addEventListener("click",() =>{
   productCardList.innerHTML = "";
   maxSlice +=step;
   let newCardShow = newCard.slice( minSlice,maxSlice);
   createCards (newCardShow );
   if(maxSlice>=newCard.length){
     showMoreButton.classList.add("visually-hidden")
    } 
 
})



 // выбор количества карточек 4,8,16

 let select = document.querySelector(".namber-cards-select");
 select.addEventListener('change', function (e) {
   productCardList.innerHTML = "";
   let newCardShow = newCard;
   step = +e.target.value;
   maxSlice = minSlice + step;
   newCardShow = newCard.slice( minSlice,maxSlice);
   createCards (newCardShow);
   createPagination (newCard, step);
   if(maxSlice < newCard.length ) {
    showMoreButton.classList.remove("visually-hidden")
   }
});

// показ карточек товаров кнопками 1,2,3,4...

let buttonPaginator = document.querySelector(".pagination-list");

buttonPaginator.addEventListener("click", function(e){
  productCardList.innerHTML = "";
  if( +e.target.textContent !== 1 ){
  if (step === 4){
    maxSlice = +e.target.textContent *4 ;
    minSlice = maxSlice - 4;
    let newCardhow = newCard.slice( minSlice,maxSlice);
    createCards (newCardhow);
   
  }
 if (step === 8){
  maxSlice = +e.target.textContent *8 ;
  minSlice = maxSlice - 8;
  let newCardhow = newCard.slice( minSlice,maxSlice);
  createCards (newCardhow);
    
 }
 if (step === 16){
  maxSlice = +e.target.textContent *16 ;
  minSlice = maxSlice - 16;
  let newCardhow = newCard.slice( minSlice,maxSlice);
  createCards (newCardhow);
   
 }
}
else {
  minSlice = 0;
  maxSlice =step ;
  let newCardhow = newCard.slice( minSlice,maxSlice);
  createCards (newCardhow);
 }

});


// выводит в span число продуктов 

function numberProduct(newCard){
  let numberOfproducts =document.querySelector(".sorting-text span");
numberOfproducts.textContent = newCard.length;
}

export {productCardList};
export {createCards, newCard, minSlice, maxSlice, step}