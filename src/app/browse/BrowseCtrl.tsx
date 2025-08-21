'use client'
import styles from './page.module.scss'
import { useState } from 'react'
import { PageNavigationCtrl } from '@/components/page-navigation/PageNavigationCtrl'
import { PreviewCard } from '@/components/card/preview-card/PreviewCard'
import { CategoryCard } from '@/components/card/category-card/CategoryCard'
import { Tables } from '@/database/database.types'
import { LivestreamWithStreamer } from './page'

const tabs = [{ name: 'livestreams' }, { name: 'categories' }]

interface BrowseProps {
    categories: Tables<'categories'>[]
    livestreams: LivestreamWithStreamer[]
}

export default function Browse(props: BrowseProps) {
    const [activeTab, setActiveTab] = useState('livestreams')

    return (
        <>
            <PageNavigationCtrl activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
            {activeTab === 'livestreams' ? (
                <section className={styles.livestreamsList}>
                    {props.livestreams.map(stream => (
                        <PreviewCard
                            key={stream.id}
                            image={stream.image_url}
                            title={stream.title}
                            tags={stream.tags}
                            streamer={stream.streamer}
                            category={props.categories.find(c => c.id === stream.category_id) || null}
                        />
                    ))}
                </section>
            ) : (
                <section className={styles.categoriesList}>
                    {props.categories.map(category => (
                        <CategoryCard key={category.id} title={category.name} image={category.image_url} tags={category.tags} />
                    ))}
                </section>
            )}
        </>
    )
}
