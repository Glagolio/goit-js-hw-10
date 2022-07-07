import './css/styles.css';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const URL = 'https://restcountries.com/v3.1/name/';

const inputCountry = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
let nameOfCountry = '';

inputCountry.addEventListener('keyup',
    debounce((e) => {
  
        nameOfCountry = e.target.value.trim();
        nameOfCountry;
        console.log(e)
        console.log(nameOfCountry)
    
        if (nameOfCountry.length < 2) {
            countryInfo.innerHTML = '';
            countryList.innerHTML = '';
            return
        }
        console.log(nameOfCountry)
        fetchCountries(nameOfCountry)

    }, DEBOUNCE_DELAY))

console.dir(inputCountry)

function fetchCountries(name) {
    fetch(`${URL}${name}`).then(responce => responce.json())
        .then(data => {
        if (data.length === 1) {
            countryInfo.innerHTML = '';

            countryList.innerHTML = '';
            markupInfo(data);
        } else {
            countryList.innerHTML = '';

            markupList(data);
            console.log(data);
            countryInfo.innerHTML = '';
            
        }
        })
        .catch(error => {
        console.log('Oops, there is no country with that name');
        countryInfo.innerHTML = '';
        countryList.innerHTML = '';
    })
}

function markupList(countries) {
   const contriesArray = countries.map(country => {
       return  `<li>
            
            <img src=${country.flags.png}>
            <span>${country.name.official}</span>
        </li>`
    });
    contriesArray.forEach(markupCountry => {
        countryList.insertAdjacentHTML('beforeend', markupCountry)
    });

    
}

function markupInfo(countries) {
    country = countries[0];
    console.log(country.languages)
    const info = `<p>${country.name.official}</p>
            <img src=${country.flags.png}> 
            <p>Capital: ${country.capital}<p>
            <p>Population: ${country.population}</p>
            <p>Languages: ${Object.values(country.languages).join(', ')}</p>`
    
        countryInfo.insertAdjacentHTML('beforeend', info)
};


