import React from 'react'
import ReactDOM from 'react-dom/client'
import GlobalStyle from "./style/GlobalStyle";
import ResetStyle from "./style/ResetStyle";
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ResetStyle />
    <GlobalStyle />
    <App />
  </React.StrictMode>,
)
