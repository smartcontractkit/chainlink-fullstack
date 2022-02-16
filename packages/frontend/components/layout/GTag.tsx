import React from 'react'
import Script from 'next/script'
import { GTagId } from '../../conf/config'

const env = process.env.NODE_ENV

export const GTag = (): JSX.Element => {
  if (env === 'development') return null
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GTagId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GTagId}');
        `}
      </Script>
    </>
  )
}
