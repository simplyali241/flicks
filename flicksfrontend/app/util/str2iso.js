define([], function() {

  var STR_TO_ISO = {
    'None':             'none',
    'USA':              'us',
    'West Germany':     'de',
    'East Germany':     'de',
    'Germany':          'de',
    'German':           'de',
    'UK':               'gb',
    'English':          'gb',
    'New Zealand':      'nz',
    'France':           'fr',
    'French':           'fr',
    'Spain':            'es',
    'Spanish':          'es',
    'Italy':            'it',
    'Italian':          'it',
    'Russia':           'ru',
    'Russian':          'ru',
    'China':            'cn',
    'Cantonese':        'cn',
    'Mandarin':         'cn',
    'Chinese':          'cn',
    'Japan':            'jp',
    'Japanese':         'jp',
    'Greece':           'gr',
    'Greek':            'gr',
    'Tok Pisin':        'pg',
    'Ireland':          'ie',
    'Irish':            'ie',
    'Korea':            'kr',
    'Korean':           'kr',
    'Arabic':           'sa',
    'Austria':          'at',
    'Australia':        'au',
    'Canada':           'ca',
    'Latin':            'va',
    'Czech Republic':   'cz',
    'Czech':            'cz',
    'Afrikaans':        'za',
    'South Africa':     'za',
    'Vietnam':          'vn',
    'Vietnamese':       'vn',
    'Portuguese':       'pt',
    'Portugal':         'pt',
    'Thai':             'th',
    'Thailand':         'th',
    'Israel':           'il',
    'Hebrew':           'il',
    'Iceland':          'is',
    'Icelandic':        'is',
    'Denmark':          'dk',
    'Danish':           'dk',
    'Norway':           'no',
    'Norwegian':        'no',
    'Hong Kong':        'hk',
    'Somalia':          'so',
    'Somali':           'so',
    'Netherlands':      'nl',
    'Dutch':            'nl',
    'Hungary':          'hu',
    'Hungarian':        'hu',
    'Sweden':           'se',
    'Swedish':          'se',
    'Persian':          'ir',
    'Iran':             'ir',
    'Brazil':           'bl',
    'Finland':          'fi',
    'Finnish':          'fi',
    'Poland':           'pl',
    'Polish':           'pl',
    'Switzerland':      'ch',
    'Romania':          'ro',
    'Romanian':         'ro',
    'Turkish':          'tr',
    'Turkey':           'tr',
    'Mexico':           'mx',
    'Catalonia':        'catalonia',
    'Catalan':          'catalonia',
    'Urdu':             'pk',
    'India':            'in',
    'Hindi':            'in',
  };

  var str2iso = function(str) {
    return STR_TO_ISO[str];
  }

  return str2iso;

});