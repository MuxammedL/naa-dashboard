import type { SVGProps } from "react"

const InfoCircle = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg {...props} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_9_37698)">
                <path d="M6 8V6M6 4H6.005M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </g>
        </svg>
    )
}

export default InfoCircle