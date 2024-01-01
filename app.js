import API from './services/api.js'
import store from './services/store.js'
import Router from './services/router.js'

// NOTE: These imports are necessary to register the components
import MenuPage from './components/MenuPage.js'

window.app = {
	store,
	router: Router,
}

window.addEventListener('DOMContentLoaded', async () => {
	app.store.menu = await API.loadMenu()
	app.router.init()
})
