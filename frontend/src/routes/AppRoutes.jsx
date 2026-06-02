import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import GenresPage from '../pages/GenresPage';
import PhaseListPage from '../pages/PhaseListPage';
import ReadingPage from '../pages/ReadingPage';
import QuizPage from '../pages/QuizPage';
import QuizResultPage from '../pages/QuizResultPage';
import PhaseCompletedPage from '../pages/PhaseCompletedPage';
import PrivateRoute from "./PrivateRoute";
import Layout from '../components/Layout';
import ProfilePage from '../pages/ProfilePage';

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
              <Layout>
                <GenresPage />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/reading/:phaseId/:segmentNumber"
          element={
            <PrivateRoute>
              <ReadingPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/quiz/:phaseId"
          element={
            <PrivateRoute>
              <QuizPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/quiz/:phaseId/resultado"
          element={
            <PrivateRoute>
              <QuizResultPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/quiz/:phaseId/fase-concluida"
          element={
            <PrivateRoute>
              <PhaseCompletedPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/genres/:genreId"
          element={
            <PrivateRoute>
              <Layout>
                <PhaseListPage />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Layout>
                <ProfilePage />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};
