$(document).ready(function(){
    'use strict'
    
    $('#date-to').datepicker({
        altField: $('.date-to'),
        altFieldDateFormat: 'dd.mm.yyyy',
        classes: 'datepicker-date-to',
        minDate: new Date(),
        prevHtml: '<svg class="prev-Button" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 17"><path fill="red" d="M1.05,17a1,1,0,0,1-.67-.27,1,1,0,0,1-.06-1.41L6.63,8.5.27,1.68A1,1,0,0,1,.32.27a1,1,0,0,1,1.41,0L9.37,8.5,1.79,16.68A1,1,0,0,1,1.05,17Z"/></svg>',
        nextHtml: '<svg class="next-Button" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 17"><path fill="red" d="M1.05,17a1,1,0,0,1-.67-.27,1,1,0,0,1-.06-1.41L6.63,8.5.27,1.68A1,1,0,0,1,.32.27a1,1,0,0,1,1.41,0L9.37,8.5,1.79,16.68A1,1,0,0,1,1.05,17Z"/></svg>',
        onSelect: function(formattedDate, date, inst){
            if($('.date-from').hasClass('date-active')) {
                $('.date-to').blur();
                datepicker.update({'minDate': date}); 
                if (date > datepicker.lastSelectedDate) {
                    datepicker.clear();
                    datepicker.selectDate(date)
                }
            }
        },
    });
    
    $('#date-from').datepicker({
        altField: $('.date-from'),
        classes: 'datepicker-date-from',
        minDate: new Date(),
        altFieldDateFormat: 'dd.mm.yyyy',
        prevHtml: '<svg class="prev-Button" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 17"><path fill="red" d="M1.05,17a1,1,0,0,1-.67-.27,1,1,0,0,1-.06-1.41L6.63,8.5.27,1.68A1,1,0,0,1,.32.27a1,1,0,0,1,1.41,0L9.37,8.5,1.79,16.68A1,1,0,0,1,1.05,17Z"/></svg>',
        nextHtml: '<svg class="next-Button" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 17"><path fill="red" d="M1.05,17a1,1,0,0,1-.67-.27,1,1,0,0,1-.06-1.41L6.63,8.5.27,1.68A1,1,0,0,1,.32.27a1,1,0,0,1,1.41,0L9.37,8.5,1.79,16.68A1,1,0,0,1,1.05,17Z"/></svg>',
        onSelect: function(formattedDate, date, inst){
            $('.date-from').addClass('date-active');
            $('.date-from').blur();
        }
    });
    
    var datepicker = $('#date-from').datepicker().data('datepicker');
    var dateTo = $('#date-to').datepicker().data('datepicker');
    
    dateTo.selectDate(new Date());
    
    
    var focusTimer;
    var focusTimer1;
    
    $('.date-from').on('focus', function(){
        clearTimeout(focusTimer);
        $('.datepicker-date-from-container').addClass('active');
        $('.overlay').addClass('popup-active');
        
    });
    
    $('.datepicker-container').on('click', function(e){
        $('.date-from').focus();
    });
    
    $('.date-from').on('blur', function(e){
        focusTimer = setTimeout(function () {
            $('.datepicker-date-from-container').removeClass('active');
            $('.overlay').removeClass('popup-active');
        }, 100);
    });
    
    $('.date-to').on('focus', function(){
        clearTimeout(focusTimer1);
        $('.datepicker-date-to-container').addClass('active');
        $('.overlay').addClass('popup-active');
        
    });
    
    $('.datepicker-container-date-to').on('click', function(e){
        $('.date-to').focus();
    });
    
    $('.date-to').on('blur', function(e){
        focusTimer1 = setTimeout(function () {
            $('.datepicker-date-to-container').removeClass('active');
            $('.overlay').removeClass('popup-active');
        }, 100);
    });
    
    var ticketValue = 0;
    
    var inputLenght = $('.counter-value').length;
    $('.counter-value').each(function(){
        var val = +$(this).val();
        ticketValue += val;
    });
    
    function setTicketValue(ticketValue){
        var value =  (ticketValue == 1) ? 'пассажир' : (ticketValue>1 && ticketValue<5) ? 'пассажира' : 'пассажиров';
        $('.ticket__amount').text(ticketValue + ' ' + value);
    };
    
    setTicketValue(ticketValue);
    
    $('.js-counter-minus').on('click', function (e) {
        e.preventDefault();
        var elemVal = $(this).siblings('input').val() - 1;
        
        if (elemVal == 0 && $(this).siblings('input').hasClass('ticketType1')) {
            $(this).siblings('input').val(1);
        } else if (elemVal < 0) {
            console.log('loool2');
            $(this).siblings('input').val(0);
        } else {
            console.log('loool3');
            $(this).siblings('input').val(elemVal);
            ticketValue -= 1;
            
            setTicketValue(ticketValue);
        }
    });
    
    $('.js-counter-plus').on('click', function (e) {
        e.preventDefault();
        var elemVal = +$(this).siblings('input').val() + 1;
        
        $(this).siblings('input').val(elemVal);
        ticketValue += 1;
        
        setTicketValue(ticketValue);
    });
    
    var ticketType = 'Эконом';
    
    $('.js-ticket-type').on('click', function(){
        $(this).addClass('selected').siblings().removeClass('selected');
        ticketType = $(this).text();
        $('.ticket__type').text(ticketType);
        
    });
    
    $('.js-input-replace').on('click', function(){
        $('.form').toggleClass('replaced');
        
        $('.fast-select').each(function(){
            if($(this).data('direction') == 'from') {
                $(this).data('direction', 'to')
            } else {
                $(this).data('direction', 'from')
            }
        })
    });
    
    $('.ticket').on('click', function(e){
        
        $('.ticket-counter').addClass('active');
        $('.overlay').addClass('popup-active');
    });
    
    $('.js-close-button').on('click', function(e){
        e.stopPropagation();
        $(this).closest('.active').removeClass('active');
        
        $('.date-from').blur();
    });
    
    $('body').on('click', function(e) {
        
        var container = $(".ticket");
        
        if($('.ticket-counter').hasClass('active')){
            
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                $('.ticket-counter').removeClass('active');
                $('.overlay').removeClass('popup-active');
            } 
        }
    });
    
    $('.js-no-ticket').on('click', function(){
        $('.date-from').attr('placeholder', ' - ').val('').removeClass('date-active');
        $('.date-from').blur();
    })
    
    $('.aviaSelesKPD').submit(function(){
        
        if($(this).hasClass('replaced')) { 
            
            var iataEnd      = $.trim($('.city-to').text());
            var iataStart    = $.trim($('.city-from').text());
            
        } else { 
            
            var iataStart  = $.trim($('.city-to').text());
            var iataEnd    = $.trim($('.city-from').text());
        }
        
        if ( iataStart===iataEnd )
        return false;
        var dateStart  = $.trim($('#date-to').val());
        var dateEnd    = $.trim($('.date-from').val());
        var adults     = $.trim($('.ticketType1').val());
        var children   = $.trim($('.ticketType2').val());
        var infants    = $.trim($('.ticketType3').val());
        var trip_class = (ticketType == 'Бизнес') ? 1 : 0;
        
        window.open('http://hydra.aviasales.ru/searches/new?'+
        'origin_iata='+iataStart+'&'+
        'destination_iata='+iataEnd+'&'+
        'adults='+adults+'&'+
        'children='+children+'&'+
        'infants='+infants+'&'+
        'trip_class='+trip_class+'&'+
        'depart_date='+dateStart+'&'+
        ((dateEnd!='') ? 'return_date='+dateEnd : 'oneway=1')+'&'+
        'marker=35544&'+
        'with_request=true','_blank');
        
        return false;
        
        // http://hydra.aviasales.ru/searches/new?origin_iata=MOW&destination_iata=CAS&adults=1&children=1&infants=0&trip_class=0&depart_date=2018-10-01&return_date=2018-10-15&marker=35544&with_request=true
    });
    
    var options = {
        data: [
            {"city": "Одесса", "iata": "ODS", 'country':'Украина'},
            {"city": "Киев", "iata": "IEV", 'country':'Украина'},
            {"city": "Львов", "iata": "LWO", 'country':'Украина'},
            {"city": "Москва", "iata": "MOW", 'country':'Россия'},
            {"city": "Казань", "iata": "KZN", 'country':'Россия'},
            {"city": "Питер", "iata": "LED", 'country':'Россия'},
        ],
        
        getValue: "city",
        
        list: {
            match: {
                enabled: true
            }
        },
        
        template: {
            type: "custom",
            method: function(value, item) {
                return '<div class = "list-country">'+ value  + '<span class="list-country-iate">' +item.iata+ "</span><span class='list-country-name'>" + item.country + "</span></div>";
            }
        }
    };
    
    $('.city-autocomplete').each(function(){
        if($(this).hasClass('city-to-input')) {
            options.list.onSelectItemEvent = function() {
                var value = $(".city-to-input").getSelectedItemData().iata;
                var county = $(".city-to-input").getSelectedItemData().country;
                $(".city-to").text(value);
                $('.country-to').text(county);
            }
        } else {
            options.list.onSelectItemEvent = function() {
                var value = $(".city-from-input").getSelectedItemData().iata;
                var county = $(".city-from-input").getSelectedItemData().country;
                $(".city-from").text('');
                $(".city-from").text(value);
                $('.country-from').text(county);
            }
        }
        $(this).easyAutocomplete(options);
    });
    
    $('.input-container__placeholder').on('click', function(){
        $(this).prev().find('input').focus();
    });
    
    $('.city-autocomplete').on('focus', function(){
        $(this).parent().siblings('.input-container__placeholder').addClass('active');
    });
    
    $('.city-autocomplete').on('blur', function(){
        if($(this).val().trim() == '') {  
            var placeholder =  $(this).parent().siblings('.input-container__placeholder');
            var placeholderText = placeholder.data('placeholder');
            placeholder.removeClass('active');
            placeholder.text(placeholderText);
        } 
    });
    
    $('.fast-select').on('click', 'a', function(e){
        e.preventDefault;
        
        var direction =  $(this).parent().data('direction');
        var cityName = $(this).text();
        var cityIata = $(this).data('iata');
        var countryName =  $(this).data('country');
        
        $('.city-' + direction + '-input ').val(cityName);
        $('.country-' + direction + ' ').addClass('active');
        $('.city-' + direction).text(cityIata);
        $('.country-' + direction + ' ').text(countryName);
        
    })
});