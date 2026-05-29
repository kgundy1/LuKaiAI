import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './lib/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Learn from './pages/Learn';
import Lesson from './pages/Lesson';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route
            path="/learn"
            element={
              <ProtectedRoute>
                <Learn />
              </ProtectedRoute>
            }
          />
          <Route
            path="/learn/module/:moduleNumber/lesson/:lessonNumber"
            element={
              <ProtectedRoute>
                <Lesson />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
