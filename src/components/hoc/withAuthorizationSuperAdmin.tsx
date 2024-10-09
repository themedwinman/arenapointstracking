import React from 'react';
import { useUser } from '@/context/UserContext';
import styled from 'styled-components';

const NotAuthorizedMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: #ff6347; // Tomato color for fun
  text-align: center;
`;

const withAuthorizationSuperAdmin = (WrappedComponent: React.ComponentType<any>) => {
  const WithAuthorization: React.FC = (props) => {
    const { user, loading } = useUser();

    console.log('userRole in HOC:', user?.role); // Add logging

    if (loading) {
      return <div>Loading...</div>;
    }

    // Check if the user is an admin or superadmin
    if (user?.role !== 'superadmin') {
      // Render a "Not Authorized" message or component
      return (
        <NotAuthorizedMessage>
          🚫 You are not authorized to view this page. Please contact your administrator. 🚫
        </NotAuthorizedMessage>
      );
    }

    // Render the wrapped component if the user is authorized
    return <WrappedComponent {...props} />;
  };

  return WithAuthorization;
};

export default withAuthorizationSuperAdmin;