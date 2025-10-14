import type { SVGProps } from "react"

const X = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default X