//import { Button } from 'bootstrap';
import React, { useState, useEffect } from 'react';
//import { Card, CardDeck } from 'react-bootstrap';

//function to process payments to the server
const handlePurchase = (beatId) => {
  fetch('/api/paypal/create-payment', {
    method: 'POST',
    body: JSON.stringify({ beatId }),
    handlers: {
      'content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(data => {
    window.location.href = data.redirect_url;//redirecting user to paypal
  })
  .catch(err => {
    console.error(err);
  });
}

//this function displays all the beats on the screen
export default function Beats() {
  const [beats, setBeats] = useState([]);


//this is the function that handles requesting and returning the searched beats from the server
const handleSearchSubmit = (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  //get the search query from the form data
  const searchQuery = formData.get('searchQuerry');

  //making a request to the server to get the search results
  fetch(`/search?query=${searchQuery}`)
    .then(response => response.json())
    .then(results => {
      //update the state with search results
      setBeats(results);
    })
    .catch(error => console.error(error));


  //props.onSearchSubmit(searchValue);
};


  useEffect(() => {
    // Fetch beats from the server
    fetch('http://localhost:8080/Beats')
      .then(response => response.json())
      .then(data => setBeats(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container mt-4">
      <h1>Beats for Sale</h1>
      <BeatSearch onSearchSubmit={handleSearchSubmit} />
        {beats.map(beat =>  {return <Beat beat={beat}/>} )}
    </div>
  );
}

//the function that handles a single beat
const Beat = ({ beat }) => {
  const [commentsExpanded, setCommentsExpanded] = useState(false);
  const [likes, setLikes] = useState(beat.likes);
  const [dislikes, setDislikes] = useState(beat.dislikes);

  const handlePlay = () => {
    //to make a request to the server to start streaming the beat
    //I can use a library like react-player to handle the audio player
  };

  const handleExpandComments = () => {
    setCommentsExpanded(true);
  };

  const handleCollapseComments = () => {
    setCommentsExpanded(false);
  };

  const handleLike = () => {
    //make a request to the server to update the likes for this certain beat
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    //make a request to the server to update the number of dislikes for the beat
    setDislikes(dislikes + 1);
  };

  return (
    <div className='card'>
      <div className='card-header'>{beat.name}</div>
      <div className='card-body'>
        <div className='row'>
          <div className='col-md-3'>
            <button className='btn btn-primary' onClick={handlePlay}>Play</button>
          </div>
          <div className='col-md-9'>
            <p>Genre: {beat.genre}</p>
            <p>BPM: {beat.bpm}</p>
            <p>Duration: {beat.duration}</p>
            <p>Price: {beat.price}</p>
            <p>Description: {beat.description}</p>
            {commentsExpanded ?
              <div>
                {beat.comments.map(comment => (
                  <div key={comment.id}>
                    <p>{comment.user}: {comment.text}</p>
                    </div>
                ))}
                <button className='btn btn-primary' onClick={handleCollapseComments}>Hide</button>
              </div>
              :
              <button className='btn btn-primary' onClick={handleExpandComments}>Show comments({beat.comments.length})</button>
                }
                <div className='row'>
                  <div className='col-md-6'>
                    <button className='btn btn-primary' onClick={handleLike}>Like {likes}</button>
                  </div>
                  <div className='col-md-6'>
                    <button className='btn btn-primary' onClick={handleDislike}>Dislike {dislikes}</button>
                  </div>
                  <div className='col-md-12'>
                    <button className='btn btn-primary' onClick={handlePurchase(beat.id)}>Purchase</button>
                  </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  )
}

//the search beat function
function BeatSearch(props) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <form onSubmit={props.onSearchSubmit}>
      <div className='input-group mb-3'>
        <input
          type="text"
          className='form-contral'
          name='searchQuery'
          id='searchQuery'
          placeholder='Search Beats'
          value={searchValue}
          onChange={handleSearchInputChange}
        />
        <button className='btn btn-outline-secondary' type='submit'>Search</button>
      </div>
    </form>
  );
}
