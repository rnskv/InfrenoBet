import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    :root {
        --color-black: #000000;
        --color-black-transparent: #000000d9;
    
        --color-white: #fff;
    
        --color-grey: #9ea7b3;
        --color-grey-active: #c3cfdd;
        --color-grey-400: #213137;
        --color-grey-500: #182328;
        --color-grey-550: #172227;
        --color-grey-600: #121a1e;
        --color-grey-800: #0c0d11;
    
        --color-yellow: #f6e444;
        --color-yellow-active: #fff598;
        --color-yellow-focus: #ffdc30;
        --color-darkblue: #213138;
        --color-darkblue-active: #30424a;
        --color-blue-500: #2291A9;
        --color-greyblue: #317284;
        --color-blue: #00bbd9;
    
        --color-violet: #3a4364;
    
        --color-green: #1aaf50;
        --color-red: #f90000;
        --color-shadow: #0c0c0c;
    
        --header-height: 60px;
        --mobile-screen-width: 800px;
        --muted: rgba(255, 255, 255, 0.6);
    
    }

    html, body {
        margin: 0;
        padding: 0;
        background: url('/dist/resources/images/currency.jpg') var(--color-darkblue-active);
        font-family: Roboto, Arial, sans-serif;
        background-position: top;
        background-attachment: fixed;
    }
`;
