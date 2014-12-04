// TODO: ArrayController, sorted by timestamp by default

Emberdemo.CommentsNewController = Ember.ObjectController.extend({
    comment: null,
    _transitToRoot: function () {
        this.get('target').transitionTo('comments');
    },
    actions: {
        save: function () {
            var newComment = this.get('comment');

            if (!newComment) {
                return;
            }

            this.set('comment', null);

            var comment = this.store.createRecord('comment', {
                content: newComment
            });

            this._transitToRoot();
        },
        cancel: function () {
            this._transitToRoot();
        }
    },
    disabled: function () {
        return Ember.isEmpty(this.get('comment'));
    }.property('comment')
});
