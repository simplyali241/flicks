(function ($) {
  /***
   * A data store implementation to work with Django.
   */
  function RemoteDjangoModel() {
    // private
    var PAGESIZE = 50;
    var data = {length: 0};
    var searchstr = null;
    var sortcol = null;
    var sortasc = true;
    var h_request = null;
    var req_count = 0;
    var req = null; // ajax request

    // events
    var onDataLoading = new Slick.Event();
    var onDataLoaded = new Slick.Event();

    function init() {
    }

    function isDataLoaded(from, to) {
      for (var i = from; i <= to; i++) {
        if (data[i] == undefined || data[i] == null) {
          return false;
        }
      }
      return true;
    }

    function clear() {
      for (var key in data) {
        delete data[key];
      }
      data.length = 0;
    }

    function ensureData(from, to) {
      // is it neccessary to abort request?
      //  . leads to broken pipes in django http stack
      // if (req) {
      //   console.debug("REQ ABORTED!");
      //   req.abort();
      // }

      if (from < 0) {
        from = 0;
      }

      var fromPage = Math.floor(from / PAGESIZE);
      var toPage = Math.floor(to / PAGESIZE);

      while (data[fromPage * PAGESIZE] !== undefined && fromPage < toPage)
        fromPage++;

      while (data[toPage * PAGESIZE] !== undefined && fromPage < toPage)
        toPage--;

      if (fromPage > toPage || ((fromPage == toPage) && data[fromPage * PAGESIZE] !== undefined)) {
        // TODO:  look-ahead ?
        return;
      }

      if (h_request != null) {
        clearTimeout(h_request);
      }

      h_request = setTimeout(function () {
        for (var i = fromPage; i <= toPage; i++)
          data[i * PAGESIZE] = null; // null indicates a 'requested but not available yet'
        onDataLoading.notify({from: from, to: to});
        ++req_count;
        var post_data = {
            offset: fromPage * PAGESIZE,
            count: ((toPage - fromPage) * PAGESIZE) + PAGESIZE
        };
        if (searchstr !== null && searchstr.length > 0)
          post_data.q = searchstr
        if (sortcol !== null) {
          post_data.sortcol = sortcol;
          post_data.sortasc = sortasc;
        }
        req = $.ajax({
          url: "grid/",
          dataType: "json",
          type: "POST",
          data: post_data,
          success: function (r) {
            onSuccess(r, fromPage, toPage)
          },
          error: function () {
            onError(fromPage, toPage)
          }
        });
      }, 50);
    }

    function onError(fromPage, toPage) {
      req = null;
      --req_count;
      for (var i = fromPage * PAGESIZE; i < toPage * PAGESIZE + PAGESIZE; ++i) {
        data[i] = undefined;
      }
    }

    function onSuccess(resp, fromPage, toPage) {
      var from = fromPage * PAGESIZE, to = from + resp.movies.length;
      data.length = resp.total;
      for (var i = 0; i < resp.movies.length; ++i) {
        m = resp.movies[i];
        data[from + i] = m.fields;
        data[from + i].index = from + i;
        data[from + i].id = m.pk;
      }
      req = null;
      --req_count;
      onDataLoaded.notify({from: from, to: to});
    }

    function reloadData(from, to) {
      for (var i = from; i <= to; i++)
        delete data[i];
      ensureData(from, to);
    }

    function setSort(column, dir) {
      sortcol = column;
      sortasc = dir;
      clear();
    }

    function setSearch(str) {
      searchstr = str;
      clear();
    }

    function getReqCount() {
      return req_count;
    }

    function getLength() {
      return data.length;
    }

    function getItem(i) {
      return data[i];
    }

    init();

    return {
      // properties
      "data": data,

      // methods
      "clear": clear,
      "isDataLoaded": isDataLoaded,
      "ensureData": ensureData,
      "reloadData": reloadData,
      "setSort": setSort,
      "setSearch": setSearch,
      "getReqCount": getReqCount,

      // model interface methods
      "getLength": getLength,
      "getItem": getItem,

      // events
      "onDataLoading": onDataLoading,
      "onDataLoaded": onDataLoaded
    };
  }

  // Slick.Data.RemoteModel
  $.extend(true, window, { Slick: {
    Data: { RemoteDjangoModel: RemoteDjangoModel }}});
})(jQuery);
