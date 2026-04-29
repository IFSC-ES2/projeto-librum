import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import PrivateRoute from "./PrivateRoute";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rota Privada com componente Inline para evitar erro de importação */}
        <Route 
          path="/genres" 
          element={
            <PrivateRoute>
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <h1>Login realizado com sucesso!</h1>
                <p>Você está na área restrita do Librum.</p>
                <p>A seleção de gêneros será implementada na próxima Sprint.</p>
              </div>
            </PrivateRoute>
          } 
        />

        {/* Redireciona qualquer outra rota para o login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};