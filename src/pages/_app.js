import Layout from '../components/layout'
import Head from 'next/head';

import favIcon from '../assets/img/favicon.png'

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@100;200;300;400;500;600;700;800;900&family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet"/>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link rel="icon" href={favIcon.src} sizes="any" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}