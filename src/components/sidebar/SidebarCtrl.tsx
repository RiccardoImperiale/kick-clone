import { getLivestreams } from '@/actions/livestreams'
import { Sidebar } from './Sidebar'

export const SidebarCtrl = async () => {
    const livestreams = await getLivestreams()

    return <Sidebar livestreams={livestreams} />
}
