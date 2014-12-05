Emberdemo.Router.map(function () {
    this.resource('posts', function(){
        this.route('new');
    });

    this.resource('post', {path: 'posts/:post_id'}, function(){
        this.route('comment');
    });

    this.resource('comments.new', {path: 'posts/:post_id/comment'});
});
