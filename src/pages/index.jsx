import { Inter } from "next/font/google";
import { useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const inputRef = useRef();
  const [shortURL, setShortURL] = useState();
  const [urlArray, setUrlArray] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = inputRef.current.value;
    //TODO: Peticion al API
    fetch("/api/shortUrl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })
      .then((res) => res.json())
      .then((data) => {
        setShortURL(data.shortUrl);
        setUrlArray((prevUrl) => [...prevUrl, data.shortUrl]);
      });
  };

  return (
    <main className="bg-slate-900 w-screen h-screen">
      <h1 className="text-center text-blue-800 text-4xl pt-36 pb-10 font-sans">URL Shortener</h1>


      <div>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
          <input ref={inputRef} type="text" placeholder="Ingrese enlace" 
          className="
          text-black w-80 h-12 px-2 border rounded-md
          "/>
          <button className="bg-red-950 w-80 mt-2 h-12 rounded-md text-xl">Acorta</button>
        </form>

        <div>
          {urlArray.map((url, index) => (
            <li key={index} className="list-none text-center mt-10">
              <a href={`/${url}`} className="text-3xl"> {url} </a>
            </li>
          ))}
        </div>
      </div>
    </main>
  );
}
