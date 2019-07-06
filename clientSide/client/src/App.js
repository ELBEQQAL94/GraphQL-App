import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

// Components
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import SinglePost from './pages/single_page';

// Menu Bar
import MenuBar from "./components/Ui/MenuBar";

// Container from semantic ui
import { Container } from "semantic-ui-react";

import { AuthProvider } from "./components/context_auth";
import { AuthRoute } from './components/auth_router';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login"    component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/posts/:postId" component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;
