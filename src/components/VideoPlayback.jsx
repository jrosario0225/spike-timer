import { useRef, useEffect } from "react";

export default function VideoPlayback({ uploadedFile, onGoBack }) {
    const videoRef = useRef(null);

    useEffect(() => {
        if (uploadedFile && videoRef.current) {
            videoRef.current.src = URL.createObjectURL(uploadedFile);
        }
    }, [uploadedFile]);


    return (
        <div>
            <h2>Analyze Your Spike</h2>
            <p>{uploadedFile?.name}</p> {/* Takes the file name AND checks "hey is this a file"*/}

            <video
                ref={videoRef}
                controls
                playsInline
                style={{ width: "100%" }}
            />

            <button onClick={onGoBack}>
                ← Pick a different video
            </button>
        </div>
    )
}