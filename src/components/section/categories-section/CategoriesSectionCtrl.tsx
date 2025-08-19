'use client'

import { useEffect, useState } from 'react'
import styles from './CategoriesSection.module.scss'
import { CategoryCard } from '@/components/card/category-card/CategoryCard'
import Link from 'next/link'
import { AppRoutes } from '@/settings/AppRoutes'
import { Tables } from '@/database/database.types'
import { useLoadingStore } from '@/state/loadingStore'
import { Loader } from '@/components/loader/Loader'

interface CategoriesSectionCtrlProps {
    topCategories: Tables<'categories'>[]
}

export const CategoriesSectionCtrl = ({ topCategories }: CategoriesSectionCtrlProps) => {
    const [visibleCategories, setVisibleCategories] = useState(topCategories)
    const isLoading = useLoadingStore(state => state.isLoading)
    const [columns, setColumns] = useState(7)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 800) {
                setVisibleCategories(topCategories.slice(0, 3))
                setColumns(3)
            } else if (window.innerWidth < 1100) {
                setVisibleCategories(topCategories.slice(0, 4))
                setColumns(4)
            } else if (window.innerWidth < 1400) {
                setVisibleCategories(topCategories.slice(0, 5))
                setColumns(5)
            } else if (window.innerWidth < 1600) {
                setVisibleCategories(topCategories.slice(0, 6))
                setColumns(6)
            } else if (window.innerWidth < 1800) {
                setVisibleCategories(topCategories.slice(0, 7))
                setColumns(7)
            } else if (window.innerWidth < 2000) {
                setVisibleCategories(topCategories.slice(0, 8))
                setColumns(8)
            } else if (window.innerWidth < 2200) {
                setVisibleCategories(topCategories.slice(0, 9))
                setColumns(9)
            } else {
                setVisibleCategories(topCategories.slice(0, 10))
                setColumns(10)
            }
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [topCategories])

    const categoriesView = (
        <div className={styles.streamPreviews} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {visibleCategories.map((category, index) => (
                <CategoryCard key={category.id} number={index + 1} image={category.image_url} title={category.name} tags={category.tags} />
            ))}
        </div>
    )

    return (
        <section className={styles.sectionLayout}>
            <div className={styles.sectionHeader}>
                <h2>Live Categories</h2>
                <Link href={AppRoutes.categories}>
                    <span>View all</span>
                </Link>
            </div>
            {isLoading ? <Loader /> : categoriesView}
        </section>
    )
}
