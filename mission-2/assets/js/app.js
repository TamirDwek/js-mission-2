"use strict";

(() => {
   
    const getData = (url) => {
        return fetch(url).then(response => response.json());
    };

    const generateCountryTable = (countries) => {
        return countries
            .map((country) => {
                const { name, population } = country;
                return `
                    <tr>
                        <td>${name.common}</td>
                        <td>${population.toLocaleString()}</td>
                    </tr>
                `;
            })
            .join("");
    };
    const renderCountryTable = (newHTML) => {
        document.getElementById('countries').innerHTML = newHTML;
    };
    const generateRegionTable = (countries) => {
        const regions = countries.reduce((acc, country) => {
            const region = country.region || "Unknown";
            acc[region] = (acc[region] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(regions)
            .map(([region, count]) => {
                return `
                    <tr>
                        <td>${region}</td>
                        <td>${count}</td>
                    </tr>
                `;
            })
            .join("");
    };
    const renderRegionTable = (newHTML) => {
        document.getElementById("regions").innerHTML = newHTML;
    };

    const generateCurrencyStats = (countries) => {
        const currencies = countries.reduce((acc, country) => {
            const countryCurrencies = country.currencies;
            if (countryCurrencies) {
                Object.keys(countryCurrencies).forEach(currencyCode => {
                    acc[currencyCode] = (acc[currencyCode] || 0) + 1;
                });
            }
            return acc;
        }, {});

        return Object.entries(currencies)
            .map(([currency, count]) => {
                return `
                    <tr>
                        <td>${currency}</td>
                        <td>${count}</td>
                    </tr>
                `;
            })
            .join("");
    };

    const renderCurrencyTable = (newHTML) => {
        document.getElementById("currencies").innerHTML = newHTML;
    };

      const renderStatistics = (countries) => {
        const totalCountries = countries.length;
        const totalPopulation = countries.reduce(
            (sum, country) => sum + country.population,
            0
        );
        const averagePopulation = (totalPopulation / totalCountries).toFixed(2);
        
        const generateStaticsTable = `
        <h2>Statistics</h2> 
            <tr>
                <td>Total Countries:</td>
                <td>${totalCountries}</td>
            </tr>
            <br>
            <tr>
                <td>Total Population:</td>
                <td>${totalPopulation.toLocaleString()}</td>
            </tr>
            <br>
            <tr>
                <td>Average Population:</td>
                <td>${averagePopulation}</td>
            </tr>
            <hr>
        `;
        document.getElementById("statistics").innerHTML = generateStaticsTable;
}
   
    document.getElementById('buttonAll').addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            const data = await getData('https://restcountries.com/v3.1/all');
            const countryTableHTML = generateCountryTable(data);
            const regionTableHTML = generateRegionTable(data);
            const currencyTableHTML = generateCurrencyStats(data);

            renderCountryTable(countryTableHTML);
            renderRegionTable(regionTableHTML);
            renderStatistics(data);
            renderCurrencyTable(currencyTableHTML);

        } catch (error) {
            console.warn(error);
        }
    });
        // present input country 
        document.getElementById('buttonInput').addEventListener('click', async (e) => {
            e.preventDefault();
            const userInput = document.getElementById("userInput").value.trim();
            if (!userInput) return alert("Please enter a country name!");
            try {
                const data = await getData( `https://restcountries.com/v3.1/name/${userInput}`);
                const countryTableHTML = generateCountryTable(data);
                const regionTableHTML = generateRegionTable(data);
                const currencyTableHTML = generateCurrencyStats(data);

                renderCountryTable(countryTableHTML);
                renderRegionTable(regionTableHTML);
                renderStatistics(data);
                renderStatistics(data);

            } catch (error) {
                console.warn(error);
                alert("No countries found ");
            }
    });
})();
