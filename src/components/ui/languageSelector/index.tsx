import { Icons } from "@/assets";
import { LANGUAGES } from "@/constant/languages";
import type { LanguageCode } from "@/types/types";
import { useEffect, useRef, useState } from "react";




const LanguageSelector = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState<LanguageCode>("en");
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLanguageChange = (langCode: LanguageCode) => {
        setSelectedLang(langCode);
        setIsOpen(false);
    };

    const toggleDropdown = () => setIsOpen(!isOpen);

    const selectedLanguage = LANGUAGES.find((lang) => lang.code === selectedLang);

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="flex items-center py-2 text-white h-9"
                aria-label="Select language"
                aria-expanded={isOpen}
            >
                <span className="font-semibold label1">
                    {selectedLanguage?.code.toUpperCase()}
                </span>
                <Icons.chevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} width={20} height={20} />
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-16 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden"
                    role="menu"
                    aria-orientation="vertical"
                >
                    {LANGUAGES.map((lang) => {
                        const isSelected = selectedLang === lang.code;
                        return (
                            <button
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code)}
                                className={
                                    `w-full flex items-center gap-3 px-2 py-3 text-left hover:bg-blue-50 transition-colors`
                                }
                                role="menuitem"
                                lang={lang.code}
                            >
                                <div className="font-medium text-gray-900">{lang.name}</div>
                                {isSelected && <Icons.done width={14} height={14} />}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;