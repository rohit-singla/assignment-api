const eventsModel = require('../models/events');

module.exports = {
    getById: function (req, res, next) {
        eventsModel.findById(req.params.id, function (err, eventsInfo) {
            if (err) {
                next(err);
            } else {
                res.json({ status: "success", message: "Event found!!!", data: { events: eventsInfo } });
            }
        });
    },

    getAll: function (req, res, next) {
        let eventsList = [];
        eventsModel.find({}, function (err, events) {
            if (err) {
                next(err);
            } else {
                for (let event of events) {
                    if(req.body.id == event.user){
                        eventsList.push({ id: event.id, description: event.description });
                    }
                }
                res.json({ status: "success", message: "Events found!!!", data: { events: eventsList } });

            }
        });
    },

    updateById: function (req, res, next) {
        eventsModel.findByIdAndUpdate(req.params.id, { description: req.body.description }, function (err, eventsInfo) {
            if (err)
                next(err);
            else {
                res.json({ status: "success", message: "Event updated successfully!!!", data: eventsInfo });
            }
        });
    },

    deleteById: function (req, res, next) {
        eventsModel.findByIdAndRemove(req.params.id, function (err, eventsInfo) {
            if (err)
                next(err);
            else {
                res.json({ status: "success", message: "Event deleted successfully!!!", data: eventsInfo });
            }
        });
    },
    
    create: function (req, res, next) {
        eventsModel.create({ user: req.body.id, description: req.body.description }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "Event added successfully!!!", data: result });
        });
    },
}