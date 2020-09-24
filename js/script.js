$(document).ready(function(){

  var btnSrc = $(".search_btn");
  btnSrc.click(
    function() {
      searchMovie();
      searchTvSeries();
      $(".search_movie").val("");
    }
  );

  $(".search_movie").keydown(
    function(e) {
      if (e.which == 13) {
        searchMovie();
        searchTvSeries();
        $(".search_movie").val("");
      }
    }
  );

});

//funzione aggiunta bandiera
function languageFlag(language) {
  return $(".flag_img").html("<img src='https://www.unknown.nu/flags/images/"+language+"-100'>");
}

//funzione arrotondamento dei voti e aggiunta stelle
function voteMovieMath(voteOfI) {
  var voteFinal = parseInt(Math.ceil(voteOfI / 2));

  var starsComplete = "";
  for (var j = 1; j <= 5; j++) {
    if (j <= voteFinal) {
      starsComplete += "<i class='fas fa-star'></i>";
    } else {
      starsComplete += "<i class='far fa-star'></i>";
    }
  }
  return starsComplete;
}

//funzione cerca film
function searchMovie() {
  var search = $(".search_movie").val().toLowerCase();
  $.ajax(
    {
      "url" : "https://api.themoviedb.org/3/search/movie",
      "data" : {
        "api_key" : "8c29c10b1dce143e07a26dc3b69c6abc",
        "query" : search,
        "language" : "it-IT",
        "include_adult": false
      },
      "method" : "GET",
      "success" : function(data) {
        var dataResults = data.results;
        tempMovie(dataResults);
      },
      "error" : function(error) {
        alert("ERRORE!");
      }
    }
  );
}
//funzione template lista film
function tempMovie(dataRes) {
  $("#movie_list").html("");
  var source = $("#movie_template").html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < dataRes.length; i++) {
    var language = languageFlag(dataRes[i].original_language);
    var vote = voteMovieMath(dataRes[i].vote_average);

    var context = {
      "title" : dataRes[i].title,
      "original_title" : dataRes[i].original_title,
      "language" : language,
      "vote" : vote
    };
    var html = template(context);
    $("#movie_list").append(html);
  }
}

//funzione cerca serie tv
function searchTvSeries() {
  var search = $(".search_movie").val().toLowerCase();
  $.ajax(
    {
      "url" : "https://api.themoviedb.org/3/search/tv",
      "data" : {
        "api_key" : "8c29c10b1dce143e07a26dc3b69c6abc",
        "query" : search,
        "language" : "it-IT",
        "include_adult": false
      },
      "method" : "GET",
      "success" : function(data) {
        var dataResults = data.results;
        tempTvSeries(dataResults);
      },
      "error" : function(error) {
        alert("ERRORE!");
      }
    }
  );
}
//funzione template lista serie tv
function tempTvSeries(dataRes) {
  $("#tvseries_list").html("");
  var source = $("#tvseries_template").html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < dataRes.length; i++) {
    var language = languageFlag(dataRes[i].original_language);
    var vote = voteMovieMath(dataRes[i].vote_average);

    var context = {
      "name" : dataRes[i].name,
      "original_name" : dataRes[i].original_name,
      "language" : language,
      "vote" : vote
    };
    var html = template(context);
    $("#tvseries_list").append(html);
  }
}
