'use strict'

let filterBtn = document.querySelector(".filter-btn");
let filterListItem = document.querySelector(".filter .filter-list-item");

filterBtn.onclick = function(event){
    if(filterListItem.style.display == 'none'){
        filterListItem.style.display = 'block';
    }
    else filterListItem.style.display = 'none';
    }



let body = document.body;

body.onclick = function(event){
    if (!event.target.matches('.filter, .filter *')){
        filterListItem.style.display = "none";
    }
}