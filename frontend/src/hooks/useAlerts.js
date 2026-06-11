
import { useState, useEffect } from "react";
import { useSocket } from "./useSocket";

export function useAlerts() {
  const [alerts, setAlerts] = useState([]);
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleAlert = (alert) => {
      setAlerts((prev) => [alert, ...prev]);
    };

    socket.on("alert", handleAlert);

    return () => {
      socket.off("alert", handleAlert);
    };
  }, [socket]);

  return { alerts, setAlerts };
}
