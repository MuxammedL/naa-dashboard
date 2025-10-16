import { Icons } from "@/assets"
import type { LanguageMultiSelectProps } from "@/types/props"
import { useEffect, useRef, useState } from "react"

export const LanguageMultiSelect: React.FC<LanguageMultiSelectProps> = ({
    name,
    label,
    options,
    values,
    setFieldValue
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleToggle = (value: string): void => {
        const currentValues = values || []
        if (currentValues.includes(value)) {
            setFieldValue(name, currentValues.filter(v => v !== value))
        } else {
            setFieldValue(name, [...currentValues, value])
        }
    }

    const handleRemove = (value: string): void => {
        setFieldValue(name, values.filter(v => v !== value))
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-medium mb-1" id={label}>
                {label} <span className="text-error-message">*</span>
            </label>

            <div
                className="w-full min-h-[38px] px-3 py-2 border border-cloud-gray rounded-lg cursor-pointer flex flex-wrap gap-1 items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                {values && values.length > 0 ? (
                    values.map((value: string) => (
                        <div
                            key={value}
                            className="flex items-center gap-0.5 border border-cloud-gray text-sidebar-text-color px-[5px] py-[1px] rounded-md text-[12px] leading-[18px]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <span>{value}</span>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleRemove(value)
                                }}
                                className="text-[#A4A7AE] p-0.5 cursor-pointer"
                            >
                                <Icons.x width={12} height={12} />
                            </button>
                        </div>
                    ))
                ) : (
                    <span className="text-gray-400">Seçin</span>
                )}

                <div className="ml-auto">
                    <svg
                        className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {options.map((option: string) => {
                        const isSelected = values?.includes(option)
                        return (
                            <div
                                key={option}
                                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2 ${isSelected ? 'bg-blue-50' : ''
                                    }`}
                                onClick={() => handleToggle(option)}
                            >
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => { }}
                                    className="w-4 h-4"
                                />
                                <span>{option}</span>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}