import { getRecommended } from '@/actions/livestreams'
import { Sidebar } from './Sidebar'

export const SidebarCtrl = async () => {
    const recommended = await getRecommended()

    return <Sidebar livestreams={recommended} />
}
