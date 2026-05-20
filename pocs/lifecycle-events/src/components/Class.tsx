import { Component } from "react";

class Class extends Component {
  private _id: any;

  componentDidMount() {
    console.log("class - mount");
    this._id = setInterval(() => console.log("class - tick"), 1000);
  }
  componentWillUnmount() {
    clearInterval(this._id);
    console.log("class - unmount");
  }
  render() {
    return <p>Class timer</p>;
  }
}

export default Class;