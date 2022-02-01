import React from "react";
import AttributeInputForm from "./AttributeInputForm"
import PagePlane from "./PagePlane";
import PageTab from "./PageTab";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      sidebarOpen: true
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open: any) {
    this.setState({ sidebarOpen: open });
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div></div>}>

          </Route>
          <Route path="/tools" element={<PageTab>

          </PageTab>}>

          </Route>
        </Routes>
      </BrowserRouter>

    );
  }
}

export default App;