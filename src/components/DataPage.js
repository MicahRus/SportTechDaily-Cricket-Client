import React from "react";

class DataPage extends React.Component {
  componentDidMount() {
    // this.getData();
    // this.getOtherData();
    this.getPlayerData();
  }

  getData = async () => {
    const response = await fetch("http://localhost:3001");
    const data = await response.json();
    console.log(data);
    this.setState({ data: data });
  };

  getOtherData = async () => {
    const response = await fetch(
      "http://localhost:3001/other?playerName='500002'"
    );
    const data = await response.json();
    console.log(data);
    this.setState({ otherData: data });
  };

  getPlayerData = async () => {
    const response = await fetch("http://localhost:3001/players");
    const data = await response.json();
    console.log(data);
    this.setState({ players: data });
  };

  render() {
    return (
      <div>
        <div>
          <h1> hi</h1>,
          <a href="logo.svg" download>
            Click to download
          </a>
        </div>
      </div>
    );
  }
}

export default DataPage;
