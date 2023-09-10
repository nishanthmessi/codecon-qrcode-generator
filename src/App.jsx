import { useState } from 'react'
import { CompactPicker } from 'react-color'

const App = () => {
  const [content, setContent] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [codeColor, setCodeColor] = useState('')
  const [bgColor, setBgColor] = useState('')
  const [format, setFormat] = useState('')
  const [codeUrl, setCodeUrl] = useState('')

  const handleCodeGenerate = async () => {
    const encodedContent = encodeURIComponent(content)

    const res = await fetch(
      `http(s)://api.qrserver.com/v1/create-qr-code/?data=${encodedContent}&size=${width}x${height}&color=${codeColor}&bgcolor=${bgColor}&format=${format}`
    )
    setCodeUrl(res.url)
  }

  const handleCodeDownload = async () => {}

  return (
    <>
      <div className='flex flex-col items-center'>
        <h1 className='text-2xl'>QR Code Generator</h1>
        <form className='flex flex-col gap-6'>
          <div className='flex flex-col min-w-[500px]'>
            <label className='text-lg font-medium'>Content</label>
            <input
              type='text'
              className='border border-gray-300 outline-none px-2 py-1 rounded-lg w-full'
              placeholder=''
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className='flex justify-between gap-6 '>
            <div className='flex flex-col'>
              <label className='text-lg font-medium'>Width</label>
              <input
                type='text'
                className='border border-gray-300 outline-none px-2 py-1 rounded-lg w-full'
                placeholder=''
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />
            </div>
            <div className='flex flex-col'>
              <label className='text-lg font-medium'>Height</label>
              <input
                type='text'
                className='border border-gray-300 outline-none px-2 py-1 rounded-lg w-full'
                placeholder=''
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>

          <div className='flex gap-6'>
            <div className='flex flex-col gap-2'>
              <label className='text-lg font-medium'>QR Code Color</label>
              <CompactPicker
                color={codeColor}
                onChangeComplete={(e) =>
                  setCodeColor(e.hex.split('#').join(''))
                }
              />
              <input
                type='text'
                className='border border-gray-300 outline-none px-2 py-1 rounded-lg w-full'
                placeholder='Code color'
                value={`#${codeColor}`}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-lg font-medium'>QR Background Color</label>
              <CompactPicker
                color={bgColor}
                onChangeComplete={(e) => setBgColor(e.hex.split('#').join(''))}
              />
              <input
                type='text'
                className='border border-gray-300 outline-none px-2 py-1 rounded-lg w-full'
                placeholder='Code background color'
                value={`#${bgColor}`}
              />
            </div>
          </div>

          <div className='flex flex-col'>
            <label className='text-lg font-medium'>Format</label>
            <select
              className='border border-gray-300 px-2 py-1 rounded-lg'
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            >
              <option default value=''>
                Select Format
              </option>
              <option value='jpg'>JPG</option>
              <option value='png'>PNG</option>
              <option value='svg'>SVG</option>
            </select>
          </div>
        </form>

        <div className='flex gap-7 mt-10'>
          <button
            className='px-2 py-1.5 rounded-lg bg-gray-700 text-white hover:bg-gray-800 hover:shadow-xl'
            onClick={handleCodeGenerate}
          >
            Generate QR Code
          </button>
          <button
            className='px-2 py-1.5 rounded-lg border border-gray-300 hover:border-gray-500 hover:shadow-xl'
            onClick={handleCodeDownload}
          >
            Download QR Code
          </button>
        </div>

        <div>
          <h1>QR Code URL</h1>
          <p>{!codeUrl ? 'Generate your QR code' : codeUrl}</p>
        </div>
      </div>
    </>
  )
}

export default App
