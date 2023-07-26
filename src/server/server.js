const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
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
const Deck = mongoose.model('Deck', deckSchema);
app.use(bodyParser.json());

app.post('/api/decks/:deckId', async (req, res) => {
  try {
    const { name, flashcards } = req.body;
    const newDeck = new Deck({ name, flashcards });
    const savedDeck = await newDeck.save();
    res.json(savedDeck);
  } catch (err) {
    res.status(500).json({error: 'err'});
  }
});

app.get('/api/decks/', async (req, res) => {
  try {
    const decks = await Deck.find(); // Fetch all decks from the database
    res.json(decks); // Send the decks as a JSON response
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});