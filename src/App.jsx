import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "./pages/rootlayout";
import Home from "./pages/home/home";
import SignUp from "./pages/auth/sign-up/sign-up";

function App() {
  return (
    <main className="flex min-h-screen relative bg-gray-950 text-white">
      <Router>
        {/* public routes */}
        <Routes>
          <Route>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<p>SigUp</p>} />
          </Route>

          {/* private routes */}

          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
