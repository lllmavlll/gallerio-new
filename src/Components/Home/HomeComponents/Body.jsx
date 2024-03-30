import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

const Body = () => {

  const [file, setFile] = useState(null)

  const handleUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files)
    }
    console.log(file);
  }
  const uploadImage = (e) => {
    e.preventDefault()
    if (file) {
      console.log(file);
    }
    setFile(null)
  }
  return (
    <div className='min-vh-100'>
      <form onSubmit={e => uploadImage(e)}>
        <input onChange={handleUpload} type='file' />
        <Button type='submit' variant='outline-primary'>upload</Button>
      </form>
    </div>
  )
}

export default Body