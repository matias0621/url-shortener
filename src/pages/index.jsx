import { Inter } from "next/font/google";
import { useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const inputRef = useRef();
  const [shortURL, setshortURL] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = inputRef.current.value;
    //TODO: Peticion al API
    fetch('/api/shortUrl',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({url})
    }).then (res => res.json())
    .then((data) => {
      setshortURL(data.setshortURL);
    })
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 `}
    >
     <h1>URL Shortener</h1>
     <p>Aorta tus URLs aqui</p>

     <div>
      <form action="" onSubmit={handleSubmit}>
        <input ref={inputRef} type="text" className="text-black" />
        <button>Acorta</button>
        <span>
          {shortURL}
        </span>
      </form>
     </div>
    </main>
  );
}