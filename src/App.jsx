import { useState, React } from 'react'
import './App.css'

/* Component Imports */
import HomeScreen from './components/HomeScreen'

export default function App() {
  const [screen, setScreen] = useState('Home');
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
      <HomeScreen 
      onRecord={handleRecord}
      onUpload={handleUpload}
      />
    </div>
  )
   
}

