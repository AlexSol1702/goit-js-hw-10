import './css/styles.css';
import _ from "lodash.debounce";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
//import API  from "./fetchCountries";

const DEBOUNCE_DELAY = 300;
let searchCountry = "";

const getEl = selector => document.querySelector(selector);

getEl('#search-box').addEventListener('input', _(getInputValue, DEBOUNCE_DELAY));



function getInputValue(e) {    
    searchCountry = e.target.value;
    if (searchCountry === "" ) {
        getEl(".country-list").innerHTML = '';  

    } else {
       
        return getCountry(searchCountry.trim())
        
    
};


function getCountry(data) {
    fetch(`https://restcountries.com/v3.1/name/${data}?fields=name,capital,population,flags,languages`)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText)}
            return response.json()})
            .then(data => {     
                if (data.length >= 10) {
                    Notify.success("Too many matches found. Please enter a more specific name.");
                }
                if (data.length >= 2 && data.length < 10) {
                    let easyData = data.map(({flags, name})=>{
                        return `<li class = "list-item">
                        <img class="image" src="${flags.svg}" alt="${name.official} ">
                        <p class="discription">${name.official}</p>
                        </li>`
                    }).join('');
                    getEl(".country-list").innerHTML = '';
                    getEl('.country-info').innerHTML = '';
                    drowString(easyData);
                }
                if (data.length < 2) {
                    let fullData = data.map(({name, capital, population, flags, languages})=>{
                        return `<ul class="country">        
                        <li class = "country-item">
                          <img class="country-image" src="${flags.svg}" alt="${name.official} ">
                          <p class="country-discription">${name.official}</p>
                        </li> 
                        <li>Capital: <span class="country-value">${capital}</span></li>
                        <li>Population: <span class="country-value">${population}</span></li>
                        <li>Languages: <span class="country-value">${Object.values(languages)}</span></li>       
                      </ul>`
                    }).join('')
                    getEl(".country-list").innerHTML = '';  
                    drowCountry(fullData);
            }})
            .catch(() => {
                 getEl(".country-list").innerHTML = ''; 
                 getEl('.country-info').innerHTML = '';
                 Notify.failure("Oops, there is no country with that name")})
            }   
    }
    
        
function drowString(markup) {
    getEl('.country-list').insertAdjacentHTML('beforeend', markup)
}

function drowCountry(markup) {
    getEl('.country-info').insertAdjacentHTML('beforeend',markup)
}
