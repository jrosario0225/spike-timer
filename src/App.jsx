import { useState, React } from 'react'
import './App.css'

/* Component Imports */
import HomeScreen from './components/HomeScreen'

export default function App() {
  const [screen, setScreen] = useState('home');
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleUpload = (file) => {
    setUploadedFile(file);
    setScreen("playback");
  };

  const handleRecord = () => {
    setScreen("recording")
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
        <p>Playback screen coming soon...</p>
      )}

      {screen === "recording" && (
        <p>Recording screen coming soon...</p>
      )}


    </div>
  )

}

