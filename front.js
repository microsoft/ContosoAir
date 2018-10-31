var $ = require('jquery');
require('bootstrap-datepicker');
require('bootstrap-datepicker/dist/css/bootstrap-datepicker3.standalone.css');

require('./scss/main.scss');

$(document).ready(function(){
    var today = $('.datepicker').data('start') || new Date();
    var options = {
        format: 'yyyy-mm-dd',
        startDate: today
    };

    $('.datepicker').datepicker(options);

    $('#dpa').on('changeDate', function(e) {
        var datepicker = $('#dpb').data("datepicker");
        datepicker.setStartDate(e.date);
    });

    $('.block-flights-results input[type="radio"]').change(function(){
        $(this).closest('.block-flights-results').find('.big-blue-radio').removeClass('big-blue-radio--active');
        $(this).closest('.block-flights-results-list-item').find('.big-blue-radio').addClass('big-blue-radio--active');
    })
})


