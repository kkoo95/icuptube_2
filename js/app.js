var App = Ember.Application.create({
  ready: function() {
    $.getScript("https://www.youtube.com/iframe_api");
  }
});

App.deferReadiness();

App.Router.map(function() {
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('video');
  }
});

App.VideoBoxComponent = Ember.Component.extend({
  ytVideoImgSrc: null,
  
  ytVideoImg: function() {
    if (this.get('ytVideoImgSrc')) {
      return new Handlebars.SafeString("<img class='ytimg' height='200' width='200' src='" + this.get('ytVideoImgSrc') + "'/>");
    }
    else
      return new Handlebars.SafeString("<img />");
  }.property('ytVideoImgSrc'),
  
  loadImg: function() {
    var view = this;

    getYTVideoInfo(this.get('video.youtubeid'), function(response) {
      var info = response.items[0];
      view.set('ytVideoImgSrc', info.snippet.thumbnails.medium.url);  
    });
  }.on('init'),
  
  click: function(event) {
    if (player) {
      player.stopVideo();
    }
    
    component = this;
    player = newYTPlayer(this.elementId, this.get('video.youtubeid'));
  }
});

App.ApplicationAdapter = DS.FixtureAdapter.extend({
});

App.Video = DS.Model.extend({
  youtubeid : DS.attr('string'),
});

App.Video.FIXTURES = [
  {
    id: 100,
    youtubeid: "0PiwXwy3iWg"
  },
  {
    id: 101,
    youtubeid: "ESXgJ9-H-2U"
  },
  {
    id: 102,
    youtubeid: "foXJAV4bRiE"
  },
  {
    id: 103,
    youtubeid: "qthZfLY74Lw"
  },
  {
    id: 104,
    youtubeid: "NazVKnD-_sQ"
  },
  {
    id: 105,
    youtubeid: "zOfRtSW4dYE"
  },
  {
    id: 106,
    youtubeid: "MpHAp7zG7tI"
  },
  {
    id: 107,
    youtubeid: "UIZnpUS62Uk"
  },
  {
    id: 108,
    youtubeid: "7X5b76mdD84"
  },
  {
    id: 109,
    youtubeid: "lpWMCulJrOc"
  },
  {
    id: 110,
    youtubeid: "7b3cvgAvC4o"
  }
];

App.Videobox = DS.Model.extend({
});

var player;
var component;

function newYTPlayer(selector, id) {
  return new YT.Player(selector, {
    height: '200',
    width: '200',
    videoId: id,
    playerVars: {
      autoplay: '1',
      controls: '0',
      modestbranding: '1',
      rel: '0',
      showinfo: '0',
      iv_load_policy: '3'
    }
  });
}

function getYTVideoInfo(id, callback) {
  var request = gapi.client.youtube.videos.list({
    id: id,
    part: 'snippet',
    fields: 'items(id,snippet(title,thumbnails(medium)))'
  });

  request.execute(callback);
}

function handleYoutubeAPILoaded() {
    App.advanceReadiness();
}

function onYouTubeIframeAPIReady() {
}


