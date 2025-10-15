import type { SVGProps } from "react"

const LeftArrow = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.6668 10H3.3335M3.3335 10L8.3335 15M3.3335 10L8.3335 5" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default LeftArrow