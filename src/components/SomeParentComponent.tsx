import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import MainLayout from './MainLayout';

function SomeParentComponent() {
  return (
    <div>
      {/* Other components that don't need authentication */}
      <Authenticator.Provider>
        <MainLayout /> {/* Only MainLayout and its children within this provider have context */}
      </Authenticator.Provider>
      {/* More components outside the provider */}
    </div>
  );
}

export default SomeParentComponent; 