Emberdemo.Comment = DS.Model.extend({
    content: DS.attr('string'),
    timestamp: DS.attr('date', {
        defaultValue: function () {
            return new Date();
        }
    })
});

Emberdemo.Comment.FIXTURES = [
    {
        id: 1,
        content: 'When the topics will appear?',
        timestamp: new Date(1388527200000)
    }, {
        id: 2,
        content: 'Still no topics?',
        timestamp: new Date(1391205600000)
    }
];
