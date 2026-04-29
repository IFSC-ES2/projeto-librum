import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Verifica se existe o objeto user no localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;