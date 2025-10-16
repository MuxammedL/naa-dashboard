import { useState, useEffect, useRef, useCallback } from "react"
import { Icons } from "@/assets"
import type { SubjectSelectorProps } from "@/types/props"



const SubjectSelector: React.FC<SubjectSelectorProps> = ({
    name,
    label,
    availableSubjects,
    selectedSubjects,
    setFieldValue,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const filteredSubjects = availableSubjects.filter((subject) =>
        subject.toLowerCase().includes(searchQuery.toLowerCase())
    )

    useEffect(() => {
        if (searchQuery.trim()) {
            setIsOpen(true)
        }
    }, [searchQuery])

    const handleToggle = (subject: string): void => {
        const currentSubjects = selectedSubjects || []
        const newSubjects = currentSubjects.includes(subject)
            ? currentSubjects.filter((s) => s !== subject)
            : [...currentSubjects, subject]

        setFieldValue(name, newSubjects)
    }

    const handleRemove = (subject: string): void => {
        const newSubjects = (selectedSubjects || []).filter((s) => s !== subject)
        setFieldValue(name, newSubjects)
    }

    const handleInputFocus = useCallback(() => {
        setIsOpen(true);
    }, []);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        if (!isOpen) setIsOpen(true);
    }, [isOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
            <div className="flex items-center justify-between mb-1.5">
                <label className="block label1 font-medium text-sidebar-text-color">
                    {label}
                </label>
            </div>
            <div className="relative w-fit">
                <div>
                    <div className="relative w-fit">
                        <Icons.search
                            width={18}
                            height={18}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onFocus={handleInputFocus}
                            placeholder="Axtar"
                            className="w-[360px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none label1"
                        />
                    </div>
                </div>
                <div className={`${isOpen ? "block" : "hidden"}`}>
                    <div className="overflow-hidden">
                        <div className="max-h-80 overflow-y-auto absolute top-10 w-full bg-white border border-cloud-gray rounded-lg flex flex-col gap-0.5">
                            {filteredSubjects.length > 0 ? (
                                <div className="p-2">
                                    {filteredSubjects.map((subject) => {
                                        const isSelected = selectedSubjects.includes(subject)
                                        return (
                                            <label
                                                key={subject}
                                                className={`flex items-center gap-2 px-3 py-2.5 rounded-md cursor-pointer hover:bg-gray-50`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => handleToggle(subject)}
                                                    className="w-4 h-4 shrink-0 text-blue-600 rounded-lg border-gray-300 focus:ring-blue-500"
                                                />
                                                <span className="text-sm text-gray-700">{subject}</span>
                                            </label>
                                        )
                                    })}
                                </div>
                            ) : (
                                <div className="p-8 text-center text-gray-500">
                                    <p>Heç bir nəticə tapılmadı</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {selectedSubjects.length > 0 && (
                <ul className="space-y-2.5 mt-3">
                    {selectedSubjects.map((subject, index) => (
                        <li key={subject} className="flex items-center justify-between label1 font-medium">
                            <span className="flex items-start gap-2 text-sidebar-text-color">
                                <span>{index + 1}.</span>
                                <span>{subject}</span>
                            </span>
                            <button
                                type="button"
                                onClick={() => handleRemove(subject)}
                                className="text-[#A4A7AE] cursor-pointer"
                            >
                                <Icons.x width={20} height={20} />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SubjectSelector