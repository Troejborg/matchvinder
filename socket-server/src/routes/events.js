const { EventType } = require('../models/models').default;
const eventType = require('express').Router();

eventType.get('/', (req, res) => {
  EventType.find({}, (err, eventTypes) => {
    if (err) res.status(500).send(err);

    res.status(200).json(eventTypes);
  });
});
eventType.route('/by-id/:id')
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

/_ Create or update an event type. _/
eventType.post('/', (req, res) => {
  if (req.body._id) {
    updateEventType(req, res);
  } else {
    createEventType(req, res);
  }
});

/_ GET all Event types by team id. _/
eventType.get('/by-team', (req, res) => {
  console.log('get event types by team name!');
  const teamId = req.query['team'];
  if (!!teamId) {
    EventType.findByTeamAndCategory(teamId, req.query['category']).then((eventTypes, err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(eventTypes);
      }
    });
  }
  else {
    res.status(404)
  }
});

function updateEventType(req, res) {
  EventType.findById(req.body._id, (err, eventType) => {
    if (err) res.status(500).send(err);
    eventType.eventName = req.body.eventName;
    eventType.pointValue = req.body.pointValue;
    if(req.body.category) {
      eventType.category = req.body.category;
    }

    eventType.save(error => {
      if (error) res.status(500).send(error);
      res.status(201).json({
        message: `EventType ${eventType.eventName} updated successfully`
      });
    });
  });
}

function createEventType(req, res) {
  let eventType = new EventType({
    displayName: req.body.displayName,
    key: req.body.key,
    pointValue: req.body.pointValue,
    category: req.body.category != null ? req.body.category : "CUSTOM",
    team: req.body.team
  });
  eventType.save(error => {
    if (error) res.status(500).send(error);

    res.status(201).json({
      message: `EventType ${eventType.eventName} created successfully`
    });
  });
}

module.exports = eventType;
