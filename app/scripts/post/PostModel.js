Emberdemo.Post = Emberdemo.Message.extend({
    comments: DS.hasMany('comment', {async: true})
});

Emberdemo.Post.FIXTURES = [];
