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
    <main className="bg-slate-900 w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-center text-blue-500 text-4xl">URL Shortener</h1>


      <div className="pl-4">
        <p className="text-blue-500">Acorta tus URLs aqui</p>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input ref={inputRef} type="text" className="text-black w-40" />
          <button>Acorta</button>
          <span className="text-white">{shortURL}</span>
        </form>

        <div>
          {urlArray.map((url, index) => (
            <li key={index}>
              <a href={`/${url}`}> {url} </a>
            </li>
          ))}
        </div>
      </div>
    </main>
  );
}
