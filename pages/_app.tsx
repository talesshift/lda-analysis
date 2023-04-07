import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import AppContext from '@/components/app_context'
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
    const [topic, setTopic] = useState(-1);
    return(
        <AppContext.Provider value={{
            topic:topic,
            setTopic: setTopic,
          }}>
            <Component {...pageProps} />
        </AppContext.Provider>
    ) 
}
