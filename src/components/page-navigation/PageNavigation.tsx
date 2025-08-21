// PageNavigation.tsx
import { useEffect, useRef, useState } from 'react'
import styles from './PageNavigation.module.scss'
import { IPageTabs } from './PageNavigationCtrl'

interface PageNavigationProps {
    tabs: IPageTabs[]
    onTabClick: (tabName: string) => void
}

export const PageNavigation = ({ tabs, onTabClick }: PageNavigationProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [lineStyle, setLineStyle] = useState({ left: 0, width: 0 })

    useEffect(() => {
        const activeIndex = tabs.findIndex(tab => tab.isActive)
        if (activeIndex !== -1 && containerRef.current) {
            const tabEl = containerRef.current.children[activeIndex] as HTMLElement
            setLineStyle({ left: tabEl.offsetLeft, width: tabEl.offsetWidth })
        }
    }, [tabs])

    return (
        <div className={styles.pageNavBar} ref={containerRef}>
            {tabs.map(tab => (
                <div key={tab.name} onClick={() => onTabClick(tab.name)} className={`${styles.tab} ${tab.isActive ? styles.active : ''}`}>
                    <span>{tab.name}</span>
                </div>
            ))}
            <div className={styles.activeLine} style={{ left: lineStyle.left, width: lineStyle.width }} />
        </div>
    )
}
