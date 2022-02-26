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

  componentDidMount() {
    document.title = "Fivemin-Crawler-Generator"
  }

  render() {
    return (
      <PageTab>

      </PageTab>
    );
  }
}

export default App;