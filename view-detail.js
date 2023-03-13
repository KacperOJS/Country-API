import { renderCountryDetails } from "./dom-utils.js";

export const renderDetail = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const countryCode = searchParams.get("country");
    if (!countryCode) {
        goBackToDashboard();
    }

    const API_URL_DETAIL = `https://restcountries.com/v3.1/alpha/${countryCode}`;
    fetch(API_URL_DETAIL)
        .then((res) => res.json())
        .then(([country]) => {
            if (!country) {
                goBackToDashboard();
            }
            country = {
                capital: country.capital && country.capital[0],
                population: country.population.toLocaleString(),
                name: country.name.common,
                nativeName: Object.values(country.name.nativeName)[0].official,
                code: country.cioc,
                region: country.region,
                subregion: country.subregion,
                flagUrl: country.flags.png,
                currencies: Object.values(country.currencies)
                    .map((currency) => currency.name)
                    .join(", "),
                languages: Object.values(country.languages).join(", "),
                tld: country.tld[0],
                borders: country.borders,
            };

            renderCountryDetails(country);
        });
};

const goBackToDashboard = () => {
    window.location.href = "/";
};
