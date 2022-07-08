const URL = 'https://restcountries.com/v3.1/name/';
const filter = '?field=name,capital,population,flags,languages'

export default function fetchCountries(name) {
    fetch(`${URL}${name}${filter}`).then(responce => responce.json())
}