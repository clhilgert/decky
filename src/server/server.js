const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

mongoose.connect('mongodb+srv://clhilgert:xdxblRkWtfc2ySyq@cluster0.ecdzfa9.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const flashcardSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const deckSchema = new mongoose.Schema({
  name: String,
  flashcards: [flashcardSchema],
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

app.use(bodyParser.json());

app.get('/api/flashcards', async (req, res) => {
  try {
    const flashcards = await Flashcard.find();
    res.json(flashcards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});