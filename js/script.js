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

function tempMovie(dataR) {
  $("#movie_list").html("");
  var source = $("#movie_template").html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < dataR.length; i++) {
    var context = {
      "title" : dataR[i].title,
      "original_title" : dataR[i].original_title,
      "language" : dataR[i].original_language,
      "vote" : dataR[i].vote_average
    };
    var html = template(context);
    $("#movie_list").append(html);
  }
}

function searchMovie() {
  var search = $(".search_movie").val().toLowerCase();
  $.ajax(
    {
      "url" : "https://api.themoviedb.org/3/search/movie/",
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
