'use client'
import YouTube from "react-youtube";
import { useState } from "react";

const TrailerVideo = ({ videoId }) => {
    const [isOpen, setIsOpen] = useState(true);
    const handleButton = () => {
        setIsOpen((prevState) => !prevState);
    }
    const Options = {
        height: "230",
        width: "350"
    }

    const Player = () => {
        return(
            <div className="fixed bottom-1 right-0 px-4">
            <button className="text-color-primary float-right bg-color-secondary px-3 mb-0"
            onClick={handleButton}>
                X
            </button>
            <YouTube
            videoId={videoId}
            onReady={(event => event.target.pauseVideo())}
            opts={Options}
            />
        </div>
        )
    }

    return isOpen 
    ? 
    <Player />
    : 
<button onClick={handleButton} className="fixed bottom-3 right-5 w-32 bg-color-accent text-color-primary text-xl hover:bg-color-primary hover:text-color-dark transition-all shadow-xl">
        Trailer
    </button>
}

export default TrailerVideo;