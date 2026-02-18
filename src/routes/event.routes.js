const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controllers");
const authMiddleware = require("../middleware/auth.middleware");

// All routes protected
router.post("/", authMiddleware, eventController.createEvent);
router.get("/", authMiddleware, eventController.getAllEvents);
router.put("/:id", authMiddleware, eventController.updateEvent);
router.delete("/:id", authMiddleware, eventController.deleteEvent);
router.post("/:id/register", authMiddleware, eventController.registerForEvent);

router.post("/", authMiddleware, (req, res) => {
  const { title, date, description } = req.body;

  const newEvent = {
    id: Date.now(),
    title,
    date,
    description,
    createdBy: req.user.id
  };

  res.status(201).json({
    message: "Event created successfully",
    event: newEvent
  });
});

router.post("/:id/register", authMiddleware, (req, res) => {
  const eventId = req.params.id;
  const userId = req.user.id;

  const event = events.find(e => e.id === eventId);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  if (event.participants.includes(userId)) {
    return res.status(400).json({ message: "Already registered" });
  }

  event.participants.push(userId);

  res.json({
    message: "Successfully registered for event",
    participants: event.participants
  });
});

module.exports = router;