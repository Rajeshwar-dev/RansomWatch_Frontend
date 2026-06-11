
import { useState, useEffect } from "react";
import { useSocket } from "./useSocket";

export function useThreatScore() {
  const [score, setScore] = useState(0);
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleThreatScore = (data) => {
      setScore(data.threatScore);
    };

    socket.on("threatScore", handleThreatScore);

    return () => {
      socket.off("threatScore", handleThreatScore);
    };
  }, [socket]);

  return { threatScore: score };
}
