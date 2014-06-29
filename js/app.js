App = Ember.Application.create();

App.Router.map(function() {
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('video');
  }
});
/*
App.VideoboxComponent = Ember.Component.extend({
  template: function() {
    return Ember.Handlebars.compile("<div>youtube.api" + video.get('youtubeid') + "</div>");
  }.property()
});
*/

App.ApplicationAdapter = DS.FixtureAdapter.extend({
});

App.Video = DS.Model.extend({
  youtubeId : DS.attr('string')
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
]