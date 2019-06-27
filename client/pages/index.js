import Head from 'next/head'

export default function HomePage() {
  return (
    <main>
      <Head>
        <title>Aphrodite</title>
      </Head>
      <h1>Aphrodite</h1>
      <style jsx>{`
        main {
          font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue',
            'Helvetica', 'Arial', sans-serif;
          padding: 20px 20px 60px;
          max-width: 680px;
          margin: 0 auto;
          font-size: 16px;
          line-height: 1.65;
          text-align: center;
        }
        h1 {
          margin-top: 70px;
          font-size: 45px;
        }
        a {
          cursor: pointer;
          color: #0076ff;
          text-decoration: none;
          transition: all 0.2s ease;
          border-bottom: 1px solid white;
        }
        a:hover {
          border-bottom: 1px solid #0076ff;
        }
      `}</style>
    </main>
  )
}