import { useRef } from "react";
import "./HomeScreen.css"

export default function HomeScreen({ onRecord, onUpload }) {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) onUpload(file);
    };

    return (
        <div className="home-container">

            <div>
                <h1 className="home-title">Spike Analyzer</h1>
                <p className="home-subtitle">Analyze your spike timing</p>
            </div>


            <div className="home-cards">
                { /* record button */}
                <button className="home-card" onClick={onRecord}>
                    <span className="card-icon">📷</span>
                    <div className="card-title">Record your spike</div>
                    <h3>(WIP)</h3>
                    <span className="card-arrow">→</span>
                </button>


                { /* upload button */}
                <button className="home-card" onClick={() => fileInputRef.current.click()}>
                    <span className="card-icon">🎬</span>
                    <div className="card-title">Upload footage</div>
                    <span className="card-arrow">→</span>
                </button>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
            />

        </div>
    )

}