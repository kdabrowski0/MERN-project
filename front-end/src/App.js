import React from "react";
import Home from "./layout/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditShoe from "./features/shoes/EditShoe";
import AddShoe from "./features/shoes/AddShoe";
import SingleShoePage from "./features/shoes/SingleShoePage";
import Prefetch from "./features/auth/Prefetch";
import Info from "./layout/Info";
import Login from "./features/auth/Login";
import SignUp from "./features/users/SignUp";
import Layout from "./layout/Layout";
import Public from "./layout/PublicPage";
import { ROLES } from "./config/roles";
import RequireAuth from "./features/auth/requireAuth";
import ProtectedLayout from "./layout/ProtectedLayout";
import PersistLogin from "./features/auth/PersistLogin";
import UserList from "./features/users/UserList";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Those are public routes */}
            <Route index element={<Public />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            {/* Those are protected routes */}
            <Route element={<PersistLogin />}>
              <Route
                element={
                  <RequireAuth allowedRoles={[...Object.values(ROLES)]} />
                }
              >
                <Route element={<Prefetch />}>
                  <Route exact path="/" element={<ProtectedLayout />}>
                    <Route path="/home" element={<Home />} />
                    <Route
                      element={<RequireAuth allowedRoles={[ROLES.Admin]} />}
                    >
                      <Route exact path="/AddShoe" element={<AddShoe />} />
                      <Route
                        exact
                        path="/editShoe/:id"
                        element={<EditShoe />}
                      />
                      <Route path="/userlist" element={<UserList />} />
                    </Route>

                    <Route
                      exact
                      path="/shoes/:id"
                      element={<SingleShoePage />}
                    />
                    <Route exact path="/Funinfo" element={<Info />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
