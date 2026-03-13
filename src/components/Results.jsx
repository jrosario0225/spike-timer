import { calculateSpikeMetrics, getResultLabel } from "../utils/calculations"

export default function Results({ takeoff, contact, landing, onRetry }) {

    const metrics = calculateSpikeMetrics(takeoff, contact, landing);
    const resultLabel = getResultLabel(metrics.spikingDifference)

    return (
        <div className="results">
            <div className="quick-numbers">
                <h2>Spike Analysis</h2>
                {/* Shows if we're ontime, late or early*/}
                <h3>{resultLabel}</h3>

                {/* Accuracy */}
                <p> Accuracy: {metrics.accuracy.toFixed(1)}%</p>
            </div>

            <div className="all-numbers">
                <p>Airtime: {metrics.airtime.toFixed(3)}s</p>
                <p>Ideal Contact: {metrics.idealContact.toFixed(3)}s after takeoff</p>
                <p>Actual Contact: {metrics.actualContact.toFixed(3)}s after takeoff</p>
                <p>
                    Difference: {metrics.spikingDifference > 0 ? "+" : ""}
                    {metrics.spikingDifference.toFixed(3)}s
                </p>
            </div>

            <button onClick={onRetry}>
                ← Try Again
            </button>
        </div>
    )
}