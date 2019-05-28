import React from "react";
import Header from "components/header/header";
import MainPage from "components/main-page/main-page";
import SvgSprite from "components/svg-sprite/svg-sprite";

const App = () => (
  <div>
    <SvgSprite />
    <Header userName="Oliver.conner@gmail.com" />
    <MainPage />
  </div>
);

export default App;
