import { useRef, useEffect } from "react";
import { useTimestamps } from "../hooks/useTimestamps";

export default function VideoPlayback({ uploadedFile, onGoBack, onComplete }) {
    const videoRef = useRef(null);

    // from hook
    const {
        takeoff,
        contact,
        landing,
        nextTap,
        isComplete,
        recordTap,
        reset,
    } = useTimestamps();

    useEffect(() => {
        if (uploadedFile && videoRef.current) {
            videoRef.current.src = URL.createObjectURL(uploadedFile);
        }
    }, [uploadedFile]);


    // from hook
    const handleTap = () => {
        if (!videoRef.current || isComplete) return;
        recordTap(videoRef.current.currentTime)
    };

    const TAP_LABELS = {
        takeoff: "🦵 Tap at Takeoff",
        contact: "🏐 Tap at Ball Contact",
        landing: "🛬 Tap at Landing",
        done: "✅ All moments recorded",
    }

    const handleStep = (seconds) => {
        if(!videoRef.current) return;
        videoRef.current.currentTime += seconds;
    }
    


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

            <div className="frame-buttons">
                <button onClick={() => handleStep(-0.1)}> -0.1s </button>
                <button onClick={() => handleStep(-0.033)}> -1 frame </button>
                <button onClick={() => handleStep(0.033)}> +1 frame </button>
                <button onClick={() => handleStep(0.1)}> +0.1s </button>
            </div>

            {/* Shows which tap comes next */}
            <p>{TAP_LABELS[nextTap]}</p>

            {/* If we still have timestamps we need to put down*/}
            {!isComplete && (
                <button onClick={handleTap}>
                    TAP
                </button>
            )}

            <div className="labelling-timestamsp">
                <p>Takeoff: {takeoff !== null ? `${takeoff.toFixed(3)}s` : "-" }</p>
                <p>Contact: {contact !== null ? `${contact.toFixed(3)}s` : "-"} </p>
                <p>Landing: {landing !== null ? `${landing.toFixed(3)}s` : "-"} </p>
            </div>

            {/* If we have all of our timestamps, then we show the results */}
            {isComplete && (
                <button onClick={() => onComplete(takeoff, contact, landing)}>
                    See Results →
                </button>
            )}

            <button onClick={reset}>Reset Taps</button>
            <button onClick={onGoBack}>
                ← Pick a different video
            </button>
        </div>
    )
}