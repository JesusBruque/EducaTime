import Head from 'next/head'

const Home = () => {
  return (
      <div className="container">
        <Head>
            <title>Casor. Academia de formación</title>
            <meta name={'description'} content={'Casor. Academia de formación deportiva especializada en cursos para entrenadores de fútbol.'}/>
            <link rel="icon" href="/assets/logo.svg"/>
        </Head>

        <main>
          <svg id="main_field" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 792.07 528.8" stroke={'var(--main-color)'} style={{width:'300px'}}>
            <rect x="3.84" y="3.84" width="784.39" height="521.11" fill="none" strokeWidth="7.69"/>
            <rect x="3.84" y="119.61" width="122.41" height="293.65" fill="none" strokeWidth="7.69"/>
            <rect x="3.84" y="200.11" width="42.66" height="132.66" fill="none" strokeWidth="7.69"/>
            <path d="M150.9,252.13c18.4,0,33.31,24.4,33.31,54.49s-14.91,54.5-33.31,54.5"
                  transform="translate(-24.91 -40.19)" fill="none" strokeWidth="7.69"/>
            <circle cx="87.7" cy="266.44" r="4.08" fill="none"/>
            <circle cx="396.6" cy="266.48" r="68.56" fill="none" strokeMiterlimit="10"
                    strokeWidth="7.69"/>
            <line x1="396.6" y1="3.84" x2="396.6" y2="524.96" fill="none" strokeMiterlimit="10"
                  strokeWidth="7.69"/>
            <rect x="690.73" y="159.8" width="122.41" height="293.65" transform="translate(1478.96 573.06) rotate(180)"
                  fill="none" strokeWidth="7.69"/>
            <rect x="770.48" y="240.29" width="42.66" height="132.66" transform="translate(1558.71 573.06) rotate(180)"
                  fill="none" strokeWidth="7.69"/>
            <path d="M691,361.12c-18.4,0-33.31-24.4-33.31-54.5s14.91-54.49,33.31-54.49"
                  transform="translate(-24.91 -40.19)" fill="none" strokeWidth="7.69"/>
            <circle cx="704.38" cy="266.44" r="4.08" fill={'none'}/>
          </svg>
        </main>
      </div>
  )
}

export default Home
