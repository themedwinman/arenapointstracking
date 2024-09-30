import React from 'react';
import styled from 'styled-components';

interface WithAuthorizationProps {
  userRole: string | null;
}

// Styled component for the "Not Authorized" message
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

const withAuthorization = (WrappedComponent: React.ComponentType<any>) => {
  const WithAuthorization: React.FC<WithAuthorizationProps> = (props) => {
    const { userRole, ...restProps } = props;

    console.log('userRole in HOC:', userRole); // Add logging

    // Check if the user is an admin or superadmin
    if (userRole !== 'admin' && userRole !== 'superadmin') {
      // Render a "Not Authorized" message or component
      return (
        <NotAuthorizedMessage>
          🚫 You are not authorized to view this page. Please contact your administrator. 🚫
        </NotAuthorizedMessage>
      );
    }

    // Render the wrapped component if the user is authorized
    return <WrappedComponent {...restProps} />;
  };

  return WithAuthorization;
};

export default withAuthorization;