import API from './services/api.js'
import store from './services/store.js'
import Router from './services/router.js'

// NOTE: These imports are necessary to register the components
import MenuPage from './components/MenuPage.js'
import ProductCategory from './components/ProductCategory.js'
import ProductItem from './components/ProductItem.js'
import DetailsPage from './components/DetailsPage.js'
import OrderPage from './components/OrderPage.js'

window.app = {
	store,
	router: Router,
}

window.addEventListener('DOMContentLoaded', async () => {
	await API.loadMenu()
	app.router.init()
})
