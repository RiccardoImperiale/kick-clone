import { SVGProps } from 'react'
export const CameraOffIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
        <path
            fill="#000000ff"
            d="M18 9.566a1 1 0 0 1 .485-.857l3-1.8A1 1 0 0 1 23 7.766v9.468a1 1 0 0 1-1.515.857l-3-1.8a1 1 0 0 1-.485-.857V9.566Z"
        />
        <path
            fill="#000000ff"
            fillRule="evenodd"
            d="M15.212 6.667A3.982 3.982 0 0 0 13 6H3a2 2 0 0 0-2 2v7a4 4 0 0 0 2.27 3.608L15.213 6.667ZM7.122 19H15a2 2 0 0 0 2-2v-7c0-.274-.027-.54-.08-.799L7.121 19Z"
            clipRule="evenodd"
        />
        <path stroke="#080808ff" strokeLinecap="round" strokeWidth={1.5} d="M22 2 2 22" />
    </svg>
)
