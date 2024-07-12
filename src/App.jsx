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
            <Route
              path="liked-videos"
              element={<p className="pt-16">Like</p>}
            />
            <Route
              path="channel/:username/videos"
              element={<p className="pt-16">user</p>}
            />
            <Route path="my-studio" element={<p className="pt-16">Studio</p>} />
            <Route path="history" element={<p className="pt-16">History</p>} />
            <Route path="tweets" element={<p className="pt-16">Tweets</p>} />
            <Route
              path="settings"
              element={<p className="pt-16">Settings</p>}
            />
            <Route
              path="dashboard"
              element={<p className="pt-16">DashBoard</p>}
            />
            <Route
              path="subscriptions"
              element={<p className="pt-16">Subscriptions</p>}
            />
          </Route>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
