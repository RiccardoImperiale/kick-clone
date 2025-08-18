export type Category = {
    id: string
    image_url: string
    name: string
    tags: string[] | null
}

export const categories: Category[] = [
    {
        id: '1',
        name: 'Gaming',
        image_url: 'https://picsum.photos/id/23/200/300',
        tags: ['IRL', 'RPG'],
    },
    {
        id: '2',
        name: 'Art',
        image_url: 'https://picsum.photos/id/29/200/300',
        tags: ['Painting'],
    },
    {
        id: '3',
        name: 'Music',
        image_url: 'https://picsum.photos/id/22/200/300',
        tags: ['Live', 'Music'],
    },
    {
        id: '4',
        name: 'Technology',
        image_url: 'https://picsum.photos/id/21/200/300',
        tags: ['Coding', 'POV'],
    },
    {
        id: '5',
        name: 'Travel',
        image_url: 'https://picsum.photos/id/20/200/300',
        tags: ['Adventure'],
    },
    {
        id: '6',
        name: 'Cooking',
        image_url: 'https://picsum.photos/id/19/200/300',
        tags: ['Recipes'],
    },
]
