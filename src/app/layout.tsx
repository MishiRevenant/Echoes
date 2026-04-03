import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
    title: 'Echoes of the Andes | Authentic Andean Experiences',
    description:
        'At Echoes of the Andes we believe travel is not just about moving — it\'s about listening, feeling, and becoming part of a living territory. Discover authentic and unforgettable experiences in the Andes.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className="antialiased">
                {/* Hidden Google Translate element — controlled via googtrans cookie */}
                <div id="google_translate_element" className="hidden" aria-hidden="true" />
                <Script
                    src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
                    strategy="afterInteractive"
                />
                <Script id="gt-init" strategy="afterInteractive">{`
                    function googleTranslateElementInit() {
                        new google.translate.TranslateElement({
                            pageLanguage: 'en',
                            autoDisplay: false,
                            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
                        }, 'google_translate_element');
                    }
                `}</Script>
                {children}
            </body>
        </html>
    );
}
