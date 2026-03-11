import { useRef } from "react";
import "./HomeScreen.css";

export default function HomeScreen({ onRecord, onUpload }) {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) onUpload(file);
    };

    return (
        <div>

            <h2>Spike Timer</h2>
            <p>Analyze your spike timing</p>

            <button onClick={onRecord}>
                📷 Record a Jump
            </button>

            <button onClick={() => fileInputRef.current.click()}>
                 🎬 Upload Footage
            </button>


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