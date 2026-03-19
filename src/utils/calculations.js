
export function calculateSpikeMetrics(takeoff, contact, landing) {

    const airtime = landing - takeoff;
    const idealContact = airtime / 2; // calculated
    const actualContact = contact - takeoff; // expected
    const spikingDifference = actualContact - idealContact;

    // if the expected > calculated --> late
    // if the expected < calculated --> early
    // if the expected == calculated --> perfect

    const accuracy = Math.max(0, (1- Math.abs(spikingDifference) / airtime) * 100);
    // 100% = perfect hit
    // Math.max(0) make sure we never go below 0%

    return {
        airtime: round(airtime),
        idealContact: round(idealContact),
        actualContact: round(actualContact),
        spikingDifference: round(spikingDifference),
        accuracy: round(accuracy)
    }
};

export function getResultLabel(spikingDifference) {
    const PERFECT_WINDOW = 0.05; // withing 50ms = perfect

    if (Math.abs(spikingDifference) <= PERFECT_WINDOW) return "Perfect";
    if (spikingDifference < 0) return "Late";
    return "Early";
}

function round(n) {
    return Math.round(n * 1000) / 1000; // 3 decimal places
}