export type AppRoute = '/' | '/browse' | '/following' | '/categories' | '/category/:id'

export class AppRoutes {
    static home: AppRoute = '/'
    static browse: AppRoute = '/browse'
    static following: AppRoute = '/following'
    static categories: AppRoute = '/categories'
    static showCategory: AppRoute = '/category/:id'
}
