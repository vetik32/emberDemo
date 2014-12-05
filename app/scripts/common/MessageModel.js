Emberdemo.Message = DS.Model.extend({
    content: DS.attr('string'),
    timestamp: DS.attr('date', {
        defaultValue: function () {
            return new Date();
        }
    })
});
