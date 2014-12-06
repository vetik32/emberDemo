var Emberdemo = window.Emberdemo = Ember.Application.create({
    // LOG_TRANSITIONS: true
});

require('scripts/store');
require('scripts/router');

require('scripts/application/*');
require('scripts/common/*');
require('scripts/comment/*');
require('scripts/post/*');

Ember.Handlebars.registerBoundHelper('date', function (date) {
    return moment(date).fromNow();
});
