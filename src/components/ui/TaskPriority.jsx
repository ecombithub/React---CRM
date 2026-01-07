import { useState, useRef, useEffect } from "react";
import { Flag, Check, Ban } from "lucide-react";

const colors = {
    urgent: "text-red-600",
    high: "text-orange-500",
    normal: "text-blue-600",
    low: "text-green-600",
};

const bgColors = {
    urgent: "bg-red-100",
    high: "bg-orange-100",
    normal: "bg-blue-100",
    low: "bg-green-100",
};

const labels = {
    urgent: "Urgent",
    high: "High",
    normal: "Normal",
    low: "Low",
};

const levels = [
    { key: "urgent", label: "Urgent" },
    { key: "high", label: "High" },
    { key: "normal", label: "Normal" },
    { key: "low", label: "Low" },
];

export default function TaskPriority({ value, onChange, showclear = true }) {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        if (!showclear) return;
        function handle(e) {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener("mousedown", handle);
        return () => document.removeEventListener("mousedown", handle);
    }, [showclear]);

    return (
        <div className="relative inline-flex" ref={ref}>
            <div
                onClick={() => showclear && setOpen(p => !p)}
                className={`cursor-pointer inline-flex items-center gap-2 rounded p-[2px] bg-white
                 ${value ? "" : "border border-gray-300"}
                 ${value ? bgColors[value] : ""}
                 `}>
                <Flag
                    size={18}
                    className={value ? colors[value] : "text-gray-500"}
                />

                {value && (
                    <span className="capitalize text-sm">
                        {labels[value]}
                    </span>
                )}
            </div>

            {showclear && open && (
                <div className="absolute mt-2 w-44 bg-white border rounded shadow z-50 top-[25px]">
                    {levels.map(l => (
                        <div
                            key={l.key}
                            onClick={() => {
                                onChange(l.key);
                                setOpen(false);
                            }}
                            className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-100"
                        >
                            <div className="flex items-center gap-2">
                                <Flag size={16} className={colors[l.key]} />
                                <span className="text-sm">{l.label}</span>
                            </div>

                            {value === l.key && (
                                <Check size={16} className="text-purple-600" />
                            )}
                        </div>
                    ))}

                    <div className="border-t my-1"></div>
                    <div
                        onClick={() => {
                            onChange("");
                            setOpen(false);
                        }}
                        className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-red-100 text-red-600"
                    >
                        <Ban size={16} />
                        <span className="text-sm">Clear</span>
                    </div>
                </div>
            )}
        </div>
    );
}