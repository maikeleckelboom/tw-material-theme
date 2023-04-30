interface NavigationItem {
    icon: string | string[]
    path: string
    label?: string
    badge?: string | number
    active?: boolean
}

export const useNavigationStore = defineStore('navigation-store', () => {

    const routes = shallowRef<NavigationItem[]>([
        {
            label: 'Home',
            icon: ['ic:outline-home', 'ic:baseline-home'],
            path: '/',
        },
        {
            label: 'Profile',
            icon: ['ic:outline-person', 'ic:baseline-person'],
            path: '/profile',
        },
        {
            label: 'Modules',
            icon: ['ic:outline-widgets', 'ic:baseline-widgets'],
            path: '/components',
            badge: 16
        },
        {
            label: 'Dialogs',
            icon: ['ic:sharp-control-point-duplicate', 'ic:twotone-control-point-duplicate'],
            path: '/dialog',
        },
        {
            label: 'Library',
            icon: ['ic:outline-book', 'ic:baseline-book'],
            path: '/library',
            badge: 44
        },
        {
            label: 'Settings',
            icon: ['ic:outline-settings', 'ic:baseline-settings'],
            path: '/settings',
            badge: 99
        },
        {
            label: 'About',
            icon: ['ic:outline-info', 'ic:baseline-info'],
            path: '/about',
            badge: 1
        },
    ])

    const router = useRouter()
    const addActiveFlag = (item: NavigationItem) => {
        item.active = router.currentRoute.value.path === item.path
        return item
    }

    const pRoutes = computed(() => routes.value.slice(0, 2))
    const sRoutes = computed(() => routes.value.slice(2))

    watchEffect(() => {
        routes.value = routes.value.map(addActiveFlag)
    })
    return {
        routes,
        pRoutes,
        sRoutes,
    }
})
