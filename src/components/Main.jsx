import React from "react"
import { useEffect } from "react"

export default function Main() {
    const [meme,setMeme] = React.useState({
        "topText":"simply",
        "bottomText":"Lovely",
        "memeurl":"http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes,SetAllMemes] = React.useState([])

    React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => SetAllMemes(data.data.memes))
    },[])

    function handleChange(event){
        const {value,name} = event.currentTarget
        setMeme((prevmeme)=>(
            {
                
                ...prevmeme,
                [name]:value
            }
        ))
    }

    function chooseRandomMeme(){
        const randomValue = Math.floor(Math.random() * allMemes.length)
        const newMeme = allMemes[randomValue].url
        setMeme(prevmeme =>(
            {
            ...prevmeme,
            memeurl:newMeme
            }
        ))

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
                <button onClick={chooseRandomMeme}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src= {meme.memeurl}/>
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}