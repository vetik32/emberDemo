/* global visit,andThen,click,fillIn,find,module */

Emberdemo.setupForTesting();
Emberdemo.injectTestHelpers();

var inputSelector = '[name="newComment"]';
var commentsSelector = 'ul.comments li';
var addCommentSelector = 'button.btn-primary';


module('Comment', {
    setup: function () {
        visit("/comments");
    },
    teardown: function () {
        Emberdemo.reset();
    }
});

test('an input for new comment is present', function () {
    andThen(function () {
        equal(find(inputSelector).length, 1);
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
    fillIn(inputSelector, newComment);
    equal(find(addCommentSelector).is(':disabled'), false);
    click(addCommentSelector);
    andThen(function () {
        equal(find(inputSelector).val(), '');
        equal(find(addCommentSelector).is(':disabled'), true);
        equal(find(commentsSelector).length, 3);
        equal(find(commentsSelector).last().find('.comment').text(), newComment);
    });
});
