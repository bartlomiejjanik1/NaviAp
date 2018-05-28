
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var  address = streetStr +  ', ' + cityStr;

    $greeting.text('Więc, chcesz mieszkać w ' + address + '?');
    
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address + '';
    $body.append('<img class ="bgimg" src=" ' + streetviewUrl + '">');

    // NYTimes AJAX request goes here

    $.getJSON();


    return false;
};

$('#form-container').submit(loadData);
