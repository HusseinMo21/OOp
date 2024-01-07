
var li=document.querySelectorAll(".menu li")
var home=document.querySelector("#home")
var detailsection=document.querySelector(".details")

for (let x = 0; x < li.length; x++) {
  li[x].addEventListener("click",(e)=>{
    Apis(e.target.getAttribute("data-set"))
  })
  
}





function displayGames(list){
    let cartona=``
    for (let i = 0; i < list.length; i++) {
        cartona+=`  <div class="cards col-md-3">
        <span class="d-none">${list[i].id}</span>
        <div class="card-new p-2">
          <div class="card-image p-3">
            <img src="${list[i].thumbnail}"  data-id="${list[i].id}" class="w-100" alt="">
          </div>
          <div class="card-body d-flex justify-content-between">
            <h5 class="card-title card-text">${list[i].title}</h5>
            <a href="${list[i].game_url}" target="_blank"><button class="btn btn-primary">Free</button></a>
            
          </div>
          <div class="card-content">
            <p class="card-text p-3">${list[i].short_description}</p>
          </div>
          
<div class="card-footer d-flex justify-content-between">
<small class="box-1">${list[i].genre}</small>
<small class="box-2">${list[i].platform}</small>
</div>
        </div>
      </div>`
        
    }
    document.querySelector("#Mydata").innerHTML=cartona;
    
    var cards=document.querySelectorAll(".card-new")
   

   for (let i = 0; i < cards.length; i++) {
   cards[i].addEventListener("click",(e)=>{
  detailsApi(e.target.getAttribute("data-id"))
    home.classList.replace("d-block","d-none")
    detailsection.classList.remove("d-none")

})

}

}

  function displayDetails(data) {
     const content = `
     <div class="col-md-4">
     <img src="${data.thumbnail}" class="w-100" alt="image details" />
  </div>
  <div class="col-md-8">
     <h3>Title: ${data.title}</h3>
     <p>Category: <span class="badge text-bg-info"> ${data.genre}</span> </p>
     <p>Platform: <span class="badge text-bg-info"> ${data.platform}</span> </p>
     <p>Status: <span class="badge text-bg-info"> ${data.status}</span> </p>
     <p class="small">${data.description}</p>
     <a class="btn btn-outline-warning" target="_blank" href="${data.game_url}">Show Game</a>
  </div>
     
     `;

     document.getElementById("detailsContent").innerHTML = content;
     var closeBtn=document.querySelector("#btnClose")
     closeBtn.addEventListener("click",()=>{
      home.classList.replace("d-none","d-block")
      detailsection.classList.add("d-none")
     })
  }

async function Apis(cate){
    const loader = document.querySelector(".loader");
    loader.classList.remove("d-none");
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '59ce7549f1msh1bf76645d09c620p17b35fjsnc0704afee4f9',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    }
   const apiHere = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${cate}`,options)
   const res = await apiHere.json()
   displayGames(res)
   loader.classList.add("d-none");
  console.log(res)

};
Apis("mmorpg")



async function detailsApi(id){
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '59ce7549f1msh1bf76645d09c620p17b35fjsnc0704afee4f9',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };
  const DetApi = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,options)
  const DetRes = await DetApi.json()
  displayDetails(DetRes)
}
detailsApi()


