/* global visit,andThen,click,fillIn,find,module */

Emberdemo.setupForTesting();
Emberdemo.injectTestHelpers();

var newTopicForm = '.new-item-form';
var newTopicSelector = '.new-item-form textarea';
var postsContainerSelector = '.posts-container';
var postsListSelector = postsContainerSelector + ' ul li';
var addNewTopicSelector = 'a.btn-primary';
var addNewCommentSelector = 'a.btn-primary';
var addPostButtonSelector = 'button.btn-primary';
var addCommentButtonSelector = 'button.btn-primary';
var cancelPostButtonSelector = 'button.btn-default';
var commentsPlaceholderSelector = '.comments-placeholder';

function _trim(text) {
    return $.trim(text);
}

module('Post', {
    setup: function() {
        visit("/posts");
    },
    teardown: function() {
        Emberdemo.reset();
    }
});

var user = (function() {
    return {
        createPost: function(newTopic) {
            this.startCreatingPost(newTopic);

            andThen(function() {
                click(addPostButtonSelector);
            });

            return this;
        },
        startCreatingPost: function(newTopic) {
            visit("/posts/new");

            andThen(function() {
                fillIn(newTopicSelector, newTopic);
            });

            return this;
        },
        cancelAddingNewItem: function() {
            click(cancelPostButtonSelector);

            return this;
        },
        createComment: function(newComment, newTopic) {
            this.startCreatingComment(newComment, newTopic);

            andThen(function() {
                click(addCommentButtonSelector);
            });

            return this;
        },
        createAnotherComment: function(newComment) {

            click(find(postsListSelector).last().find('a'));

            andThen(function() {
                click(find(addNewCommentSelector));
                fillIn(newTopicSelector, newComment);
            });

            andThen(function() {
                click(addCommentButtonSelector);
            });

            return this;
        },

        startCreatingComment: function(newComment, newTopic) {

            if (newTopic) {
                this.createPost(newTopic);
                andThen(function() {
                    click(find(postsListSelector).last().find('a'));
                });
            }


            andThen(function() {
                click(find(addNewCommentSelector));
                fillIn(newTopicSelector, newComment);
            });

            return this;
        }
    }
})();

test('there is a message when no posts are present', function() {
    andThen(function() {
        equal(_trim(find(postsContainerSelector).text()), 'No posts.', 'check empty collectoin message');

        equal(find(postsListSelector).size(), 0, 'no posts');

        equal(find(addNewTopicSelector).size(), 1, 'should have "Add New Topic Link"');
        equal(_trim(find(addNewTopicSelector).text()), 'Add New Topic');

        equal(find(newTopicForm).size(), 0, 'no form in the page');
    });
});

test('creation of new post', function() {

    var newTopic = 'testing new topic';

    click(addNewTopicSelector);

    andThen(function() {
        equal(find(addPostButtonSelector).size(), 1);
        equal(find(cancelPostButtonSelector).size(), 1);
        equal(find(newTopicSelector).size(), 1);
        equal(find(newTopicForm).size(), 1);
        equal(_trim(find(newTopicSelector).text()), '');
        equal(_trim(find(addPostButtonSelector).text()), 'Add');
        equal(_trim(find(cancelPostButtonSelector).text()), 'Cancel');
    });

    equal(find(addPostButtonSelector).is(':disabled'), true);
    fillIn(newTopicSelector, newTopic);

    andThen(function() {
        equal(find(addPostButtonSelector).is(':disabled'), false);

        click(addPostButtonSelector);

        equal(find(postsListSelector).size(), 1, 'one post should be present');
        equal(find(postsListSelector).last().find('a').text(), newTopic);
    });
});


test('creating new post, canceling another - should not add another post', function() {
    user.createPost('zz top is back?')
        .startCreatingPost("Zed's dead, baby. Zed's dead.")
        .cancelAddingNewItem();


    andThen(function() {
        // switching for post page
        equal(find(postsListSelector).size(), 1, 'one post should be present');
    })
});

test('switching to new post', function() {
    user.createPost('zz top is back?');

    andThen(function() {
        // switching for post page
        click(find(postsListSelector).last().find('a'));

        equal(find('h3').text(), 'zz top is back?', 'checking title');
        equal(find(commentsPlaceholderSelector).find('ul li').size(), 0);
        equal(_trim(find(commentsPlaceholderSelector).text()), 'No Comments.', 'check comments status: should be empty');
    })
});

test('creating a comment', function() {
    var aComment = 'My first comment';
    user.createComment(aComment, 'My First Topic');

    andThen(function() {
        equal(find(commentsPlaceholderSelector).find('ul li').size(), 1, 'should be present one comment');
        equal(_trim(find(commentsPlaceholderSelector).find('ul li .comment').text()), aComment, 'with a specific text');
        equal(_trim(find(commentsPlaceholderSelector).find('ul li .timestamp').text()), '(a few seconds ago)', 'with a specific text');
    });
});

test('canceling a comment', function() {
    var aComment = 'My first comment';
    user.createComment(aComment, 'My First Topic')
        .startCreatingComment(aComment + 'zzz')
        .cancelAddingNewItem();

    andThen(function() {
        equal(find(commentsPlaceholderSelector).find('ul li').size(), 1, 'should be present one comment');
    });
});


test('checking comments counter', function() {
    var aComment = 'My first comment';
    user.createComment(aComment, 'My First Topic');

    visit('/posts');

    andThen(function() {
        equal(_trim(find(postsListSelector).first().find('.commentsCount').text()), '(Comments: 1)', 'should have one comment');
        user.createAnotherComment('Another Comment');
    });


    andThen(function() {
        equal(find(commentsPlaceholderSelector).find('ul li').size(), 2, 'should have 2 comments');
    });

    visit('/posts');

    andThen(function() {
        equal(_trim(find(postsListSelector).first().find('.commentsCount').text()), '(Comments: 2)', 'should have one comment');
    });
});
