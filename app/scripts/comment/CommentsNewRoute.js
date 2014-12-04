Emberdemo.CommentsNewRoute = Ember.Route.extend({
    setupController: function (controller, model) {
        controller.set('content', null);
    }
});
