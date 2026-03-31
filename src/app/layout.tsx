import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
    title: 'Belmond | Discover a New Pace of Travel',
    description:
        'Belmond offers a collection of iconic and storied luxury hotels, trains, river cruises, and safaris – seamlessly woven into the fabric of the world\'s most extraordinary destinations.',
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
