import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import GenresPage from '../pages/GenresPage';
import PhaseListPage from '../pages/PhaseListPage';
import PrivateRoute from "./PrivateRoute";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route 
          path="/genres" 
          element={
            <PrivateRoute>
              <GenresPage />
            </PrivateRoute>
          } 
        />

        <Route
          path="/genres/:genreSlug"
          element={
            <PrivateRoute>
              <PhaseListPage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};