/* global visit,andThen,click,fillIn,find,module */

Emberdemo.setupForTesting();
Emberdemo.injectTestHelpers();

var inputSelector = '[name="newComment"]';
var commentsSelector = 'ul.comments li';
var addCommentSelector = 'button.btn-primary';


module('Comment', {
   /* setup: function () {
        Ember.run(function () {
           // Emberdemo.reset();
        });
    },*/
    teardown: function () {
        Emberdemo.reset();
    }
});

test('an input for new comment is present', function () {
    visit("/comment");
    andThen(function () {
        equal(find(inputSelector).length, 1);
    });
});


test('list of default comments', function () {
    visit("/comment");
    andThen(function () {
        equal(find(commentsSelector).length, 2);
    });
});


test('new comment is added', function () {
    visit("/comment");
    var newComment = 'My new comment';
    fillIn(inputSelector, newComment);
    click(addCommentSelector);
    andThen(function () {
        equal(find(inputSelector).val(), '');
        equal(find(commentsSelector).length, 3);
        equal(find(commentsSelector).last().find('.comment').text(), newComment)
    });
});
