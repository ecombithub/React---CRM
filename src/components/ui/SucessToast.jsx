import { useEffect, useState } from "react";

export default function SucessToast({ message, type = "success", duration = 4000, onClose }) {
    const [visible, setVisible] = useState(!!message);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                if (onClose) onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration, onClose]);

    const bgColor = type === "error" ? "bg-red-500/90" : "bg-green-500/90";
    const textColor = "text-white";

    return (
        <div
            className={`fixed right-8 bottom-8 ${bgColor} ${textColor} text-sm shadow-md rounded-lg px-6 py-4 transition-all duration-500 ease-out
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
            style={{ zIndex: 9999 }}
        >
            {message}
        </div>
    );
}
