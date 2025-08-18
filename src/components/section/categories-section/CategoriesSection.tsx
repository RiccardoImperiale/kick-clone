'use client'

import { useEffect, useState } from 'react'
import { getTopCategories } from '@/actions/categories'
import { CategoriesSectionClient } from './CategoriesSectionClient'
import { useLoadingStore } from '@/state/loadingStore'
import { Category } from '@/lib/types/category'
import { Tables } from '@/database/database.types'

export const CategoriesSection = () => {
    const [topCategories, setTopCategories] = useState<Tables<'categories'>[]>([])
    const setIsLoading = useLoadingStore(state => state.setIsLoading)

    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true)
            try {
                const data = await getTopCategories()
                setTopCategories(data)
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchCategories()
    }, [setIsLoading])

    return <CategoriesSectionClient topCategories={topCategories} />
}
