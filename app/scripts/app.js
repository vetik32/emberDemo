var Emberdemo = window.Emberdemo = Ember.Application.create();

/* Order and include as you please. */
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/components/*');
require('scripts/views/*');
require('scripts/router');

require('scripts/application/*');
require('scripts/comment/*');

Ember.Handlebars.registerBoundHelper('date', function (date) {
    return moment(date).fromNow();
});
