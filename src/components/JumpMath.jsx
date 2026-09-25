import "./JumpMath.css";

export default function JumpMath() {
    return (
        <div className="jump-math">
            <svg viewBox="0 0 300 130" className="jump-math-svg">
                {/* ground line */}
                <line x1="10" y1="105" x2="290" y2="105" stroke="var(--border)" strokeWidth="2" />

                {/* jump arc */}
                <path
                    d="M 30 105 Q 150 10 270 105"
                    fill="none"
                    stroke="var(--navy)"
                    strokeWidth="3"
                />

                {/* apex guideline */}
                <line x1="150" y1="10" x2="150" y2="105" stroke="var(--gold)" strokeWidth="2" strokeDasharray="4 4" />

                {/* takeoff point */}
                <circle cx="30" cy="105" r="5" fill="var(--navy)" />
                <text x="30" y="122" textAnchor="middle" className="jump-math-label">takeoff</text>

                {/* landing point */}
                <circle cx="270" cy="105" r="5" fill="var(--navy)" />
                <text x="270" y="122" textAnchor="middle" className="jump-math-label">landing</text>

                {/* apex / ideal contact point */}
                <circle cx="150" cy="10" r="5" fill="var(--gold)" />
                <text x="150" y="0" textAnchor="middle" className="jump-math-label jump-math-label-gold">ideal contact</text>

                {/* actual contact, offset to show early/late */}
                <circle cx="190" cy="34" r="5" fill="var(--orange)" />
                <text x="205" y="50" textAnchor="middle" className="jump-math-label jump-math-label-orange">your contact</text>
            </svg>

            <div className="jump-math-formulas">
                <div><span>airtime</span> = landing − takeoff</div>
                <div><span>ideal contact</span> = airtime ÷ 2</div>
                <div><span>difference</span> = your contact − ideal contact</div>
            </div>
        </div>
    );
}
