import { getRecommended } from '@/actions/streamers'
import { Sidebar } from './Sidebar'

export const SidebarCtrl = async () => {
    const recommended = await getRecommended()

    return <Sidebar recommended={recommended} />
}
