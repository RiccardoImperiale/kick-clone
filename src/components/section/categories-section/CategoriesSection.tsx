import { getTopCategories } from '@/actions/categories'
import { CategoriesSectionSizing } from './CategoriesSectionSizing'

export const CategoriesSection = async () => {
    const topCategories = await getTopCategories()

    return <CategoriesSectionSizing topCategories={topCategories} />
}
