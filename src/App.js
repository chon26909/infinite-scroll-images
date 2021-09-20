import { useEffect, useState } from "react";
import "./App.css";
import { Photo } from "./components/Photo";

function App() {
  const [photos, setphoto] = useState([]);

  useEffect(() => {

    const client_key = "WZWRgHppWsu2EHgdUifxGhcbfJSAdrvcFdRLby6S-Vc";
    const page = "1";
    const url =
      "https://api.unsplash.com/photos/?client_id=" +
      client_key +
      "&page=" +
      page;

    const fetchImage = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setphoto(data);
    };

    fetchImage();
    
  }, []);

  if (photos.length === 0) {
    return <div>loading...</div>;
  }

  return (
    <main>
      <h1>Infinite Scroll | Unsplash API</h1>
      <section className="section-photo">
        <div className="display-photo">
          {photos.map((data, index) => {
            return <Photo key={data.id} {...data} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default App;
