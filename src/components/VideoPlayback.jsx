import { useRef, useEffect, useState } from "react";
import { useTimestamps } from "../hooks/useTimestamps";
import "./VideoPlayback.css"

export default function VideoPlayback({ uploadedFile, onGoBack, onComplete }) {
    const videoRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (!videoRef.current) return;

        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    }

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
            const videoUrl = URL.createObjectURL(uploadedFile);
            videoRef.current.src = videoUrl;
            return () => URL.revokeObjectURL(videoUrl);
        }
    }, [uploadedFile]);


    // from hook
    const handleTap = () => {
        if (!videoRef.current || isComplete) return;
        recordTap(videoRef.current.currentTime)
    };

    const TAP_LABELS = {
        takeoff: "Tap at Takeoff",
        contact: "Tap at Ball Contact",
        landing: "Tap at Landing",
        done: "All moments recorded",
    }

    const stepNumber = nextTap === "takeoff" ? 1 : nextTap === "contact" ? 2 : 3;

    const handleStep = (seconds) => {
        if (!videoRef.current) return;
        videoRef.current.currentTime += seconds;
    }



    return (
        <div className="playback-container">
            <div className="playback-heading">
                <h2 className="playback-title">Analyze Your Spike</h2>
                <span className="playback-step">{stepNumber} / 3</span>
            </div>
            <p className="playback-filename">{uploadedFile?.name}</p> {/* Takes the file name AND checks "hey is this a file"*/}

            <video
                ref={videoRef}
                playsInline
                style={{ width: "100%" }}
                className="playback-video"
            />




            <div className="frame-buttons">
                <button className="frame-btn" onClick={() => handleStep(-0.2)}> -0.2s </button>
                <button className="frame-btn" onClick={() => handleStep(-0.033)}> -1 frame </button>
                            <button className="frame-btn" onClick={togglePlay}> {isPlaying ? "⏸ Pause" : "▶ Play"} </button>
                <button className="frame-btn" onClick={() => handleStep(0.033)}> +1 frame </button>
                <button className="frame-btn" onClick={() => handleStep(0.2)}> +0.2s </button>
            </div>

            <div className="tap-panel">
                <div>
                    <span className="tap-eyebrow">MARK THIS MOMENT</span>
                    <p className="tap-label">{TAP_LABELS[nextTap]}</p>
                </div>
                {!isComplete && <span className="tap-step">{stepNumber} / 3</span>}
                {!isComplete && (
                    <button className="tap-button" onClick={handleTap}>TAP</button>
                )}
                {isComplete && (
                    <button className="see-results-btn" onClick={() => onComplete(takeoff, contact, landing)}>
                        See Results →
                    </button>
                )}
            </div>

            <div className="timestamps">

                <div className="timestamp-row">
                    <span className="timestamp-label">Takeoff</span>
                    <span className="timestamp-value">{takeoff !== null ? `${takeoff.toFixed(3)}s` : "-"}</span>
                </div>

                <div className="timestamp-row">
                    <span className="timestamp-label">Contact</span>
                    <span className="timestamp-value">{contact !== null ? `${contact.toFixed(3)}s` : "-"} </span>
                </div>

                <div className="timestamp-row">
                    <span className="timestamp-label">Landing</span>
                    <span className="timestamp-value">{landing !== null ? `${landing.toFixed(3)}s` : "-"} </span>
                </div>

            </div>

            <div className="secondary-buttons">
                <button className="secondary-btn" onClick={reset}>Reset taps</button>
                <button className="secondary-btn" onClick={onGoBack}>Pick a different video</button>
            </div>
        </div>
    )
}
