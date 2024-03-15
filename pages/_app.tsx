import { FC } from 'react'
import type { AppProps /*, AppContext */ } from 'next/app'
import './styles.css'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <div>
            <Component {...pageProps} />
        </div>
    )
}

export default MyApp
