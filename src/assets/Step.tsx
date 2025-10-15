import type { SVGProps } from "react"

const Step = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_3132_1020)">
                <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#FAFAFA" />
                <path d="M12 0.75C18.2132 0.75 23.25 5.7868 23.25 12C23.25 18.2132 18.2132 23.25 12 23.25C5.7868 23.25 0.75 18.2132 0.75 12C0.75 5.7868 5.7868 0.75 12 0.75Z" stroke="#E9EAEB" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="4" fill="#D5D7DA" />
            </g>
        </svg>
    )
}

export default Step