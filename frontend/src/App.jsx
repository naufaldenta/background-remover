import { useState } from 'react'
import './App.css'


function App() {

  async function removeBg(url) {
    
    let res = await fetch('https://be-removebg.vercel.app/removebg?url='+url , {
      referrerPolicy: "unsafe-url" 
    })
    
    let data = await res.json()

    let img = await fetch(data.url.result)
    let buffer = await img.arrayBuffer()
    return buffer
  }

  async function upload(blob) {

    const formData = new FormData();
    formData.append("file", blob);

    const response = await fetch("https://itzpire.com/tools/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      let res = await response.json()
      let rem = await removeBg(res.fileInfo.url)
      return rem
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  const [resultBuffer, setResultBuffer] = useState()
  const [file, setFile] = useState();
  const [isFile, setIsFile] = useState('')
  const [isDone, setIsDone] = useState('hidden')
  const [isRes, setIsRes] = useState('hidden')
  async function handleChange(e) {
    setIsFile('hidden')
    setIsDone('')
    let data = await upload(e.target.files[0])
    console.log(data)
    setIsDone('hidden')
    setIsRes('')
    let img = new Blob([data], { type: "image/png" });
    setFile(URL.createObjectURL(img));
    setResultBuffer(data)

  }

  async function handleDownload() {
    let file = new Blob([resultBuffer], { type: "image/png" });
    let a = document.createElement("a"), url = URL.createObjectURL(file);
    a.href = url;
    a.download = 'result.png';
    document.body.appendChild(a);
    a.click();
  }

  return (
    <div className='main'>
      <div className='container p-10 flex flex-col md:justify-center md:align-middle md:place-content-center h-screen w-full'>
        <h1 className='text-blue-400 drop-shadow-xl font-bold  md:text-5xl text-3xl'>Hallo, disini kamu dapat menghilangkan background pada foto!</h1>
        <p className='text-gray-500 font-bold mt-4 text-lg'>Taruh foto yang ingin di hilangkan backgroundnya dibawah ini!</p>

        <div className={`flex items-center justify-center w-full mt-5 ${isFile}`}>
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-opacity-50 bg-gray-500 hover:bg-gray-600 hover:bg-opacity-45">

            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p className="mb-2 text-sm text-gray-200"><span className="font-semibold">Click to select image</span> or drag and drop</p>
              <p className="text-xs text-gray-300">SVG, PNG, JPG</p>

            </div>
            <input id="dropzone-file" type="file" className="hidden" accept='image/*' onChange={handleChange} />
          </label>
        </div>
        <div className='result-area flex flex-wrap justify-center align-middle mt-10'>
          <div role="status" className={isDone}>

            <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
          </div>
          <p className={`font-bold text-blue-400 text-xl ${isRes}`}>Ini dia hasilnya!</p>
          <div className={`bg-gray-500 flex bg-opacity-45 rounded-xl p-10 border-2 border-gray-500 justify-center w-full ${isRes}`}>
            <img className='' src={`${file}`} alt="" width={200} />
          </div>
          <button className={`bg-blue-400 w-full rounded-lg py-2.5 px-1 mt-5 ${isRes} hover:bg-blue-500`} onClick={() => handleDownload()}>Download Result</button>
          <a href='' className={`bg-blue-400 py-2.5 px-3 rounded-lg mt-5 ${isRes}`}>Hasil tidak memuaskan? coba lagi</a>
        </div>

      </div>
    </div>
  )
}

export default App