let events = [];
let eventIdCounter = 1;

// CREATE EVENT (Organizer only ideally)
exports.createEvent = async (req, res) => {
  try {
    const { title, date, time, description } = req.body;
    const { v4: uuidv4 } = require('uuid');

    const newEvent = {
      id: uuidv4(),
      title,
      date,
      time,
      description,
      participants: [],
      createdBy: req.user.email // from JWT
    };

    events.push(newEvent);

    res.status(201).json({
      message: "Event created successfully",
      event: newEvent
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating event" });
  }
};

// GET ALL EVENTS
exports.getAllEvents = async (req, res) => {
  res.json(events);
};

// UPDATE EVENT
exports.updateEvent = async (req, res) => {
  const id = parseInt(req.params.id);

  const event = events.find(e => e.id === id);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  if (event.createdBy !== req.user.email) {
    return res.status(403).json({ message: "Not authorized" });
  }

  const { title, date, time, description } = req.body;

  event.title = title || event.title;
  event.date = date || event.date;
  event.time = time || event.time;
  event.description = description || event.description;

  res.json({ message: "Event updated", event });
};

// DELETE EVENT
exports.deleteEvent = async (req, res) => {
  const id = parseInt(req.params.id);

  const index = events.findIndex(e => e.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Event not found" });
  }

  if (events[index].createdBy !== req.user.email) {
    return res.status(403).json({ message: "Not authorized" });
  }

  events.splice(index, 1);

  res.json({ message: "Event deleted" });
};

// REGISTER FOR EVENT
exports.registerForEvent = async (req, res) => {
  const id = req.params.id;

  const event = events.find(e => e.id === id);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  if (event.participants.includes(req.user.email)) {
    return res.status(400).json({ message: "Already registered" });
  }

  event.participants.push(req.user.email);

  res.json({ message: "Registered successfully", event });
};