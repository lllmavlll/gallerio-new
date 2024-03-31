import React, { useState } from 'react'
import { UserAuth } from '../../../auth/JWTAuthContext'
import { Button } from 'react-bootstrap'

const UploadImage = () => {

  const { startUpload, } = UserAuth()
  const [file, setFile] = useState(null)


  const handleUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
    console.log(file);
  }
  const uploadImage = (e) => {
    e.preventDefault()
    if (file) {
      startUpload(file)
    }
    setFile(null)
  }
  return (
    <div className='d-flex justify-center align-items-center mt-10 min-vh-50'>
      <form onSubmit={e => uploadImage(e)}>
        <input onChange={handleUpload} type='file' />
        <Button type='submit' variant='outline-primary'>upload</Button>
      </form>
    </div>
  )
}

export default UploadImage