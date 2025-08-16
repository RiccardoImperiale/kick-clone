import { SVGProps } from 'react'
export const LogoutIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="#fff" viewBox="0 0 16 16" {...props}>
        <g fill="currentColor" clipPath="url(#a)">
            <path d="M16 7h-3.62l1.81-1.81-1.41-1.41L8.55 8l4.23 4.22 1.41-1.41L12.38 9H16V7Z" />
            <path d="M7 14H4V2h3v2h2V0H0v16h9v-4H7v2Z" />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="currentColor" d="M0 0h16v16H0z" />
            </clipPath>
        </defs>
    </svg>
)
