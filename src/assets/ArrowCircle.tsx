import type { SVGProps } from "react"

const ArrowCircle = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_9_36945)">
                <path d="M1.94957 12.158C1.20713 9.3779 1.92645 6.2886 4.10753 4.10752C7.36189 0.853156 12.6383 0.853156 15.8926 4.10753C19.147 7.36189 19.147 12.6383 15.8926 15.8926C13.7116 18.0737 10.6223 18.793 7.84212 18.0506M12.5002 12.5002V7.50017M12.5002 7.50017H7.5002M12.5002 7.50017L4.16671 15.8335" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
            </g>
        </svg>
    )
}

export default ArrowCircle