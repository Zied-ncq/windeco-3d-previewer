import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import BabylonViewer from "./babylon-viewer";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BabylonViewer width={800} height={600} />
  </React.StrictMode>,
)
