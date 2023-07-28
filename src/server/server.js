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

app.post('/api/decks/addcard', async (req, res) => {
  try {
    const { name, question, answer } = req.body;
    console.log(name, question, answer);
    const deck = await Deck.findOne({ name });
    const newFlashcard = new Flashcard({
      question: question,
      answer: answer,
    });
    deck.flashcards.push(newFlashcard);
    await deck.save();
    return res.status(200).json(deck);
  } catch (err) {
    console.err('error adding flashcard:', err)
    return res.status(500).json({message: 'error'})
  }
})

app.post('/api/decks/deletecard', async (req, res) => {
  try {
    const { name, question } = req.body;
    const deck = await Deck.findOne({ name });
    const index = deck.flashcards.findIndex((flashcard) => {
      flashcard.question === question
    })
    deck.flashcards.splice(index, 1);
    await deck.save();
    return res.status(200).json(deck);
  } catch (err) {
    return res.status(500).json({message: 'error'})
  }
})

app.post('/api/decks/delete', async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name, 'name')
    const deleteDeck = await Deck.findOneAndDelete({ name: name });
    res.status(200).json({ message: 'Deck deleted successfully' });
  } catch (err) {
    console.error('Error while deleting deck:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/decks/add', async (req, res) => {
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
    const decks = await Deck.find(); 
    res.json(decks); 
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = Deck;