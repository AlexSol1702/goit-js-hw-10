 const MAIN_URL = 'https://restcountries.com/v3.1/name/'
 
 export function fetchCountries(data) {
    return fetch(`${MAIN_URL}${data}?fields=name,capital,population,flags,languages`)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText)}
            return response.json()})
            }  