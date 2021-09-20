import { useEffect, useState } from "react";
import "./App.css";
import { Photo } from "./components/Photo";

function App() {
  const [photos, setphoto] = useState([]);
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const client_key = "WZWRgHppWsu2EHgdUifxGhcbfJSAdrvcFdRLby6S-Vc";
    const url =
      "https://api.unsplash.com/photos/?client_id=" +
      client_key +
      "&page=" +
      page;

    const fetchImage = async () => {
      if (!loading) {
        console.log("get photo from server");

        setloading(true);

        try {
          const response = await fetch(url);
          const data = await response.json();
          setphoto((old_data) => {
            return [...old_data, ...data];
          });
        } catch (error) {
          console.log(error);
        }

        setloading(false);
      }
    };

    fetchImage();
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >
        document.body.offsetHeight - 500
      ) {
        setpage((old_page) => {
          return old_page + 1;
        });
      }
    });

    return () => window.removeEventListener("scroll", event);
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
            return <Photo key={index} {...data} />;
          })}
        </div>
      </section>
      {loading ? <div className="text-center">กำลังโหลดข้อมูล...</div> : null}
    </main>
  );
}

export default App;
