import type { SVGProps } from "react"

const DoneCircle = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg {...props} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.6667 9.23806V10.0047C18.6656 11.8017 18.0838 13.5503 17.0078 14.9896C15.9318 16.4289 14.4194 17.4818 12.6961 17.9913C10.9729 18.5008 9.13105 18.4396 7.44539 17.8169C5.75973 17.1941 4.32055 16.0431 3.34247 14.5356C2.36439 13.0281 1.89983 11.2448 2.01806 9.45166C2.1363 7.65853 2.83101 5.95167 3.99857 4.58562C5.16613 3.21958 6.74399 2.26755 8.49682 1.87152C10.2497 1.47549 12.0836 1.65668 13.725 2.38806M18.6667 3.33329L10.3333 11.675L7.83333 9.17496" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default DoneCircle