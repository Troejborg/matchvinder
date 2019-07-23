const { EventType } = require('../models/models').default;
const eventType = require('express').Router();

eventType.get('/', (req, res) => {
  EventType.find({}, (err, eventTypes) => {
    if (err) res.status(500).send(err);

    res.status(200).json(eventTypes);
  });
});
eventType.route('/:id')
    .get((req, res) => {
      EventType.findById(req.param.id, (err, eventTypes) => {
        if (err) res.status(500).send(error);

        res.status(200).json(eventTypes);
      });
    })
    .delete((req, res) => {
      EventType.deleteOne({
        "_id": req.params.id
      }, function(err, eventType) {
        if (err)
          res.send(err);

        res.json({ message: 'Successfully deleted player: ' + eventType.eventName });
      });
    });

/_ Create or update a player. _/
eventType.post('/', (req, res) => {
  if (req.body._id) {
    updateEventType(req, res);
  } else {
    creatEventType(req, res);
  }
});

function updateEventType(req, res) {
  EventType.findById(req.body._id, (err, eventType) => {
    if (err) res.status(500).send(err);
    eventType.eventName = req.body.eventName;
    eventType.pointValue = req.body.pointValue;
    eventType.save(error => {
      if (error) res.status(500).send(error);

      res.status(201).json({
        message: `EventType  ${eventType.eventName} updated successfully`
      });
    });
  });
}

function creatEventType(req, res) {
  let eventType = new EventType({
    eventName: req.body.eventName,
    pointValue: req.body.pointValue
  });
  eventType.save(error => {
    if (error) res.status(500).send(error);

    res.status(201).json({
      message: `EventType  ${eventType.eventName} created successfully`
    });
  });
}

module.exports = eventType;
