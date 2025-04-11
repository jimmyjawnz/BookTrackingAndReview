import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

// Creates a wrapper for routes only accessible with proper authentication
const ProtectedRoute = ({ children }) => {
  // Get the current user from AuthContext
  const { user } = useAuth();

  // If there is no user/not authenticated then redirect them to the signin page
  if (!user) return <Navigate to="/signin" replace />;
  // If the user is authenticated then render the child components 
  return children;
};

export default ProtectedRoute;
