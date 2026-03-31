import { useState, React } from 'react'
import './App.css'
import { Analytics } from "@vercel/analytics/react"

/* Component Imports */
import HomeScreen from './components/HomeScreen'
import VideoPlayback from './components/VideoPlayback';
import Results from "./components/Results";

export default function App() {
  const [screen, setScreen] = useState('home');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [timestamps, setTimestamps] = useState(null);

  const handleUpload = (file) => {
    setUploadedFile(file);
    setScreen("playback");
  };

  const handleRecord = () => {
    setScreen("recording")
  }

  const handleComplete = (takeoff, contact, landing) => {
    setTimestamps({ takeoff, contact, landing })
    setScreen("results");
  }

  const handleRetry = () => {
    setTimestamps(null);
    setScreen("playback");
  }

  const handleGoHome = () => {
    setTimestamps(null);
    setUploadedFile(null);
    setScreen("home")
  }


  return (
    <div className="app">

      {screen === "home" && (
        <HomeScreen
          onRecord={handleRecord}
          onUpload={handleUpload}
        />
      )}

      {screen === "playback" && (
        <VideoPlayback
        uploadedFile={uploadedFile}
        onGoBack={() => setScreen("home")}
        onComplete={handleComplete}
        />
      )}

      {screen === "results" && timestamps && (
        <Results
        takeoff={timestamps.takeoff}
        contact={timestamps.contact}
        landing={timestamps.landing}
        onRetry={handleRetry}
        onGoHome={handleGoHome}
        />
      )}

      {screen === "recording" && (
        <p>Recording screen coming soon...</p>
      )}


    </div>
  )

}

