var App = Ember.Application.create({
  ready: function() {
    $.getScript("https://www.youtube.com/iframe_api");
  }
});

// wait for yt video images to be loaded
App.deferReadiness();

App.Router.map(function() {
});

App.ApplicationRoute = Ember.Route.extend({
  actions: {
    addVideo: function() {
      var route = this; 
      var controller = route.get('controller');

      fetchYTVideoInfo(controller.get('videoId'))
        .then(
          function(response) {
            var info = response.items[0];
            var video = route.store.createRecord('video', { 
              youtubeid: info.id
            });
            
            return video.save();
          })
        .then(
          function(video) {
            var indexController = route.controllerFor('index');
            
            indexController.get('model').addObject(video);
          })
        .finally(function() {
           controller.set('videoId', '');
        })
    }
  }
});

App.ApplicationController = Ember.Controller.extend({
  videoId: ""
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('video');
  }
});

App.IndexController = Ember.ArrayController.extend({
  sortProperties: ['id'],
  sortAscending: false,
});

App.VideoBoxComponent = Ember.Component.extend({
  classNameBindings: ['videoBoxHidden'],
  videoBoxHidden: true,
  ytVideoInfo: null,
  ytVideoTitle: null,
  ytVideoImgSrc: null,
  
  ytVideoImg: function() {
    var hbs;
    var hasSource = this.get('ytVideoImgSrc') != null;
    
    this.set('videoBoxHidden', !hasSource);
    
    if (this.get('ytVideoImgSrc'))
      hbs = new Handlebars.SafeString("<img class='ytimg' src='" + this.get('ytVideoImgSrc') + "' title='"+ this.get('ytVideoTitle') +"'/>");
    else
      hbs = new Handlebars.SafeString("<img class='ytimg'/>");
      
    return hbs;
  }.property('ytVideoImgSrc'),
  
  updateYTVideoImgProperties: function() {
    var info = this.get('ytVideoInfo');

    this.set('ytVideoTitle', info.snippet.title);
    this.set('ytVideoImgSrc', info.snippet.thumbnails.medium.url); 
  }.observes('ytVideoInfo'),
    
  playVideo: function() {
    if (player)
      player.removeEventListener("onStateChange", "onPlayerStateChange");

    player = newYTPlayer('#' + this.elementId + " .ytimg", this.get('video.youtubeid'));

    player.addEventListener("onStateChange", "onPlayerStateChange");

    playingComponent = this;
  },
  
  loadImg: function() {
    var view = this;

    fetchYTVideoInfo(this.get('video.youtubeid')).then(function(response) {
      view.set('ytVideoInfo', response.items[0]);
    });
  }.on('init'),
  
  click: function(event) {
    if (playingComponent == this)
      return;
    
    if (player) {
      targetComponent = this;
      switchingVideo = true;
      player.stopVideo();
    }
    else {
      this.playVideo();
    }
  }
});

var switchingVideo;
var targetComponent;
var playingComponent;
var player;

function onPlayerStateChange(state) {
  if (switchingVideo)
    switchPlayer();
}

function switchPlayer() {
  if (player && targetComponent) {
    var stoppingComponentId = $(player.getIframe()).parent().attr('id');
    var stoppingComponent = Ember.View.views[stoppingComponentId];
    
    stoppingComponent.rerender(); 
    targetComponent.playVideo();

    targetComponent = null;
    switchingVideo = false;
  }
}

function newYTPlayer(selector, id) {
  return new YT.Player(Ember.$(selector)[0], {
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

function replaceElement(selector, html) {
  $(selector).replaceWith(function() {
    return $(html).append($(this).contents());
  })
};

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

function fetchYTVideoInfo(id) {
  return new Ember.RSVP.Promise(function(resolve, reject) {
    var request = gapi.client.youtube.videos.list({
      id: id,
      part: 'snippet',
      fields: 'items(id,snippet(title,thumbnails(medium)))'
    });
  
    request.execute(function(jsonResp, rawResp) {
        if (jsonResp)
          resolve(jsonResp);
        else
          reject(rawResp);
    });
  });
}

function handleYoutubeAPILoaded() {
    App.advanceReadiness();
}

function onYouTubeIframeAPIReady() {
}


