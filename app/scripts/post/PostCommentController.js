Emberdemo.PostCommentController = Ember.ObjectController.extend({

    needs: ['post'],

    comment: null,

    _transitToRoot: function () {
        this.clear();
        this.get('target').transitionTo('post.index');
    },

    clear: function () {
        this.set('comment', null);
    },

    actions: {
        save: function () {
            var postCommentController = this;
            var post = this.get('controllers.post.content');

            var comment = this.store.createRecord('comment', {
                content: this.get('comment'),
                post: post
            });

            comment.save().then(function () {
                post.get('comments').addObject(comment);
                postCommentController._transitToRoot();
            });
        },

        cancel: function () {
            this._transitToRoot();
        }
    },
    disabled: function () {
        return Ember.isEmpty(this.get('comment'));
    }.property('comment')
});
