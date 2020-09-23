$(document).ready(function(){

  var btnSrc = $(".search_btn");
  btnSrc.click(
    function() {
      searchMovie();
      $(".search_movie").val("");
    }
  );

  $(".search_movie").keydown(
    function(e) {
      if (e.which == 13) {
        searchMovie();
        $(".search_movie").val("");
      }
    }
  );

});

function tempMovie(dataRes) {
  $("#movie_list").html("");
  var source = $("#movie_template").html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < dataRes.length; i++) {
    var language = langEnglish(dataRes[i].original_language);
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

function langEnglish(language) {
  if ((language === "it") || (language === "de") || (language === "fr") || (language === "es") || (language === "pt") || (language === "ar")) {
    $(".flag_img").html("<img src='https://www.countryflags.io/"+language+"/flat/32.png'>");
  } else if (language === "en") {
    $(".flag_img").html("<img src='https://www.countryflags.io/gb/flat/32.png'>");
  } else {
    $(".flag_img").html(language);
  }
}

function voteMovieMath(voteOfI) {
  var numbVote = parseInt(Math.ceil(voteOfI));
  var voteFinal = parseInt(Math.ceil(numbVote / 2));
  // for (var j = 0; j < $(".vote_list li>i"); j++) {
  //   $(".vote_list li>i").addClass("star_yellow");
  //   $(".vote_list li>i").next();
  // }
  return voteFinal;
}

function searchMovie() {
  var search = $(".search_movie").val().toLowerCase();
  // "https://api.themoviedb.org/3/search/movie"
  // "https://api.themoviedb.org/3/search/tv"
  $.ajax(
    {
      "url" : "https://api.themoviedb.org/3/search/movie",
      "data" : {
        "api_key" : "8c29c10b1dce143e07a26dc3b69c6abc",
        "query" : search,
        "language" : "it-IT"
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
