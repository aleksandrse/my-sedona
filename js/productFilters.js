import {createCards, productCardList, newCard,minSlice,maxSlice} from "./productCard.js";

// фильтр дешевые, дорогие, популярные
function getSort () {
    const selectSorting = document.querySelector(".select-sorting");

    selectSorting.addEventListener('change',(e)=>{
        
        if(e.target.value === "cheap" ){
            newCard.sort(( a, b )=>{
               return a.price - b.price
            });
            productCardList.innerHTML = "";
            let newCard12 = newCard.slice( minSlice,maxSlice);
            createCards (newCard12);
            
        }
        else if (e.target.value === "expensive" ){
            newCard.sort(( a, b )=>{
               return b.price - a.price
            });
            productCardList.innerHTML = "";
            let newCard12 = newCard.slice( minSlice,maxSlice);
            createCards (newCard12);
            
        }

        else if (e.target.value === "popular" ){
            newCard.sort(( a, b )=>{
               return b.rating - a.rating
            });
            productCardList.innerHTML = "";
            let newCard12 = newCard.slice( minSlice,maxSlice);
            createCards (newCard12);
            
        }

        });
    }

 getSort()

// фильтр по ценовому диапазону

// изменение цены полями ввода
let catalogFilterInput = document.querySelectorAll(".catalog-filter-input"); 
const rangeToggleMin = document.querySelector(".toggle-min");
const rangeToggleMax = document.querySelector(".toggle-max");
let range = document.querySelector(".range");

catalogFilterInput[0].addEventListener("change", ()=>{
    
    if(+catalogFilterInput[0].value > +catalogFilterInput[1].value){
       
        rangeToggleMin.style.left = catalogFilterInput[1].value/10 + "px";
        catalogFilterInput[0].value = catalogFilterInput[1].value;
        
    }
     if(+catalogFilterInput[0].value < 0){
        let ll = +catalogFilterInput[0].value;
        ll = 0;
        catalogFilterInput[0].value = ll
        console.log( ll );
        rangeToggleMin.style.left = catalogFilterInput[0].value/10 + "px";
    }
    else {
        rangeToggleMin.style.left = catalogFilterInput[0].value/10 + "px";
    }
})
catalogFilterInput[1].addEventListener("change", ()=>{
    if(+catalogFilterInput[1].value < +catalogFilterInput[0].value){
        rangeToggleMax.style.left = catalogFilterInput[0].value/10 + "px";
        catalogFilterInput[1].value = catalogFilterInput[0].value;
    }
    else {
        rangeToggleMax.style.left = catalogFilterInput[1].value/10 + "px";
    }
    
})  

   // изменение цены ползунками

   // левый ползунок
   rangeToggleMin.addEventListener("mousedown",function(e){
       e.preventDefault();
       let shiftX = e.clientX - rangeToggleMin.getBoundingClientRect().left
     
       document.addEventListener("mousemove", onMouseMove);
       document.addEventListener("mouseup", onMouseUp);
      
       function onMouseMove (e) {
           //console.log("движение над элементом");
           let newStyleLeft = e.clientX - shiftX - range.getBoundingClientRect().left;
           if( newStyleLeft < 0 ) { 
            newStyleLeft = 0
            };
            let rightEdge = range.offsetWidth - rangeToggleMin.offsetWidth;
           if ( newStyleLeft > rightEdge ) {
            newStyleLeft =  rightEdge ;
           };
           if (newStyleLeft > parseInt(rangeToggleMax.style.left)){
            newStyleLeft = parseInt(rangeToggleMax.style.left) 
           }
           

           rangeToggleMin.style.left = newStyleLeft + "px";
          
           catalogFilterInput[0].value = Math.round(newStyleLeft)*10;

       }
   
      function onMouseUp () {
          document.removeEventListener ("mouseup", onMouseUp);
          document.removeEventListener ("mousemove", onMouseMove);
         
      }
   })


    // правый ползунок
    rangeToggleMax.addEventListener("mousedown",function(e){
        e.preventDefault();
        let shiftX = e.clientX - rangeToggleMax.getBoundingClientRect().left
        
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
       
        function onMouseMove (e) {
            
            let newStyleLeft = e.clientX - shiftX - range.getBoundingClientRect().left;
            if( newStyleLeft < 0 ) { 
             newStyleLeft = 19
             };
             let rightEdge = range.offsetWidth;
            if ( newStyleLeft > rightEdge ) {
             newStyleLeft =  rightEdge - 1;
            };
            if (newStyleLeft < parseInt(rangeToggleMin.style.left)){
                newStyleLeft = parseInt(rangeToggleMin.style.left) ;
               }
            rangeToggleMax.style.left = newStyleLeft + "px";
            catalogFilterInput[1].value = Math.round(newStyleLeft)*10;
        }
    
       function onMouseUp () {
           document.removeEventListener ("mouseup", onMouseUp);
           document.removeEventListener ("mousemove", onMouseMove);
          
       }
    })

