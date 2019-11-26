const toysUrl = "http://localhost:3000/toys";
let addToy = false
const toysContainer = document.getElementById('toy-collection');


function addToyToContainer(toy) {

  let toyHTML = `
  <div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p><span>${toy.likes}</span> Likes </p>
    <button data-id=${toy.id} class="like-btn"> <3</button>
    <button data-id=${toy.id} class="delete-btn">Delete</button>
  </div>`

  toysContainer.insertAdjacentHTML('beforeend', toyHTML);
}


const formContainer = document.querySelector('div.container');
  formContainer.addEventListener('click', function(event){
    if (event.target.className === "submit") {
      event.preventDefault()
      addNewToy()
    }
  })

toysContainer.addEventListener("click", function(event){
  if (event.target.className === 'like-btn') {
    let span = event.target.closest('.card').querySelector('span');
    updateLikes(event.target.dataset.id, span);
  } else if (event.target.className === "delete-btn") {
    let card = event.target.closest('.card');
    deleteCard(event.target.dataset.id, card);
    
  }
})

function updateLikes(num, span) {
  fetch(toysUrl + `/${num}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: parseInt(span.innerText) + 1
    })
  })
  .then(function(response){
    return response.json()
  })
  .then(function(data){
    span.innerText = parseInt(span.innerText) + 1;
    
  })
}

function deleteCard(num, card) {
  fetch(toysUrl + `/${num}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  .then(function(response){
    return response.json();
  })
  .then(function(object){
    card.remove();
  })
}

  function addNewToy(){
    let name = document.querySelector('input#new-name');
    let image = document.querySelector('input#new-image');

    fetch(toysUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: name.value,
        image: image.value,
        likes: 0
      })
    })
      .then(function(response){
        return response.json()
      })
      .then(function(toy){
        addToyToContainer(toy);
        // updatePage()
      })

  }


function updatePage(){
  toysContainer.innerHTML = ""
fetch(toysUrl)
  .then(function(response){
    return response.json();
  })
  .then(function(toys){
    toys.forEach(function(toy){
      addToyToContainer(toy);
    })
  })
}

document.addEventListener("DOMContentLoaded", ()=>{
  updatePage()
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

})
