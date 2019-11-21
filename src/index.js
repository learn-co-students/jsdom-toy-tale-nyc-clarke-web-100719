let addToy = false
let toyCollection;
let toyForm, toyActualForm;
let likeBtn;
document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  toyForm = document.querySelector('.container')
  toyCollection = document.getElementById('toy-collection')
  toyActualForm = toyForm.querySelector('form')
  
  toyActualForm.addEventListener('submit', event=>{
    event.preventDefault()  
    let toyname = event.target.querySelector('input[name="name"]').value
    let toyimg = event.target.querySelector('input[name="image"]').value
    createToy(toyname,toyimg);
    toyActualForm.reset()
  })
  fetchToys();
  

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  toyCollection.addEventListener('click',event =>{
    if(event.target.className === "like-btn"){
      increaseLike(event.target);
    }
  })

})

function fetchToys(){
  fetch("http://localhost:3000/toys")
    .then(function(response){return response.json()})
    .then(function(json){
      json.forEach(addToyPage)
      likeBtn = document.querySelector('button.like-btn')})
    .catch(error =>{
      alert('Sorry API no working')
    })
}

function addToyPage(toy){
  toyCollection.innerHTML += `<div class="card" data-id=${toy.id}>
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p> ${toy.likes} like(s)</p>
    <button class="like-btn">Like ❤</button>
  </div>`
}

function createToy(namex,imgx){
  const objConfig = {
    method: "POST",
    headers:{ "Content-Type": "application/json", "Accept": "application/json"},
    body: JSON.stringify({
        name: namex,
        image: imgx,
        likes: 0
    })

  }
  fetch('http://localhost:3000/toys',objConfig)
  .then(function(response){return response.json()})
    .then(function(json){
      addToyPage(json)})
    .catch(error =>{
      alert('Sorry API no working')
    })
}

function increaseLike(clickButton){
  let likesParent = clickButton.parentNode;
  let likes = likesParent.querySelector('p')
  const config = {
    method: "PATCH",
    headers: 
    {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(
      {likes: parseInt(likes.innerText) + 1}
      )
    }
    fetch(`http://localhost:3000/toys/${likesParent.dataset.id}`,config)
    .then(response => response.json())
    .then(json=>{
      likes.innerText = parseInt(likes.innerText) + 1 + " Like(s)"})
    .catch(error =>{
        alert('Sorry API no working')
    })

  }

// POST http://localhost:3000/toys

// body: JSON.stringify({
// })



// {
//   "id": 1,
//   "name": "Woody",
//   "image": "http://www.pngmart.com/files/3/Toy-Story-Woody-PNG-Photos.png",
//   "likes": 5
// }