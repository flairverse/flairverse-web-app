import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next.config'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default appWithTranslation(MyApp)
