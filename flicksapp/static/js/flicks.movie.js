(function() {

  //////////////////////////////////////////////////////////////////////////////
  // flicks.movie.js
  //
  // Code related to movie model (Retrieving, update, ...). This is
  // the interface to the movie model no the server side.
  //

  var F = $.flicks;

  F.movie = {};

  // load movie
  F.movie.get = function(id, cb) {
    $.ajax({
      url: '/movie/' + id + '/',
      dataType: 'json',
      type: 'GET',
      success: function(movie) {
        F.movie.current = movie;
        cb(movie);
      },
      error: function (r) {
        F.modals.error(
          '<strong>Loading movie details failed ' + movie.id +
            '!</strong><br><br>Error text: ' + r.statusText);
      }
    });
  }

  // add movie
  F.movie.add = function(movie, cb) {
    var data = JSON.stringify(movie);
    $.ajax({
      url: '/movies/',
      data: data,
      dataType: 'json',
      type: 'POST',
      processData: false,
      contentType: 'application/json',
      success: function(movie) {
        F.movie.current = movie;
        cb(movie);
      },
      error: function (r) {
        F.modals.error(
          '<strong>Could not add new movie' +
            '!</strong><br><br>Error text: ' + r.statusText);
      }
    });
  }

  // check movie existence
  F.movie.exists = function(imdb_id, cb) {
    var args = {
      limit: 1,
      offset: 0,
      imdb_id: imdb_id,
    }
    $.ajax({
      url: "/movies/",
      dataType: "json",
      type: "GET",
      data: args,
    }).done(function (r) {
      if (r.meta.total_count > 0)
        cb(r.objects[0]);
      else
        cb(false);
    }).fail(function (r) {
      F.modals.error(
        '<strong>Could not check for movie existence' +
          '!</strong><br><br>Error text: ' + r.statusText);
    });
  }

  // change imdb id
  F.movie.changeImdbId = function(id, imdb_id, cb) {
    var data = { imdb_id: imdb_id };
    $.ajax({
      url: '/imdb-import/' + id + '/',
      data: data,
      dataType: 'json',
      type: 'GET',
      success: cb,
      error: function (r) {
        F.modals.error(
          '<strong>Could not change movie IMDb ID' +
            '!</strong><br><br>Error text: ' + r.statusText);
      }
    });
  }

  // delete movie
  F.movie.delete = function(movie, cb) {
    $.ajax({
      url: '/movies/' + movie.id + '/',
      type: 'DELETE'
    }).done(function() {
      cb(movie);
    }).fail(function (r) {
      F.modals.error(
        '<strong>Could not delete movie with id ' + movie.id +
          '!</strong><br><br>Error text: ' + r.statusText);
    });
  }

  // (un)favourite
  F.movie.fav = function(id, unfav, cb) {
    var data = { id: id };
    if (unfav)
      data.unfav = true;
    $.post('/fav/', data, cb).error(function(r) {
      F.modals.error(
        '<strong>Could not set favourite flag for movie!</strong><br><br>'
          + 'Error text: ' + r.statusText);
    });
  };

  // mark (un)seen
  F.movie.markSeen = function(id, unmark, cb) {
    var data = { id: id };
    if (unmark)
      data.unmark = true;
    $.post('/mark-seen/', data, cb).error(function(r) {
      F.modals.error(
        '<strong>Could not set seen flag for movie!</strong><br><br>'
          + 'Error text: ' + r.statusText);
    });
  };

  // imdb search
  F.movie.imdbSearch = function(q, cb) {
    var data = { q: q };
    $.ajax({
      url: '/imdb-search/',
      data: data,
      type: 'GET',
    })
    .done(cb)
    .fail(function(r) {
      F.modals.error(
        '<strong>Could not search IMDb!</strong><br><br>'
          + 'Error text: ' + r.statusText);
    });
  };

  // imdb import
  F.movie.imdbImport = function(id, cb) {
    F.ui.enableSpinner();
    $.ajax({
      url: '/imdb-import/' + id + '/',
      type: 'GET',
    })
    .done(cb)
    .fail(function(r) {
      F.modals.error(
        '<strong>Could import data from IMDb!</strong><br><br>'
          + 'Error text: ' + r.statusText);
    });
  };

})();
