import { useLayoutEffect, useState } from 'react'
import './App.css'
import { Analytics } from "@vercel/analytics/react"

/* Component Imports */
import HomeScreen from './components/HomeScreen'
import VideoPlayback from './components/VideoPlayback';
import Results from "./components/Results";

const BOUNCE_EXIT_MS = 350;

export default function App() {
  const [screen, setScreen] = useState('home');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [timestamps, setTimestamps] = useState(null);
  const [transitionClass, setTransitionClass] = useState("");
  const [theme, setTheme] = useState("dark");

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("spike-timer-theme", theme);
  }, [theme]);

  const handleUpload = (file) => {
    setUploadedFile(file);
    setScreen("playback");
  };

  const handleRecord = () => {
    setScreen("recording")
  }

  const handleComplete = (takeoff, contact, landing) => {
    // squash the playback screen out, then pop the results screen in
    setTransitionClass("screen-exit-bounce");

    setTimeout(() => {
      setTimestamps({ takeoff, contact, landing });
      setScreen("results");
      setTransitionClass("screen-enter-bounce");
    }, BOUNCE_EXIT_MS);
  }

  const handleRetry = () => {
    setTimestamps(null);
    setTransitionClass("");
    setScreen("playback");
  }

  const handleGoHome = () => {
    setTimestamps(null);
    setUploadedFile(null);
    setTransitionClass("");
    setScreen("home")
  }


  return (
    <div className="app">
      <button
        className="theme-toggle"
        type="button"
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        onClick={() => setTheme((current) => current === "light" ? "dark" : "light")}
      >
        <span aria-hidden="true">{theme === "light" ? "☾" : "☀"}</span>
      </button>

      {screen === "home" && (
        <HomeScreen
          onRecord={handleRecord}
          onUpload={handleUpload}
        />
      )}

      {screen === "playback" && (
        <div className={transitionClass}>
          <VideoPlayback
          uploadedFile={uploadedFile}
          onGoBack={() => setScreen("home")}
          onComplete={handleComplete}
          />
        </div>
      )}

      {screen === "results" && timestamps && (
        <div
          className={transitionClass}
          onAnimationEnd={() => setTransitionClass("")}
        >
          <Results
          takeoff={timestamps.takeoff}
          contact={timestamps.contact}
          landing={timestamps.landing}
          onRetry={handleRetry}
          onGoHome={handleGoHome}
          />
        </div>
      )}

      {screen === "recording" && (
        <p>Recording screen coming soon...</p>
      )}


    </div>
  )

}
