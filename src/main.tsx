import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import App from "./App";
import "./index.css";
import config from './amplifyconfiguration.json';

// Configure Amplify
Amplify.configure(config);

// Add global styles
const style = document.createElement('style');
style.textContent = `
  body {
    background: linear-gradient(135deg, #2d2d2d, #353535);
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }
`;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Authenticator>
      {({ signOut }) => (
        <App />
      )}
    </Authenticator>
  </StrictMode>
);
