import Head from 'next/head';
import ADGIP from '../components/main/ADGIP';

export default function Home() {
    return (
        <div>
            <Head>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <ADGIP />
        </div>
    );
}
