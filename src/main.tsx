import React from "react";
import ReactDOM from "react-dom/client";
import { Amplify } from 'aws-amplify';
import { Authenticator, ThemeProvider, defaultTheme } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import App from "./App";
import "./index.css";

// Configure Amplify
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-2_UDGejoFmx',
      userPoolClientId: '2s5823tljaor4idbf3se8re34v',
      identityPoolId: 'us-east-2:81ec9983-798b-4ffd-8af0-f10544c3a6e8',
    }
  },
  API: {
    GraphQL: {
      endpoint: 'https://gual2ms7qjg5jjbs63yrxcrabe.appsync-api.us-east-2.amazonaws.com/graphql',
      region: 'us-east-2',
      defaultAuthMode: 'userPool',
    }
  }
});

// Custom theme that extends the default theme
const theme = {
  name: 'cyberpunk-theme',
  tokens: {
    colors: {
      background: {
        primary: { value: '#242424' },
        secondary: { value: '#2d2d2d' },
      },
      font: {
        interactive: { value: '#ffffff' },
      },
      brand: {
        primary: {
          10: { value: '#1a2942' },
          20: { value: '#243b61' },
          40: { value: '#3d4d6b' },
          60: { value: '#5a6c89' },
          80: { value: '#8193b0' },
          90: { value: '#a7b5cc' },
          100: { value: '#d0d9e8' },
        },
      },
      border: {
        primary: { value: 'rgba(255, 255, 255, 0.2)' },
        secondary: { value: 'rgba(255, 255, 255, 0.15)' },
      },
    },
    components: {
      authenticator: {
        router: {
          borderWidth: { value: '1px' },
          borderStyle: { value: 'solid' },
          borderColor: { value: 'rgba(0, 255, 255, 0.3)' },
          borderRadius: { value: '16px' },
          backgroundColor: { value: 'rgba(45, 45, 45, 0.85)' },
          backdropFilter: { value: 'blur(12px)' },
        },
        container: {
          padding: { value: '2rem' },
          backgroundImage: { value: 'linear-gradient(135deg, rgba(45, 45, 45, 0.95), rgba(55, 55, 55, 0.95))' },
          boxShadow: { value: '0 8px 32px rgba(0, 0, 0, 0.2)' },
          borderRadius: { value: '16px' },
        },
      },
      button: {
        primary: {
          backgroundColor: { value: 'transparent' },
          borderWidth: { value: '1.5px' },
          borderStyle: { value: 'solid' },
          borderColor: { value: '#00ffff' },
          borderRadius: { value: '8px' },
          color: { value: '#ffffff' },
          boxShadow: { value: '0 0 10px rgba(0, 255, 255, 0.2)' },
          _hover: {
            backgroundColor: { value: 'rgba(0, 255, 255, 0.1)' },
            boxShadow: { value: '0 0 20px rgba(0, 255, 255, 0.4)' },
          },
          _active: {
            backgroundColor: { value: 'rgba(0, 255, 255, 0.2)' },
            boxShadow: { value: '0 0 30px rgba(0, 255, 255, 0.6)' },
          },
          _focus: {
            boxShadow: { value: '0 0 0 2px rgba(0, 255, 255, 0.4)' },
          },
        },
      },
      fieldcontrol: {
        input: {
          color: { value: '#ffffff' },
          backgroundColor: { value: 'rgba(255, 255, 255, 0.08)' },
          borderColor: { value: 'rgba(255, 255, 255, 0.3)' },
          borderRadius: { value: '8px' },
          borderWidth: { value: '1.5px' },
          _hover: {
            borderColor: { value: 'rgba(0, 255, 255, 0.5)' },
          },
          _focus: {
            borderColor: { value: '#00ffff' },
            boxShadow: { value: '0 0 0 2px rgba(0, 255, 255, 0.2)' },
          },
        },
      },
      tabs: {
        item: {
          color: { value: '#ffffff' },
          borderRadius: { value: '8px' },
          borderBottom: { value: 'none' },
          _hover: {
            color: { value: '#00ffff' },
            boxShadow: { value: '0 0 10px rgba(0, 255, 255, 0.2)' },
          },
          _active: {
            color: { value: '#00ffff' },
            boxShadow: { value: '0 0 20px rgba(0, 255, 255, 0.4)' },
          },
        },
      },
    },
  },
};

// Custom styles for the header
const headerStyles = {
  container: {
    textAlign: 'center' as const,
    padding: '1.5rem',
    marginBottom: '0.5rem',
    background: 'linear-gradient(135deg, rgba(45, 45, 45, 0.95), rgba(55, 55, 55, 0.95))',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px 16px 0 0',
  },
  title: {
    margin: 0,
    fontSize: '2rem',
    fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
    color: '#ffffff',
    fontWeight: '600',
    textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
  },
  subtitle: {
    margin: '0.5rem 0 0',
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  logo: {
    width: '60px',
    height: '60px',
    marginBottom: '0.75rem',
  },
};

// Customize the sign-in form
const formFields = {
  signIn: {
    username: {
      placeholder: 'Enter your email',
      isRequired: true,
      label: 'Email',
    },
    password: {
      placeholder: 'Enter your password',
      isRequired: true,
      label: 'Password',
    },
  },
  signUp: {
    email: {
      placeholder: 'Enter your email',
      isRequired: true,
      label: 'Email',
    },
    password: {
      placeholder: 'Create a password',
      isRequired: true,
      label: 'Password',
    },
    confirm_password: {
      placeholder: 'Confirm your password',
      isRequired: true,
      label: 'Confirm Password',
    },
  },
};

// Custom components for the Authenticator
const components = {
  Header: () => (
    <div style={headerStyles.container}>
      {/* Add your logo here */}
      <img 
        src="/logo.svg" 
        alt="Logo" 
        style={headerStyles.logo}
      />
      <h1 style={headerStyles.title}>
        Case Management System
      </h1>
      <p style={headerStyles.subtitle}>
        Sign in to your account
      </p>
    </div>
  ),
};

// Add global styles
const style = document.createElement('style');
style.textContent = `
  body {
    background: linear-gradient(135deg, #2d2d2d, #353535);
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }

  .amplify-button {
    transition: all 0.3s ease;
  }

  .amplify-field-group input {
    transition: all 0.3s ease;
  }

  .amplify-tabs-item {
    transition: all 0.3s ease;
    border-radius: 8px;
    border-bottom: none !important;
  }

  .amplify-tabs-item[data-state='active'] {
    border-bottom: none !important;
    color: #00ffff !important;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
  }

  .amplify-tabs {
    border-bottom: none !important;
  }

  .amplify-field-group {
    border-radius: 8px;
  }

  .amplify-input {
    border-radius: 8px !important;
  }

  .amplify-button[data-variation='primary'] {
    border-radius: 8px;
  }

  .amplify-authenticator {
    border-radius: 16px;
  }
`;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Authenticator
        formFields={formFields}
        hideSignUp={false}
        components={components}
        services={{
          async validateCustomSignUp(formData) {
            if (!formData.acknowledgement) {
              return {
                acknowledgement: 'You must agree to the terms and conditions',
              };
            }
          },
        }}
        initialState="signIn"
        variation="modal"
      >
        <App />
      </Authenticator>
    </ThemeProvider>
  </React.StrictMode>
);
