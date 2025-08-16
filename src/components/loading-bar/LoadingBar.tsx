'use client'
import { useEffect, useState } from 'react'
import styles from './LoadingBar.module.scss'

interface ILoadingBarProps {
    isLoading: boolean
}

const TIMEOUT = 400

export const LoadingBar = ({ isLoading }: ILoadingBarProps) => {
    const [loaderState, setLoaderState] = useState('')

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null

        if (isLoading) {
            setLoaderState('full')
        } else {
            if (loaderState === 'full') {
                timeoutId = setTimeout(() => {
                    setLoaderState('shrink')
                }, TIMEOUT)
            } else if (loaderState === 'shrink') {
                timeoutId = setTimeout(() => {
                    setLoaderState('')
                }, TIMEOUT)
            }
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
        }
    }, [isLoading, loaderState])

    return <div className={`${styles.loader} ${styles[loaderState]}`} />
}
