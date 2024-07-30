
$(document).ready(function() {
    // Запрос к API для получения списка стран
    $.ajax({
        url: "https://restcountries.com/v3.1/all",
        dataType: "json",
        success: function(data) {
            // Обработка успешного запроса
            let countries = data;
            let countriesList = $("#countries-list");
            let searchInput = $("#search-input");
            let searchResults = $("#search-results");

            // Функция для фильтрации стран по имени
            function filterCountries(query) {
                let filteredCountries = countries.filter(function(country) {
                    return country.name.common.toLowerCase().includes(query.toLowerCase());
                });
                return filteredCountries;
            }

            // Обработка ввода в поисковую строку
            searchInput.on("input", function() {
                let query = $(this).val();
                let filteredCountries = filterCountries(query);
                searchResults.empty();

                if (filteredCountries.length > 0) {
                    filteredCountries.forEach(function(country) {
                        let countryItem = $("<div>").addClass("country-item").text(country.name.common);
                        countryItem.click(function() {
                            // Обработка клика по стране
                            showCountryDetails(country);
                        });
                        searchResults.append(countryItem);
                    });
                } else {
                    searchResults.text("Ничего не найдено");
                }
            });

            // Отображение всех стран
            countries.forEach(function(country) {
                let countryItem = $("<div>").addClass("country-item").text(country.name.common);
                countryItem.click(function() {
                    // Обработка клика по стране
                    showCountryDetails(country);
                });
                countriesList.append(countryItem);
            });
        },
        error: function() {
            // Обработка ошибки запроса
            alert("Ошибка при загрузке списка стран");
        }
    });

    // Функция для отображения подробной информации о стране
    function showCountryDetails(country) {
        let countryDetails = $("#country-details");
        countryDetails.empty();
        let countryName = $("<h2>").text(country.name.common);
        let countryCapital = $("<p>").text("Capital: " + country.capital[0]);
        let countryFlag = $("<img>").attr("src", country.flags.png);
        countryDetails.append(countryName, countryCapital, countryFlag);
    }
});
