// src/components/hoc/withAuthorization.tsx
import React from 'react';
import { useRouter } from 'next/router';

interface WithAuthorizationProps {
  userRole: string;
}

const withAuthorization = (WrappedComponent: React.ComponentType) => {
  const WithAuthorization: React.FC<WithAuthorizationProps> = (props) => {
    const router = useRouter();
    const { userRole } = props;

    // Check if the user is an admin or superadmin
    if (userRole !== 'admin' && userRole !== 'superadmin') {
      // Redirect to a "Not Authorized" page or home page
      router.push('/not-authorized');
      return null;
    }

    // Render the wrapped component if the user is authorized
    return <WrappedComponent/>;
  };

  return WithAuthorization;
};

export default withAuthorization;