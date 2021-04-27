import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product

//About Auth
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import UploadFriendPage from "./views/UploadFriendPage/UploadFriendPage.js";
import MainPage from "./views/MainPage/MainPage";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import DetailFriendPage from "./views/DetailFriendPage/DetailFriendPage";
import UpdateFriendPage from "./views/UpdateFriendPage/UpdateFriendPage";

//About User
import NotFoundPage from "./views/NotFoundPage/NotFoundPage";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="wrapper">
        <NavBar />
        <div className="contentsWrapSpacer" />
        <Switch>
          <>
            <div className="contentsWrap">
              <Route exact path="/" component={Auth(LandingPage, null)} />
              <Route exact path="/login" component={Auth(LoginPage, false)} />
              <Route
                exact
                path="/register"
                component={Auth(RegisterPage, false)}
              />
              <Route
                exact
                path="/upload/friend"
                component={Auth(UploadFriendPage, true)}
              />
              <Route exact path="/main" component={Auth(MainPage, null)} />
              <Route
                exact
                path="/friend/:friendId"
                component={Auth(DetailFriendPage, null)}
              />
              <Route
                exact
                path="/update"
                component={Auth(UpdateFriendPage, true)}
              />
            </div>
          </>
          <Route component={Auth(NotFoundPage, null)} />
        </Switch>
        <Footer />
      </div>
    </Suspense>
  );
}

export default App;
