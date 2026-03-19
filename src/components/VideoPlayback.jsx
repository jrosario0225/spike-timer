import { useRef, useEffect } from "react";
import { useTimestamps } from "../hooks/useTimestamps";
import "./VideoPlayback.css"

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
        if (!videoRef.current) return;
        videoRef.current.currentTime += seconds;
    }



    return (
        <div className="playback-container">
            <h2 className="playback-title">Analyze Your Spike</h2>
            <p className="playback-filename">{uploadedFile?.name}</p> {/* Takes the file name AND checks "hey is this a file"*/}

            <video
                ref={videoRef}
                controls
                playsInline
                style={{ width: "100%" }}
                className="playback-video"
            />

            <div className="frame-buttons">
                <button className="frame-btn" onClick={() => handleStep(-0.1)}> -0.1s </button>
                <button className="frame-btn" onClick={() => handleStep(-0.033)}> -1 frame </button>
                <button className="frame-btn" onClick={() => handleStep(0.033)}> +1 frame </button>
                <button className="frame-btn" onClick={() => handleStep(0.1)}> +0.1s </button>
            </div>

            {/* Shows which tap comes next */}
            <p className="tap-label">{TAP_LABELS[nextTap]}</p>

            {/* If we still have timestamps we need to put down*/}
            {!isComplete && (
                <button className="tap-button" onClick={handleTap}>
                    TAP
                </button>
            )}

            <div className="timestamps">

                <div className="timestamp-row">
                    <span className="timestamp-label">🦵 Takeoff: </span>
                    <span className="timestamp-value">{takeoff !== null ? `${takeoff.toFixed(3)}s` : "-"}</span>
                </div>

                <div className="timestamp-row">
                    <span className="timestamp-label">🏐 Contact: </span>
                    <span className="timestamp-value">{contact !== null ? `${contact.toFixed(3)}s` : "-"} </span>
                </div>

                <div className="timestamp-row">
                    <span className="timestamp-label">🛬 Landing: </span>
                    <span className="timestamp-value">{landing !== null ? `${landing.toFixed(3)}s` : "-"} </span>
                </div>

            </div>

            {/* If we have all of our timestamps, then we show the results */}
            {isComplete && (
                <button className="see-results-btn" onClick={() => onComplete(takeoff, contact, landing)}>
                    See Results →
                </button>
            )}

            <div className="secondary-buttons">
                <button className="secondary-btn" onClick={reset}>Reset Taps</button>
                <button className="secondary-btn" onClick={onGoBack}> ← Pick a different video </button>
            </div>
        </div>
    )
}