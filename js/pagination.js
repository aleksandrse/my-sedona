//import {newCard} from "./productCard.js";


let paginationList = document.querySelector(".pagination-list");
function getPaginationItem (i) {
  
  let paginationItem = document.createElement('li');
  paginationItem.classList.add("pagination-item");
  let paginationLink = document.createElement('a');
  paginationLink.classList.add("pagination-link")
  paginationLink.textContent = i;
  paginationItem.appendChild(paginationLink);
  paginationList.appendChild(paginationItem);
}
//getPaginationItem ();

function createPagination (list, step){
    let counter = Math.ceil(list.length/step);
    paginationList.innerHTML = "";
     for (let i = 1; i <= counter; i++){
        getPaginationItem (i)
     }
 
}



export {createPagination}