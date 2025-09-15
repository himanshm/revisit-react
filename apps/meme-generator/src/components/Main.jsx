import { useState, useEffect } from 'react';
const Main = () => {
  const initialState = {
    imageUrl: 'http://i.imgflip.com/1bij.jpg',
    topText: 'One does not simply',
    bottomText: 'Walk into Mordor'
  };
  const [meme, setMeme] = useState(initialState);
  const [allMemes, setAllMemes] = useState([]);

  const handleChange = event => {
    const { value, name } = event.currentTarget;
    setMeme(prevMeme => ({
      ...prevMeme,
      [name]: value
    }));
  };

  const handleGetMemeClick = () => {
    const newMemeIndex = Math.floor(Math.random() * allMemes.length);
    const { url: newMemeUrl } = allMemes[newMemeIndex];
    setMeme(prevMeme => ({
      ...prevMeme,
      imageUrl: newMemeUrl
    }));
  };

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(data => setAllMemes(data.data.memes))
      .catch(err => console.error('Error fetching memes data: ', err));
  }, []);

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            type="text"
            placeholder="One does not simply"
            name="topText"
            onChange={handleChange}
            value={meme.topText}
          />
        </label>

        <label>
          Bottom Text
          <input
            type="text"
            placeholder="Walk into Mordor"
            name="bottomText"
            onChange={handleChange}
            value={meme.bottomText}
          />
        </label>

        <button onClick={handleGetMemeClick}>Get a new meme image 🖼</button>
      </div>
      <div className="meme">
        <img src={meme.imageUrl} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
};

export default Main;
