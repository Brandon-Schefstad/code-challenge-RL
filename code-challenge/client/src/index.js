import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
const { default: App } = require('./App')

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
