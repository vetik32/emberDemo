/* global visit,andThen,click,fillIn,find,module */

Emberdemo.setupForTesting();
Emberdemo.injectTestHelpers();

var newCommentSelector = '[name="newComment"]';
var commentsSelector = 'ul.comments li';
var addCommentSelector = 'button.btn-primary';


module('New Comment', {
    setup: function () {
        visit("/comments/new");
    },
    teardown: function () {
        Emberdemo.reset();
    }
});

test('an input for new comment is present', function () {
    andThen(function () {
        equal(find(newCommentSelector).length, 1);
        equal(find(addCommentSelector).length, 1);
    });
});

test('list of default comments', function () {
    andThen(function () {
        equal(find(commentsSelector).length, 2);
    });
});

test('new comment is added', function () {
    var newComment = 'My new comment';
    equal(find(addCommentSelector).is(':disabled'), true);
    fillIn(newCommentSelector, newComment);
    equal(find(addCommentSelector).is(':disabled'), false);
    click(addCommentSelector);
    andThen(function () {
        equal(find(commentsSelector).length, 3);
        equal(find(commentsSelector).last().find('.comment').text(), newComment);
    });
});
