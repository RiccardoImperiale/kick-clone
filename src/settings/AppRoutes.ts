export type AppRoute = '/' | '/browse' | '/following' | '/categories' | '/category/:id' | '/channel'

export class AppRoutes {
    static home: AppRoute = '/'
    static browse: AppRoute = '/browse'
    static following: AppRoute = '/following'
    static categories: AppRoute = '/categories'
    static showCategory: AppRoute = '/category/:id'
    static channel: AppRoute = '/channel'
}
