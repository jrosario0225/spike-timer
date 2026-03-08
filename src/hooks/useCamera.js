import { useRef, useState, useCallback } from "react";

export function useCamera() {
    const videoRef = useRef(null);
    const streamRef = useRef(null); 
    
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState(null);

    const startCamera = useCallback(async () => {
        try {
            setError(null);
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "environment",
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                },
                audio: false,
            });

            streamRef.current = stream;

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }

            setIsStreaming(true);
        } catch (err) {
            setError("Camera access denied. Please allow camera permissions");
            console.error("Camera error:", err)
        }
    }, []);


    const stopCamera = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
        setIsStreaming(false);
    }, [])

    return {
        videoRef,
        isStreaming,
        error,
        startCamera,
        stopCamera,
    };

}

