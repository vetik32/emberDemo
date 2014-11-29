Emberdemo.Comment = DS.Model.extend({
    content: DS.attr('string'),
    timestamp: DS.attr('string', {
        defaultValue: function () {
            return new Date();
        }
    })
});

Emberdemo.Comment.FIXTURES = [
    {
        id: 1,
        content: 'my first comment',
        timestamp: '1/1/2014'
    }, {
        id: 2,
        content: 'my second comment',
        timestamp: '2/1/2014'
    }
];
