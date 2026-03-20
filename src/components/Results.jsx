import { calculateSpikeMetrics, getResultLabel } from "../utils/calculations"
import "./Results.css";

export default function Results({ takeoff, contact, landing, onRetry, onGoHome }) {

    const metrics = calculateSpikeMetrics(takeoff, contact, landing);
    const resultLabel = getResultLabel(metrics.spikingDifference)

    const isPerfect = resultLabel === "Perfect";

    const headerStyle = {
        background: isPerfect ? "#166534" : "var(--surface)",
        color: isPerfect ? "#ffffff" : "var(--navy)"
    }

    return (
        <div className="results-container">

            {/* Results Header */}
            <div className="results-header" style={headerStyle}>
                <h3 className="results-label">{resultLabel}</h3>
                <p className="results-diff">
                    Difference: {metrics.spikingDifference > 0 ? "+" : ""}
                    {metrics.spikingDifference.toFixed(3)}s
                </p>
            </div>


            {/* Specific Numbers */}
            <div className="specific-numbers">

                <div className="specific-number-row">
                    <span className="specific-number-label">Airtime: </span>
                    <span className="specific-number-value">{metrics.airtime.toFixed(3)}s</span>
                </div>

                <div className="specific-number-row">
                    <span className="specific-number-label">Ideal Contact (after takeoff): </span>
                    <span className="specific-number-value">{metrics.idealContact.toFixed(3)}s</span>
                </div>

                <div className="specific-number-row">
                    <span className="specific-number-label">Actual Contact (after takeoff): </span>
                    <span className="specific-number-value">{metrics.actualContact.toFixed(3)}s</span>
                </div>
            </div>


            {/* Accuracy */}
            <div className="accuracy">
                <p className="accuracy-label">Timing Accuracy: </p>
                <p className="accuracy-value">{metrics.accuracy.toFixed(1)}%</p>
            </div>


            <div className="go-back-btns">
                <button className="retry" onClick={onRetry}>
                    ← Try Again
                </button>
                <button className="go-homescreen" onClick={onGoHome}>
                    Upload New Video
                </button>
            </div>
        </div>
    )
}