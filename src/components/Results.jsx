import { calculateSpikeMetrics, getResultLabel } from "../utils/calculations"
import "./Results.css";

export default function Results({ takeoff, contact, landing, onRetry, onGoHome }) {

    const metrics = calculateSpikeMetrics(takeoff, contact, landing);
    const resultLabel = getResultLabel(metrics.spikingDifference)

    const isPerfect = resultLabel === "Perfect";
    const displayLabel = isPerfect ? "Perfect" : `Approached ${resultLabel}`;
    const difference = Math.abs(metrics.spikingDifference);
    const timingPhrase = isPerfect
        ? `${Math.round(difference * 1000)} ms from apex`
        : `${Math.round(difference * 1000)} ms ${metrics.spikingDifference < 0 ? "before" : "after"} apex`;
    const accuracy = Math.max(0, Math.min(100, metrics.accuracy));
    const contactProgress = metrics.airtime > 0
        ? Math.max(0, Math.min(1, metrics.actualContact / metrics.airtime))
        : 0.5;
    const actualX = 30 + contactProgress * 260;
    const actualY = 110 - 200 * contactProgress * (1 - contactProgress);

    return (
        <main className="results-container">
            <header className="results-header">
                <p className="results-kicker">RESULTS — REFINED</p>
                <div className="results-heading-row">
                    <div>
                        <h1 className="results-label">{displayLabel}</h1>
                        <p className="results-summary">{timingPhrase}</p>
                    </div>
                    <strong className="results-diff">
                        {metrics.spikingDifference > 0 ? "+" : metrics.spikingDifference < 0 ? "−" : ""}{difference.toFixed(3)}s
                    </strong>
                </div>
            </header>

            <section className="result-card contact-card" aria-labelledby="contact-timing-title">
                <h2 id="contact-timing-title" className="card-heading">CONTACT TIMING · AFTER TAKEOFF</h2>
                <svg className="contact-chart" viewBox="0 0 320 140" role="img" aria-label={`Ideal contact ${metrics.idealContact.toFixed(3)} seconds, actual contact ${metrics.actualContact.toFixed(3)} seconds after takeoff`}>
                    <line x1="30" y1="110" x2="290" y2="110" className="chart-ground" />
                    <path d="M30 110 Q160 10 290 110" className="chart-arc" />
                    <line x1="160" y1="60" x2="160" y2="110" className="chart-guide" />
                    <circle cx="160" cy="60" r="6" className="ideal-marker" />
                    <circle cx={actualX} cy={actualY} r="6" className="actual-marker" />
                    <text x="30" y="132" className="chart-label">TAKEOFF</text>
                    <text x="290" y="132" textAnchor="end" className="chart-label">LANDING</text>
                </svg>
                <div className="contact-legend">
                    <span><i className="legend-swatch ideal-swatch" />Ideal {metrics.idealContact.toFixed(3)}s</span>
                    <span><i className="legend-swatch actual-swatch" />Actual {metrics.actualContact.toFixed(3)}s</span>
                </div>
            </section>

            <section className="result-card accuracy-card">
                <div className="accuracy-ring" style={{ "--accuracy": `${accuracy}%` }}>
                    <strong>{accuracy.toFixed(0)}%</strong>
                </div>
                <div className="accuracy-copy">
                    <p className="card-heading">TIMING ACCURACY</p>
                    <strong>{difference.toFixed(3)}s off ideal</strong>
                    <span>Airtime {metrics.airtime.toFixed(3)}s · ideal at midpoint</span>
                </div>
            </section>

            <section className="result-card timing-list" aria-label="Recorded timestamps">
                <div className="timing-row"><span>Takeoff</span><strong>{takeoff.toFixed(3)}s</strong></div>
                <div className="timing-row"><span>Ball contact</span><strong>{contact.toFixed(3)}s</strong></div>
                <div className="timing-row"><span>Landing</span><strong>{landing.toFixed(3)}s</strong></div>
            </section>

            <div className="go-back-btns">
                <button className="retry" onClick={onRetry}>Redo video</button>
                <button className="go-homescreen" onClick={onGoHome}>Analyze another</button>
            </div>
        </main>
    )
}
