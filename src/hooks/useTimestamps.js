import { useState, useCallback } from "react";

export function useTimestamps() {

    const [takeoff, setTakeoff] = useState(null);
    const [contact, setContact] = useState(null);
    const [landing, setLanding] = useState(null);

    const nextTap =
        takeoff === null ? "takeoff" :
            contact === null ? "contact" :
                landing === null ? "landing" :
                    "done";

    const recordTap = useCallback((currentTime) => {
        if (takeoff === null) {
            setTakeoff(currentTime);
        } else if (contact === null) {
            setContact(currentTime);
        } else if (landing === null) {
            setLanding(currentTime)
        }
    }, [takeoff, contact, landing]);

    const reset = useCallback(() => {
        setTakeoff(null)
        setContact(null)
        setLanding(null);
    }, [])

    const isComplete = takeoff !== null && contact !== null && landing !== null;

    return {
        takeoff,
        contact,
        landing,
        nextTap,
        isComplete,
        recordTap,
        reset
    }
};