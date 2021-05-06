import { Provider } from 'next-auth/client'
import Layout from '../components/layout/layout'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
	return (
		<Provider session={pageProps.session}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	)
}

export default MyApp


//By wraping the whole app with provider we can remove the unnecessary session request to figure out if the state is authenticated or not 
