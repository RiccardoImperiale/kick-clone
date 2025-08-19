import { getCategories } from '@/actions/categories'
import { HomeFeed } from '@/components/home-feed/HomeFeed'

export default async function Home() {
    const categories = await getCategories({ limit: 5 })

    return <HomeFeed categories={categories} />
}
