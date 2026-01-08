import { useEffect } from "react";
import { useUser } from "./Use-auth";

const BASE_URL = "http://localhost:5000";
const TAB_KEY = "active_tabs_count";

export default function HeartbeatAndAutoLogout() {
  const { data: user } = useUser();

  useEffect(() => {
    if (!user) return;

    // Increment active tab count in localStorage
    let tabs = Number(localStorage.getItem(TAB_KEY) || 0);
    localStorage.setItem(TAB_KEY, (tabs + 1).toString());

    const handleBeforeUnload = () => {
      let tabs = Number(localStorage.getItem(TAB_KEY) || 1);
      tabs = Math.max(tabs - 1, 0);
      localStorage.setItem(TAB_KEY, tabs.toString());

      // Only logout if this is the last tab
      if (tabs === 0) {
        const url = `${BASE_URL}/api/logout`;
        const data = JSON.stringify({ userId: user.userId });

        if (navigator.sendBeacon) {
          navigator.sendBeacon(url, new Blob([data], { type: "application/json" }));
        } else {
          fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: data,
            keepalive: true,
          });
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up on unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);

      let tabs = Number(localStorage.getItem(TAB_KEY) || 1);
      tabs = Math.max(tabs - 1, 0);
      localStorage.setItem(TAB_KEY, tabs.toString());
    };
  }, [user]);

  return null;
}
