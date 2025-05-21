
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

function createPagination(list, step1){
    let counter = Math.ceil(list.length/step1);
    paginationList.innerHTML = "";
     for (let i = 1; i <= counter; i++){
        getPaginationItem (i)
     }
 
}



export {createPagination}