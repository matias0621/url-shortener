import { Inter } from "next/font/google";
import { useRef, useState } from "react";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const inputRef = useRef();
  const [shortURL, setShortURL] = useState();
  const [urlArray, setUrlArray] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = inputRef.current.value;
    //TODO: Peticion al API
    fetch("https://url-shortener-nu-eight.vercel.app/api/shortUrl", {
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
    <>
      <div className="fixed top-0 -z-10 h-full w-full bg-slate-900">
        <div className="absolute inset-0 -z-9 h-full w-full bg-[#141414] bg-[radial-gradient(#433526_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="shadow-orange-500 absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-primary-500/40 opacity-50 blur-[80px]"></div>
      </div>
      <main class="px-8 py-10 ">
        <div class="flex w-full justify-between text-slate-100">
          <h1 class="text-4xl font-bold">Shortener URL</h1>
        </div>
        <div class="w-full flex flex-col gap-12 md:gap-6 lg:flex-row-reverse justify-center items-center h-[calc(100vh-7.5rem)]">
          <div class="flex flex-col gap-3 items-center md:items-start">
            <h1 class="text-center md:text-left text-4xl md:max-w-[15ch] md:text-7xl font font-extrabold text-slate-200">
              Acorta tus enlaces
            </h1>
            <form
              onSubmit={handleSubmit}
              id="myForm"
              class="flex flex-col  w-full mt-6 max-w-[760px] justify-center text-xl mx-auto px-6 py-5 bg-gray-700/60 shadow-xl rounded-md"
            >
              <div class="flex flex-col md:flex-row gap-3">
                <input
                  class="w-full bg-white text-gray-900 text-base sm:text-lg 2xl:text-xl  px-5 py-2.5 rounded-md outline-none focus:outline-2 focus:outline-primary-500 transition-all"
                  type="url"
                  placeholder="Ponga el link aqui"
                  required=""
                  ref={inputRef}
                />
                <button
                  type="submit"
                  class="bg-yellow-200 hover:bg-orange-400 text-slate-950 px-5 py-2.5 capitalize rounded-md transition-colors"
                >
                  Acorta!
                </button>
              </div>
              <div class="flex flex-col items-center justify-between">
                {urlArray.map((url, index) => (
                  <li key={index} className="list-none text-center mt-10">
                    <a href={`/${url}`} className="text-3xl"> {url} </a>
                  </li>
                ))}
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
