import { SVGProps } from 'react'
export const CardCorner = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="none" viewBox="0 0 12 12" {...props}>
        <path fill="#53FC18" d="M8 0h4v12H8V0Z" />
        <path fill="#53FC18" d="M12 8v4H0V8h12Z" />
    </svg>
)
