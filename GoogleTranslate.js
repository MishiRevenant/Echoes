// Componente sugerido
import { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    const addScript = document.createElement('script');
    addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'auto',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
      }, 'google_translate_element');
    };
  }, []);

  return <div id="google_translate_element"></div>;
};
export default GoogleTranslate;
