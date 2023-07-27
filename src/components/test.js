const fetchDecks = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/decks');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
  } catch (error) {
    console.error('Error fetching decks:', error);
  }
};

fetchDecks();
