import "./JumpMath.css";

export default function JumpMath() {
    return (
        <div className="jump-math">
            <svg viewBox="0 0 300 145" className="jump-math-svg" role="img" aria-label="Jump arc showing ideal contact at the apex and actual contact later on the descent">
                {/* ground line */}
                <line x1="10" y1="108" x2="290" y2="108" stroke="var(--border)" strokeWidth="2" />

                {/* Symmetric flight path with its apex at the midpoint. */}
                <path
                    d="M 30 108 C 70 68 110 48 150 48 C 190 48 230 68 270 108"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="3"
                />

                {/* The actual-contact guide shows its timing across the airtime. */}
                {/* <line x1="190" y1="57" x2="190" y2="108" stroke="var(--orange)" strokeWidth="1.5" strokeDasharray="4 4" /> */}
                {/* The ideal-contact guide marks the apex timing. */}
                <line x1="150" y1="48" x2="150" y2="108" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* takeoff point */}
                <circle cx="30" cy="108" r="5" fill="var(--primary)" />
                <text x="30" y="126" textAnchor="middle" className="jump-math-label">takeoff</text>

                {/* landing point */}
                <circle cx="270" cy="108" r="5" fill="var(--primary)" />
                <text x="270" y="126" textAnchor="middle" className="jump-math-label">landing</text>

                {/* Both contact markers sit directly on the illustrated trajectory. */}
                <circle cx="150" cy="48" r="5" fill="var(--gold)" />
                <text x="150" y="34" textAnchor="middle" className="jump-math-label jump-math-label-gold">ideal contact</text>
                <circle cx="190" cy="57" r="5" fill="var(--orange)" />
                <text x="210" y="43" textAnchor="middle" className="jump-math-label jump-math-label-orange">your contact</text>
            </svg>

            <div className="jump-math-formulas">
                <div><span>airtime</span> = landing − takeoff</div>
                <div><span>ideal contact</span> = airtime ÷ 2</div>
                <div><span>difference</span> = your contact − ideal contact</div>
            </div>
        </div>
    );
}