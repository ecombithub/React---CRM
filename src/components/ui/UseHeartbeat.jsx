import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../lib/api";

export function useHeartbeat() {
    const heartbeat = useMutation({
        mutationFn: async () => {
            await fetch(api.auth.heartbeat.path, {
                method: api.auth.heartbeat.method,
                credentials: "include",
            });
        },
    });

    const setLastActive = useMutation({
        mutationFn: async () => {
            if (!navigator.sendBeacon) {
                return fetch(api.auth.setLastActive.path, {
                    method: "POST",
                    credentials: "include",
                });
            }

            navigator.sendBeacon(api.auth.setLastActive.path);
        },
    });

    useEffect(() => {
        const TAB_KEY = "active_tabs_count";

        let count = Number(localStorage.getItem(TAB_KEY) || 0);
        localStorage.setItem(TAB_KEY, count + 1);

        const interval = setInterval(() => {
            heartbeat.mutate();
        }, 5000);

        return () => {
            clearInterval(interval);

            let c = Number(localStorage.getItem(TAB_KEY) || 1);
            c = Math.max(0, c - 1);
            localStorage.setItem(TAB_KEY, c);
            if (c === 0) {
                setLastActive.mutate();
            }
        };
    }, []);
}
