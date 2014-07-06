var App = Ember.Application.create({
  ready: function() {
    $.getScript("https://www.youtube.com/iframe_api");
  }
});

// wait for yt video images to be loaded
App.deferReadiness();

App.Router.map(function() {
});

App.ApplicationController = Ember.Controller.extend({
  videoId: "",
  actions: {
    addVideo: function() {
      var video = this.store.createRecord('video', { 
        youtubeid: this.get('videoId')
      }); 
      
      var controller = this; 

      video.save().then(function(video) { 
        controller.set('videoId', '');
        controller.controllerFor('index').get('model').addObject(video); 
      });
    }
  }
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
  ytVideoTitle: null,
  ytVideoImgSrc: null,
  
  ytVideoImg: function() {
    if (this.get('ytVideoImgSrc')) {
      return new Handlebars.SafeString("<img class='ytimg' src='" + this.get('ytVideoImgSrc') + "' title='"+ this.get('ytVideoTitle') +"'/>");
    }
    else
      return new Handlebars.SafeString("<img />");
  }.property('ytVideoImgSrc'),
  
  loadImg: function() {
    var view = this;

    fetchYTVideoInfo(this.get('video.youtubeid'), function(response) {
      var info = response.items[0];
      view.set('ytVideoImgSrc', info.snippet.thumbnails.medium.url); 
      view.set('ytVideoTitle', info.snippet.title);
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
  },
  
  playVideo: function() {
      if (player)
          player.removeEventListener("onStateChange", "onPlayerStateChange");

      player = newYTPlayer('#' + this.elementId + " .ytimg", this.get('video.youtubeid'));
    
      player.addEventListener("onStateChange", "onPlayerStateChange");
    
      playingComponent = this;
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

function fetchYTVideoInfo(id, callback) {
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


