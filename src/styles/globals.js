import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  :root {
    font-size: 14px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    user-select: none;
    cursor: cursor;
  }

  body {
    font-weight: 100;
    letter-spacing: 0.1px;
    font-family: 'Helvetica';
    color: white;
  }

  body, html, .main {
    height: 100%;
    width: 100%;
  }
`;
