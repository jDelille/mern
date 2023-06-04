import { useEffect, useState } from 'react'

type DeckProps = {
  _id: string;
  title: string;
}
const Decks = () => {

  const [title, setTitle] = useState("")
  const [decks, setDecks] = useState<DeckProps[]>([])


  async function handleCreateDeck(event: React.FormEvent) {
    event.preventDefault();
    const response = await fetch('http://localhost:5000/decks', {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: {
        "Content-Type": "application/json",
      }
    })
    //optimistic update decks 
    const deck = await response.json();
    setDecks([...decks, deck])
    setTitle("")

  }

  useEffect(() => {
    async function fetchDecks() {
      const response = await fetch('http://localhost:5000/decks')
      const newDecks = await response.json()
      setDecks(newDecks)
    }
    fetchDecks()
  }, [])

  async function handleDeleteDeck(deckId: string) {
    fetch(`http://localhost:5000/decks/${deckId}`, {
      method: "DELETE",
    }).then(() => {
      //optimistic update decks 
      setDecks(decks.filter((deck) => deck._id !== deckId))
    })
  }

  return (
    <>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor='deck-title'>Deck Title</label>
        <input
          id="deck-title"
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          value={title}
        />
        <button>Create Deck</button>
      </form>
      <ul className='decks'>
        {decks.map((deck) => (
          <li id={deck._id} className='deck'>
            <p>{deck.title}</p>
            <button onClick={() => handleDeleteDeck(deck._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Decks;
