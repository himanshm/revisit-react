import { useState } from "react"
const Main = () => {
    const initialState = {
        imageUrl: 'http://i.imgflip.com/1bij.jpg',
        topText: 'One does not simply',
        bottomText: 'Walk into Mordor'
    }
    const [meme, setMeme] = useState(initialState)

    const handleChange = event => {
        console.log(event.currentTarget)
        const { value, name } = event.currentTarget;
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value,
        }));
    }
  return (
    <main>
        <div className="form">
            <label>Top Text
                <input
                    type="text"
                    placeholder="One does not simply"
                    name="topText"
                    onChange={handleChange}
                    value={meme.topText}
                />
            </label>

            <label>Bottom Text
                <input
                    type="text"
                    placeholder="Walk into Mordor"
                    name="bottomText"
                    onChange={handleChange}
                    value={meme.bottomText}
                />
            </label>

            <button>Get a new meme image 🖼</button>
        </div>
        <div className="meme">
            <img src={meme.imageUrl} />
            <span className="top">{meme.topText}</span>
            <span className="bottom">{meme.bottomText}</span>
        </div>
    </main>
  )
}

export default Main