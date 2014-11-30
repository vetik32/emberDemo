/**
 * Created by vandries on 11/29/14.
 */

Emberdemo.CommentController = Ember.Controller.extend({
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
    }
});
