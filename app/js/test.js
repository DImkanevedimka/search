var countries = [
    {value: "Одесса", iata: "ODS", country:'Украина'},
    {value: "Киев", iata: "IEV", country:'Украина'},
    {value: "Львов", iata: "LWO", country:'Украина'},
    {value: "Москва", iata: "MOW", country:'Россия'},
    {value: "Казань", iata: "KZN", country:'Россия'},
    {value: "Питер", iata: "LED", country:'Россия'},
];

$('.city-autocomplete').autocomplete({
    serviceUrl: './cities.json',

    onSelect: function (suggestion) {
        $(".city-to").text(suggestion.name);
        $('.country-to').text(suggestion.country);
    },
    
    formatResult: function(suggestion, cur) {
       return  '<div class = "list-country">'+ suggestion.value  + '<span class="list-country-iate">' +suggestion.iata+ "</span><span class='list-country-name'>" + suggestion.country + "</span></div>";
    }
});