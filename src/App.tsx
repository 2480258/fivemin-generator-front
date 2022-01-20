import React from "react";
import AttributeInputForm from "./AttributeInputForm"
import PagePlane from "./PagePlane";
import PageTab from "./PageTab";

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
      <PageTab>
        
      </PageTab>
    );
  }
}

export default App;