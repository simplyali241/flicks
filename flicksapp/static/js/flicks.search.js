(function ($) {

  var F = $.flicks;

  // perform search
  F.search = function(q) {
    F.store.clear();
    F.grid.updateRowCount()
    F.store.setSearch(q);
    F.gridChange();
    // save search to app state
    var q_state = F.state.get('q');
    if (typeof q === 'object')
      // always make sure needed variables are present in q object
      // (important for template rendering)
      F.state.set(
        'q', $.extend({}, F.search.empty_search, q));
    else
      F.state.set('q', q);
  };

  // clear search
  F.search.clear = function() {
    F.search('');
  };

  // empty search (show all)
  // (we supply empty strings so the search form template doesn't complain)
  F.search.empty_search = {
    title: '',
    countries: '',
    genres: '',
    keywords: '',
    cast: '',
    directors: '',
    writers: '',
    mpaa: '',
    seen: '',
    favourite: ''
  };

})(jQuery);
