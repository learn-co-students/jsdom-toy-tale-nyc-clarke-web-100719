let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
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

  // renders info from db on page 
  const toyCollection = document.querySelector("#toy-collection");
  fetch("http://localhost:3000/toys")
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      data.forEach(function(element) {
        toyCollection.innerHTML += `<div class="card" data-id=${element.id}></div>`;    // instead of using appendChild each time we can just write HTML in backticks to interpolate everything 
        let newElement = document.querySelector(`[data-id = "${element.id}"]`)
        let h2 = document.createElement("h2");
        newElement.appendChild(h2).innerText = `${element.name}`;
        let img = document.createElement("img");
        img.setAttribute("src", `${element.image}`);
        img.setAttribute("class", "toy-avatar");
        newElement.appendChild(img);
        let p = document.createElement("p");
        newElement.appendChild(p).innerText = `${element.likes} Likes`;
        let button = document.createElement("button");
        button.setAttribute("class", "like-btn")
        newElement.appendChild(button).innerText = "Like <3";
      })
    })

    // eventListener for form submit adds a new toy to db and renders new toy on page

    let newToyForm = document.querySelector(".add-toy-form");
    let newToyName = document.getElementsByName("name")[0];
    let newToyImage = document.getElementsByName("image")[0];
    newToyForm.addEventListener("submit", function(event){
    fetch("http://localhost:3000/toys", {
      method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "name": `${newToyName.value}`,
          "image": `${newToyImage.value}`,
          "likes": 0,
        })
    })
  })

  // update db with like button clicks 
  toyCollection.addEventListener("click", function(event) {
    let toyDiv = event.target.closest("div");
    let newCount = parseInt(toyDiv.querySelector("p").innerText) + 1;
  
    fetch(`http://localhost:3000/toys/${toyDiv.dataset.id}`, {
      method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": parseInt(`${newCount}`),
        })
    })
      .then(function() {
        toyDiv.querySelector("p").innerText = `${newCount} Likes`;
      });
  })
      


        
})
