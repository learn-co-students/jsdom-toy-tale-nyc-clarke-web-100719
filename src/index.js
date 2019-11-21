let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{

  const addToyForm = document.querySelector("div.container form.add-toy-form")
  addToyForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    let form = event.target;
    addToyEle(form.name.value,form.image.value);  
    console.log("past toyele");
  })

  const toyCollectionList = document.querySelector("#toy-collection");
  let tURL = 'http://localhost:3000/toys';

  fetch(tURL)
    .then(resp => resp.json())
    .then(json => renderToys(json));

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
  });

function addToyEle(name, img){
  let toyConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: name,
      image: img,
      likes: 0
    })
  };
fetch(tURL, toyConfig)
  .then(resp => resp.json())
  .then(json => appendToy(json));
}

function appendToy(toy){
  makeToyCard(toy);
}

function makeToyCard(toy){
  let toyHTML = ` 
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar"/>
    <p><span>${toy.likes}</span> Likes</p>
    <button class="like-btn">Like <3</button>
   `;
  let toyElement = document.createElement('div');
  toyElement.className = "card";
  toyElement.dataset.id = toy.id;

  toyElement.innerHTML = toyHTML;

  toyCollectionList.appendChild(toyElement);
}

function renderToys(json){  
  json.forEach( function(toy){
    makeToyCard(toy);
  });


}


document.addEventListener('click', (event)=>{
  if (event.target.className === "like-btn"){
    addLike(event.target.parentNode);
  }
})

function addLike(toy){
  let likeCount = parseInt(toy.querySelector("p span").innerText);
  let stURL = `${tURL}/${toy.dataset.toyID}`
 
  

  let toyConfig = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: likeCount+1
    })
  };
fetch(stURL, toyConfig)
  .then(resp => resp.json())
  .then(json => updateToyLikes(json));
}

function updateToyLikes(toy){
  let toyCardLikes = document.querySelector(`div[data-id="${toy.id}"] p span`);
  toyCardLikes.innerText = toy.likes;
}


})
