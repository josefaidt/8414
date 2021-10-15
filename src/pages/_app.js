import { Amplify } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'
import config from '../aws-exports'

Amplify.configure(config)

export default withAuthenticator(function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
})
