import { Global, css } from '@emotion/core';
import React from 'react';

export const unit = 8;
export const colors = {
  primary: '#220a82',
  secondary: '#14cbc4',
  accent: '#e535ab',
  background: '#f7f8fa',
  grey: '#d8d9e0',
  text: '#343c5a',
  textSecondary: '#747790'
};

export default () => <Global styles={css`
  html, body {
    height: '100%',
  }
  body {
    margin: 0;
    padding: 0;
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${colors.background};
    color: ${colors.text};
  }
  #root {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }
  * {
    boxSizing: border-box;
  }
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: 600;
  }
  h1 {
    font-size: 48;
    line-height: 1;
  }
  h2 {
    fontSize: 40;
  }
  h3 {
    font-size: 36;
  }
  h5 {
    font-size: 16;
    text-transform: uppercase;
    letter-spacing: 4;
  }`
} />
