from django.conf.urls import patterns, url, include

from flicksapp.api import MovieDetailResource, MovieListResource


movie_detail_resource = MovieDetailResource()
movie_list_resource = MovieListResource()

urlpatterns = patterns('flicksapp.views',
    # old frontend
    url(r'^$', 'bootstrap', name='bootstrap'),
    url(r'^autocomplete/$', 'autocomplete'),
    url(r'^fav/$', 'fav'),
    url(r'^mark-seen/$', 'mark_seen'),
    url(r'^imdb-search/$', 'imdb_search'),
    url(r'^imdb-import/(?P<movie_id>\d+)/$', 'imdb_import'),

    # new frontend
    url(r'^movies/index-by-id/(?P<movie_id>\d+)/$', 'get_index_by_id'),

    # tastypie REST API
    (r'^', include(movie_detail_resource.urls)),
    (r'^', include(movie_list_resource.urls)),
)
