import App from './App'
import Home from './containers/Home'
import Translation from './containers/Translation'
import NotFound from './containers/NotFound'

export default [{
    path: '/',
    component:App,
    loadData: App.loadData,
    routes: [
        {
            path: '/',
            component: Home,
            loadData: Home.loadData,
            exact: true,
            key: 'home'
        },
        {
            path: '/translation',
            component: Translation,
            loadData: Translation.loadData,
            key: 'translation',
            exact: true
        },
        {
            component: NotFound
        }
    ]
}]
