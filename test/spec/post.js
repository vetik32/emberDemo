/* global visit,andThen,click,fillIn,find,module */

Emberdemo.setupForTesting();
Emberdemo.injectTestHelpers();

var newTopicForm = '.new-item-form';
var newTopicSelector = '.new-item-form textarea';
var postsContainerSelector = '.posts-container';
var postsListSelector = postsContainerSelector + ' ul li';
var addNewTopicSelector = 'a.btn-primary';
var addPostButtonSelector = 'button.btn-primary';
var cancelPostButtonSelector = 'button.btn-default';

function _trim(text) {
    return $.trim(text);
}

module('Post', {
    setup: function () {
        visit("/posts");
    },
    teardown: function () {
        Emberdemo.reset();
    }
});

test('there is a message when no posts are present', function () {
    andThen(function () {
        // when posts are empty - show the message
        equal(_trim(find(postsContainerSelector).text()), 'No posts.');

        // no posts
        equal(find(postsListSelector).size(), 0);

        // should have add new topic link
        equal(find(addNewTopicSelector).size(), 1);
        equal(_trim(find(addNewTopicSelector).text()), 'Add New Topic');

        // no new form by default
        equal(find(newTopicForm).size(), 0);
    });
});

test('there is a message when no posts are present', function () {

    var newTopic = 'testing new topic';

    click(addNewTopicSelector);

    andThen(function () {
        equal(find(addPostButtonSelector).size(), 1);
        equal(find(cancelPostButtonSelector).size(), 1);
        equal(find(newTopicSelector).size(), 1);
        equal(find(newTopicForm).size(), 1);
        equal(_trim(find(newTopicSelector).text()), '');
        equal(_trim(find(addPostButtonSelector).text()), 'Add');
        equal(_trim(find(cancelPostButtonSelector).text()), 'Cancel');
    });



    /////
    //equal(find(addPostButtonSelector).is(':disabled'), true);
    fillIn(newTopicSelector, newTopic);
    //equal(find(addPostButtonSelector).is(':disabled'), false);

    // TODO test click cancel
    click(addPostButtonSelector);
    andThen(function () {
        equal(find(postsListSelector).size(), 1);
        equal(find(postsListSelector).last().find('a').text(), newTopic);
    });

});
