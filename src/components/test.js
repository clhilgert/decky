const fetchDecks = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/decks');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data); // Log the response data to check its contents
  } catch (error) {
    console.error('Error fetching decks:', error);
  }
};

fetchDecks();
