import * as React from "react";
import { render } from "react-dom";
import axios from "axios";
import "./styles.css";

export default function App() {

  const path = "https://images.dog.ceo/breeds/basenji/n02110806_4280.jpg";

  const [text, setText]    = React.useState("");
  const [images, setImage] = React.useState(path);

  function btnClick() {
    axios
      .all([
        axios.get("https://dog.ceo/api/breeds/image/random"),
        axios.get("https://dog.ceo/api/breeds/list/all")
      ])
      .then(
        axios.spread(response => {
          setImage(response.data.message);
           setText(response.data.message.split("/")[4]);
        })
      )
      .catch(err => {
        console.log("Error happened during fetching!", err);
      });
  }

  return (
    <div className="App">
      <img className="Img" src={images} alt="broken" />
      <strong>{text}</strong>
      <button className="Button" onClick={btnClick}>
        DOGGIE!
      </button>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
