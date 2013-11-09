define([
  'marionette'
], function(
  Marionette
) {

  var ToolbarView = Marionette.ItemView.extend({

    template:  'toolbar',
    className: 'navbar navbar-default navbar-static-top',

    events: {
      'change #radio-grid-tiles input':            'radioViewClick',

      'click #open-imdb':                          'openImdb',
      'click #open-karagarga':                     'openKaragarga',
      'click #open-opensubtitles':                 'openOpensubtitles',

      'submit form[role=search]':                  'search',
      'click form[role=search] #btn-adv-search':   'advSearch',
      'click form[role=search] #btn-clear-search': 'clearSearch',
      'input form[role=search] input':             'toggleSearchButton'
    },

    ui: {
      search_form:       'form[role=search]',
      search_input:      'form[role=search] input',
      btn_clear_search:  'form[role=search] #btn-clear-search',
      btn_submit_search: 'form[role=search] button[type=submit]'
    },

    initialize: function() {
      this.listenTo(App.movie_collection, {
        'deselected': this.onDeselected,
        'change:_selected': this.onSelected
      }, this);

      // when query string was changed from outside the toolbar
      this.listenTo(App.state, 'change:search', this.searchChanged, this);
    },

    onSelected: function(movie, selected) {
      if (selected) {
        var view = this;
        this.$('.movie-action').removeClass('disabled');
        _.each(['favourite', 'seen'], function(attr) {
          var value = movie.get(attr);
          var func = value ? 'addClass' : 'removeClass';
          view.$('.btn.%s'.format(attr))[func]('active');
        });
      }
    },

    searchChanged: function(state, search) {
      if (this.ui.search_input.val() !== search) {
        this.ui.search_input.val(search);
        this.toggleSearchButton();
      }
    },

    onDeselected: function() {
      this.$('.movie-action').addClass('disabled');
      var view = this;
      _.each(['favourite', 'seen'], function(attr) {
        view.$('.btn.%s'.format(attr)).removeClass('active');
      });
    },

    // UI event callbacks

    toggleSearchButton: function() {
      var q = this.ui.search_input.val();
      if (q.length > 0) {
        this.ui.btn_clear_search.removeClass('disabled');
        this.ui.btn_submit_search.removeClass('disabled');
      }
      else {
        this.ui.btn_clear_search
          .addClass('disabled')
          .tooltip('hide');
        this.ui.btn_submit_search
          .addClass('disabled')
          .tooltip('hide');
      }
    },

    radioViewClick: function(ev) {
      var $el = $(ev.currentTarget);
      var $label = $el.parent();
      if ($label.hasClass('active'))
          return;
      var $btn_group = $label.parent();
      $btn_group.children('label').removeClass('active');
      $label.addClass('active');
      App.state.set('view-mode', $el.val());
    },

    searchImdbIdOrTitle: function(url_imdbid, url_title) {
      var movie = App.movie_collection.getSelected();
      var imdb_id = movie.get('imdb_id'), url;
      if (imdb_id)
        url = url_imdbid.format(imdb_id);
      else
        url = url_title.format(movie.get('title').replace(' ', '+'));
      window.open(url, '_blank');
    },

    search: function() {
      var q = this.ui.search_input.val();
      App.router.navigate('search/%s'.format(q), { trigger: true });
      return false;
    },

    clearSearch: function() {
      this.ui.search_input.val('');
      App.router.navigate('search/', { trigger: true });
    },

    advSearch: function() {
      // TODO
      console.log('adv search');
    },

    openKaragarga: function() {
      var title = App.movie_collection.getSelected().get('title');
      window.open(App.links.karagarga.format(title), '_blank');
      return false;
    },

    openImdb: function() {
      this.searchImdbIdOrTitle(App.links.imdb_id, App.links.imdb_title);
      return false;
    },

    openOpensubtitles: function() {
      this.searchImdbIdOrTitle(App.links.os_imdbid, App.links.os_title);
      return false;
    }

  });

  return ToolbarView;

});
