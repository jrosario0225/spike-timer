import "./JumpMath.css";

export default function JumpMath() {
    return (
        <div className="jump-math">
            <svg
                viewBox="0 0 300 145"
                className="jump-math-svg"
                role="img"
                aria-label="Jump arc with ideal contact at the apex and actual contact later on the descent"
            >
                <line x1="10" y1="108" x2="290" y2="108" stroke="var(--border)" strokeWidth="2" />

                <path
                    className="jump-math-arc"
                    pathLength="1"
                    d="M 30 108 C 70 68 110 48 150 48 C 190 48 230 68 270 108"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="3"
                />

                <line className="timing-boundary" x1="142" y1="28" x2="142" y2="108" />
                <line className="timing-boundary" x1="158" y1="28" x2="158" y2="108" />
                <line className="jump-math-endpoint-guide" x1="30" y1="28" x2="30" y2="108" />
                <line className="jump-math-endpoint-guide" x1="270" y1="28" x2="270" y2="108" />
                <text x="76" y="16" textAnchor="middle" className="timing-region-label">APPROACHED LATE</text>
                <text x="150" y="16" textAnchor="middle" className="timing-region-label">PERFECT</text>
                <text x="224" y="16" textAnchor="middle" className="timing-region-label">APPROACHED EARLY</text>

                <circle className="jump-math-endpoint" cx="30" cy="108" r="5" fill="var(--primary)" />
                <text x="30" y="126" textAnchor="middle" className="jump-math-label">takeoff</text>
                <circle className="jump-math-endpoint" cx="270" cy="108" r="5" fill="var(--primary)" />
                <text x="270" y="126" textAnchor="middle" className="jump-math-label">landing</text>

                <circle className="jump-math-ideal-dot" cx="150" cy="48" r="5" fill="var(--gold)" />
                <text x="150" y="72" textAnchor="middle" className="jump-math-label jump-math-label-gold jump-math-ideal-label">
                    ideal contact
                </text>

                <circle className="jump-math-actual-dot" cx="190" cy="55" r="5" fill="var(--orange)" />
                <text x="203" y="47" textAnchor="start" className="jump-math-label jump-math-label-orange jump-math-actual-label">
                    your contact
                </text>
            </svg>

            <div className="jump-math-formulas">
                <div><span>airtime</span> = landing − takeoff</div>
                <div><span>ideal contact</span> = airtime ÷ 2</div>
                <div><span>difference</span> = your contact − ideal contact</div>
            </div>
        </div>
    );
}
