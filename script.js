import ACCESS_TOKEN from "./secret.js";
import { CRYPTO_API_KEY } from "./secret.js"; 
import { NEWS_API } from "./secret.js"

const url = `https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature`

const timePlaceholder = document.getElementById("time");
const temperature_text = document.getElementById("temperature-text")

const high = document.getElementById("high")
const current = document.getElementById("current")
const low=document.getElementById("low")
const bitcoinHolder = document.querySelector(".bitcoinHolder")

const container = document.getElementById("container")
const allURL = []; // array full of url!
const todo = document.getElementById("todo")
const form = document.getElementById("form");
const todoList = document.getElementById("todoList");
const removeAllButton = document.getElementById("remove")
const todoBtn = document.getElementById("todoBtn");
const todoDialog = document.getElementById("todoDialog");
const closeDialog = document.getElementById("closeDialog");
let id =0;

const globalCheckBoxState ={};

// Dialog functionality
todoBtn.addEventListener("click", () => {
    todoDialog.showModal();
});

closeDialog.addEventListener("click", () => {
    todoDialog.close();
});

todoDialog.addEventListener("click", (e) => {
    if (e.target === todoDialog) {
        todoDialog.close();
    }
});

let latitude;
let longitude;
let currentTemperature;
let description;
let time;


function displayTemperature(currentTemperature){
    temperature_text.innerText = `${Math.round(currentTemperature)}°C`
    temperature_text.style.fontWeight="bold";
    temperature_text.style.fontSize="20px"
}

async function fetchWheatherData(){
  // this callback makes sure that the callback function runs only when we receive the position # position takes some time to occur !
   const watchID = navigator.geolocation.getCurrentPosition(async(position) => {
        latitude = position.coords.latitude;
        longitude =  position.coords.longitude;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${ACCESS_TOKEN}&units=metric`)
        const data  = await response.json() // only getting the body 
        console.log(data);
        currentTemperature = data.main.temp;
        description=data.weather[0].description;
        displayTemperature(currentTemperature);
  });
  
}

fetchWheatherData()
setInterval(fetchWheatherData,1800000) // update every 30 minutes (1800000ms)

// Update every 1 second (1000ms) to ensure the minute flip is accurate
setInterval(getTime, 1000);
getTime(); // Call (for first time/loading)

function getTime(){
  const currentTime = new Date(); // creating a new date object in js !
  const hour = currentTime.getHours();
  const minutes = currentTime.getMinutes().toString().padStart(2, '0'); // Adds the leading zero
  time = `${hour}:${minutes}`
  timePlaceholder.innerText=`${time}`
}

async function getCryptoData(){
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&order=market_cap_desc&per_page=1&page=1&sparkline=false`)
    const data = await response.json(); 
    console.log("Crypto Data:", data);
    bitcoinHolder.style.height = "30px"
    bitcoinHolder.style.width="30px"
    bitcoinHolder.style.borderStyle = "none"
    bitcoinHolder.src=data[0].image
    high.innerText=`📈 $ ${data[0]["high_24h"]}`
    current.innerText=`🎯 $ ${data[0]["current_price"]} `
    low.innerText=`📉 $ ${data[0]["low_24h"]}`
  } catch (error) {
    console.error("Error fetching crypto data:", error);
  }
}

getCryptoData()

setInterval(getCryptoData,3600000); // Update every 1 hour)

form.addEventListener('submit', (event) => {
    event.preventDefault();
    additem();
});

removeAllButton.addEventListener("click",(event)=>{
     const all = Array.from(todoList.children);
    for(let i of all){
        i.remove()
    }
    id=0;
})

function checkBoxAction(event){
    
    const temp = event.currentTarget;
    const parent = temp.parentElement;
    const val = globalCheckBoxState[parent.id]
    globalCheckBoxState[parent.id] = !val;
    if(globalCheckBoxState[parent.id]){
        parent.querySelector("span").classList.add("checkBoxClicked")
    }
    else{
         parent.querySelector("span").classList.remove("checkBoxClicked")
    }
}

function  crossButtonAction(event){
    const parent = event.currentTarget.parentElement;
    parent.remove();
}

function additem(event){
    const value = document.getElementById("input").value.trim();
    
    // Don't add if empty
    if (!value) return;
    
    id+=1;
    const item = document.createElement("div");
    const checkBox = document.createElement("input");
    const crossButton = document.createElement("button")
    const text = document.createElement("span")

    checkBox.addEventListener("click",(event)=>{
        checkBoxAction(event);
    })

    crossButton.addEventListener('click',(event)=>{
        crossButtonAction(event);
    })

    text.innerText=`${value}`
    crossButton.innerText="X"
    crossButton.className="crossButton"
    checkBox.type= 'checkbox';
    item.append(checkBox);
    item.append(text)
    item.append(crossButton)
    item.className="todoListItem"
    item.id=`todo${id}`
    todoList.append(item);
    globalCheckBoxState[id]=false;
    document.getElementById("input").value = "";
}

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    additem(event)
})


function respondtoClick(event){
    let requiredID = event.currentTarget.id
    window.location.href=`${allURL[requiredID]}`
}

async function fetchNewsdata(){
    const response = await fetch(` https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API}`)
    const data = await response.json() // getting only the body!
    console.log(data)
    let articles = data.articles;
    const HTMLnewsArray = articles.map((element,index)=>{
        const temp = document.createElement('div')
        const imageContainer = document.createElement("img")
        const header = document.createElement("h3")
        imageContainer.className="newsImage"
        header.className="newsHeader"
        allURL.push(element.url)
        imageContainer.src=element.urlToImage;
        header.innerText=element.title; 
        temp.className="template";
        temp.id=index;
        temp.append(imageContainer);
        temp.append(header);
        temp.addEventListener("click", (event)=>{
            respondtoClick(event);
        })
        container.append(temp);
    })
}
fetchNewsdata();

// Note:
// for time use SetInterval instead of setTimeout for repeadly calling the fucntion!
// naviogator.geolocation new watcher issue for each setInterval call!
// fix moved from watchpostion to setcurrentposition.