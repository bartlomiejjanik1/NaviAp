
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
    var address = streetStr +  ', ' + cityStr;

    $greeting.text('Więc, chcesz mieszkać w ' + address + '?');
    
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address + '';
    $body.append('<img class ="bgimg" src=" ' + streetviewUrl + '">');

    // NYTimes AJAX request goes here
    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + 
    '&sort=newest&api-key=c8ef194d8f1147caabfaf8dcdc8f40ec';
        
        
    $.getJSON(nytimesUrl, function (data) {
        
        $nytHeaderElem.text('New York Times Articles About ' + cityStr);
        //zbieramy z odpowiedzi artykuły i wrzucamy je do obiektu articles, który pozniej iterujemy i wrzucamy metoda .append na storne w liscie <li>
        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' + '<a href=" '+article.web_url+'">'+article.headline.main+ '</a>'+
                                    '<p>' + article.snippet + '</p>'+ '</li>');
        };
            //Teraz dorabiamy obśługe błędu, dodajemy .error (chaining metods) do metody getJson error function()
            //Odpali się .error jesli cos pójdzie nie tak z funkcji getJson
    }).error(function(e){
            $nytHeaderElem.text('Cos poszlo nie tak. Nie mozna zaladować storny - obsluga bledu działa');
    });
    return false;
};
    //Wikipedia AJAX, zapytanie do wikipedi o wpisywane miasto
    var wikiUrl= 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + ' &format=json&callback=wikiCallback';
    //jQuery ajax funkcja
    $.ajax({
        //do klucza url wrzucamy zmienną wikiUrl
        url: wikiUrl,
        //jsonp: "callback",
        dataType: "jsonp",
        //teraz funkcja succes, jesli wikipedia zwroci prawidłowo dane to funkcja odpowienio je przetworzy
        success: function (response) {
            var articleList = response[1];
            
            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href=" ' + url + '">'+ 
                articleStr + '</a></li>');
            };

        }
    });

$('#form-container').submit(loadData);
