// React Router imports
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// Pages
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import MetricsPage from "./pages/MetricsPage";
import TrainingPage from "./pages/TrainingPage";
import NotFoundPage from "./pages/NotFoundPage";

import MainLayout from "./layouts/MainLayout";

import "./index.css";

// React Router setup to map paths to their corresponding components.
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/metrics" element={<MetricsPage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </>,
    ),
  );
  return <RouterProvider router={router} />;
}

export default App;
