import './css/styles.css';
import Notiflix from 'notiflix';
import fetchCountries from './js/fetchCountries';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const URL = 'https://restcountries.com/v3.1/name/';
const filter = '?field=name,capital,population,flags,languages'
const inputCountry = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
let nameOfCountry = '';

inputCountry.addEventListener('keyup',
    debounce((e) => {
        nameOfCountry = e.target.value.trim();
    
        // if (nameOfCountry.length < 2) {
        //     resetMarkup(countryInfo, countryList);
        //     Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        //     return
        // }

        fetchCountries(nameOfCountry).then(data => {
        if (data.length === 1) {
            resetMarkup(countryInfo, countryList)
            markupInfo(data);
        } if (data.length <= 10) {
            resetMarkup(countryInfo, countryList)
            markupList(data);            
            } else {
            resetMarkup(countryInfo, countryList);
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        }
        })
        .catch(error => {
            console.log(error, 'Oops, there is no country with that name');
            Notiflix.Notify.failure('Oops, there is no country with that name');
            resetMarkup(countryInfo, countryList)
        })

    }, DEBOUNCE_DELAY))




function resetMarkup(info, list) {
    info.innerHTML = '';
    list.innerHTML = '';
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


