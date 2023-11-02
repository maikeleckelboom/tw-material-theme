import {useRouter} from "#app";

interface NavigationItem {
    icon: string | string[]
    path?: string
    label?: string
    badge?: string | number
    active?: boolean
    action?: () => void
}

export const useNavigationStore = defineStore('navigation-store', () => {

    const routes = shallowRef<NavigationItem[]>([
        {
            label: 'Home',
            icon: ['ic:outline-home', 'ic:baseline-home'],
            path: '/',
        },
        {
            label: 'Theme',
            icon: ['ic:outline-widgets', 'ic:baseline-widgets'],
            path: '/components',
            badge: 16
        },
        {
            label: 'Library',
            icon: ['ic:outline-book', 'ic:baseline-book'],
            path: '/library',
            badge: 44
        },
        // {
        //     label: 'Menu',
        //     icon: ['ic:round-menu-open', 'ic:round-menu-open'],
        // }
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
