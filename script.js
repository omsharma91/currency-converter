const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown=document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const currfrom = document.querySelector(".from select");
const currto = document.querySelector(".to select");
const msg=document.querySelector(".msg")

for(select of dropdown){
  for(let code in countryList){
    let newOption=document.createElement("option")
    newOption.innerText=code;
    newOption.value=code;
    if (select.name === "from" && code === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && code === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption)
  }
  select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
  });
};

const updateExchangeRate = async () => {
  amount = document.querySelector(".amount input");
  amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amtount.value = "1";
  }
  const URL = `${BASE_URL}/${currfrom.value.toLowerCase()}/${currto.value.toLowerCase()}.json`
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[currto.value.toLowerCase()];

  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${currfrom.value} = ${finalAmount} ${currto.value}`
}


const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click",(evt)=>{
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load",()=>{
  updateExchangeRate();
});


