var Emberdemo = window.Emberdemo = Ember.Application.create({
    LOG_TRANSITIONS: true
});

require('scripts/store');
require('scripts/router');

require('scripts/application/*');
require('scripts/comment/*');

Ember.Handlebars.registerBoundHelper('date', function (date) {
    return moment(date).fromNow();
});
