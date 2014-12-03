
// TODO: ArrayController, sorted by timestamp by default

Emberdemo.CommentsController = Ember.Controller.extend({
    comment: '',
    actions: {
        add: function () {
            var newComment = this.get('comment');

            if (!newComment) {
                return;
            }

            this.set('comment', '');

            this.store.createRecord('comment', {
                content: newComment
            });
        }
    },
    disabled: function(){
        return Ember.isEmpty(this.get('comment'));
    }.property('comment')
});
