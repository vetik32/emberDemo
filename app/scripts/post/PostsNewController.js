// TODO: ArrayController, sorted by timestamp by default

Emberdemo.PostsNewController = Ember.ObjectController.extend({
    text: null,

    clear: function () {
        this.set('message', null);
    },

    _transitToRoot: function () {
        this.clear();
        this.get('target').transitionTo('posts');
    },
    actions: {
        save: function () {
            var newPost = this.get('message');

            this.store.createRecord('post', {
                content: newPost
            });

            this._transitToRoot();
        },
        cancel: function () {
            this._transitToRoot();
        }
    },
    disabled: function () {
        return Ember.isEmpty(this.get('message'));
    }.property('message')
});
