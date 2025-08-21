import { useState, useEffect } from 'react'
import { PageNavigation } from './PageNavigation'

export interface IPageTabs {
    name: string
    isActive?: boolean
    // quantity?: number
}

interface PageNavigationCtrlProps {
    tabs: IPageTabs[]
    activeTab: string
    setActiveTab: (tab: string) => void
}

export const PageNavigationCtrl = ({ tabs: initialTabs, activeTab, setActiveTab }: PageNavigationCtrlProps) => {
    const [tabs, setTabs] = useState<IPageTabs[]>([])

    useEffect(() => {
        setTabs(
            initialTabs.map(tab => ({
                ...tab,
                isActive: tab.name === activeTab,
            }))
        )
    }, [activeTab, initialTabs])

    const handleTabChange = (tabName: string) => {
        setActiveTab(tabName)
    }

    return <PageNavigation tabs={tabs} onTabClick={handleTabChange} />
}
