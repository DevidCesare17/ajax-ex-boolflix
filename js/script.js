$(document).ready(function(){

  if ($(".search_movie") != "") {
    var btnSrc = $(".search_btn");
    btnSrc.click(
      function() {
        clearAll();
        searchMovie();
        searchTvSeries();
        $(".search_movie").val("");
      }
    );

    $(".search_movie").keydown(
      function(e) {
        if (e.which == 13) {
          clearAll();
          searchMovie();
          searchTvSeries();
          $(".search_movie").val("");
        }
      }
    );
  }

  scrllMovie();
  scrllTV();

});

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
        renderResults("movie", dataResults);
      },
      "error" : function(error) {
        alert("ERRORE!");
      }
    }
  );
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
        renderResults("tvseries", dataResults);
      },
      "error" : function(error) {
        alert("ERRORE!");
      }
    }
  );
}

//funzione template lista film
function renderResults(type, dataRes) {

  var source = $("#movie_template").html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < dataRes.length; i++) {
    var language = dataRes[i].original_language;
    var vote = voteMovieMath(dataRes[i].vote_average);
    var posterPath = dataRes[i].poster_path;

    var title, original_title, container;
    if (type == "movie") {
      title = dataRes[i].title;
      original_title = dataRes[i].original_title;
      container = $("#movie_list");
    } else if (type == "tvseries") {
      title = dataRes[i].name;
      original_title = dataRes[i].original_name;
      container = $("#tvseries_list");
    }

    var context = {
      "title" : title,
      "original_title" : original_title,
      "language" : language,
      "vote" : vote,
      "poster_path": posterPath,
      "overview" : dataRes[i].overview
    };
    var html = template(context);
    container.append(html);
  }
}

// funzione clear campi list
function clearAll() {
  $("#movie_list").html("");
  $("#tvseries_list").html("");
}

function scrllMovie () {
  $('.movie_section').mousewheel(function(e, delta) {
    this.scrollLeft -= (delta * 80);
    this.scrollRight -= (delta * 80);
    e.preventDefault();
  });
}
function scrllTV() {
  $('.tvseries_section').mousewheel(function(e, delta) {
    this.scrollLeft -= (delta * 80);
    this.scrollRight -= (delta * 80);
    e.preventDefault();
  });
}
