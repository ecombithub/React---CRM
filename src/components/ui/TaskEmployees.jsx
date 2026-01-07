import { useState, useRef, useEffect } from "react";
import { Users, X } from "lucide-react";

function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += ("00" + value.toString(16)).slice(-2);
    }
    return color;
}

function TaskEmployees({ selected = [], onChange, employees = [], className = "", showDropdown = true }) {
    const [show, setShow] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        if (!showDropdown) return; 

        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShow(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showDropdown]);

    const toggleEmployee = (id) => {
        if (selected.includes(id)) {
            onChange(selected.filter(e => e !== id));
        } else {
            onChange([...selected, id]);
        }
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => showDropdown && setShow(prev => !prev)}>
                {selected.length === 0 && <Users className="cursor-pointer text-gray-600 border border-gray-300 rounded p-[2px] bg-white" size={24} />}
                {selected.map(empId => {
                    const emp = employees.find(e => e._id === empId);
                    if (!emp) return null;
                    const name = emp.fullName || emp.username || "-";
                    const initials = name.split(" ").map(n => n[0]).join("").toUpperCase();
                    return (
                        <div
                            key={emp._id || emp.userId}
                            className="relative p-[5px] text-[10px] w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{ backgroundColor: stringToColor(emp._id || emp.userId), color: "white" }}
                        >
                            {initials}
                        </div>
                    );
                })}
            </div>

            {showDropdown && show && (
                <div className="absolute top-full mt-2  left-0 w-64 max-h-64 overflow-y-auto bg-white border rounded shadow-lg z-50 employes-dropdown">
                    {employees.map(emp => {
                        const isSelected = selected.includes(emp._id);
                        const name = emp.fullName || emp.username || "-";
                        const initials = name.split(" ").map(n => n[0]).join("").toUpperCase();

                        return (
                            <div
                                key={emp._id || emp.userId}
                                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 text-black relative group"
                                onClick={() => toggleEmployee(emp._id)}
                            >
                                <div
                                    className="w-7 h-7 p-[5px] text-[10px] rounded-full flex items-center justify-center text-xs font-bold"
                                    style={{
                                        backgroundColor: stringToColor(emp._id || emp.userId),
                                        color: "white",
                                        border: isSelected ? "2px solid #000" : "none"
                                    }}
                                >
                                    {initials}
                                </div>
                                <span className="text-[14px]">{name}</span>

                                {isSelected && (
                                    <span
                                        className="absolute p-[1px] top-3 left-7 -translate-y-1/2 hidden group-hover:flex items-center justify-center w-4 h-4 text-[10px] bg-red-500 text-white rounded-full cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleEmployee(emp._id);
                                        }}
                                    >
                                        <X />
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
export default TaskEmployees;