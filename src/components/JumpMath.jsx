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

                <line
                    className="jump-math-ideal-guide"
                    x1="150" y1="48" x2="150" y2="108"
                    stroke="var(--gold)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                />

                <circle className="jump-math-endpoint" cx="30" cy="108" r="5" fill="var(--primary)" />
                <text x="30" y="126" textAnchor="middle" className="jump-math-label">takeoff</text>
                <circle className="jump-math-endpoint" cx="270" cy="108" r="5" fill="var(--primary)" />
                <text x="270" y="126" textAnchor="middle" className="jump-math-label">landing</text>

                <circle className="jump-math-ideal-dot" cx="150" cy="48" r="5" fill="var(--gold)" />
                <text x="150" y="34" textAnchor="middle" className="jump-math-label jump-math-label-gold jump-math-ideal-label">
                    ideal contact
                </text>

                <circle className="jump-math-actual-dot" cx="190" cy="55" r="5" fill="var(--orange)" />
                <text x="210" y="41" textAnchor="middle" className="jump-math-label jump-math-label-orange jump-math-actual-label">
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
