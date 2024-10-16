import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import App from './App'
import Email from './pages/Email'
import Visualization from './pages/Visualization'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />
	},
	{
		path: '/Email',
		element: <Email />
	},
	{
		path: '/visualization',
		element: <Visualization />
	}
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)