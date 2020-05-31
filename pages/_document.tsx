import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-158793450-3"></script>
                    <script dangerouslySetInnerHTML={{__html:`
                            window.dataLayer = window.dataLayer || [];
                        function gtag(){
                        window.dataLayer.push(arguments);
                        }
                        gtag('js', new Date());

                        gtag('config', 'UA-158793450-3');`
                    }} />

                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
