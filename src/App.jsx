import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "./pages/rootlayout";
import Home from "./pages/home/home";
import SignUp from "./pages/auth/sign-up/sign-up";
import LogIn from "./pages/auth/log-in/log-in";

function App() {
  return (
    <main className="flex min-h-screen relative bg-gray-950 text-white">
      <Router>
        {/* public routes */}
        <Routes>
          <Route>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<LogIn />} />
          </Route>

          {/* private routes */}

          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
