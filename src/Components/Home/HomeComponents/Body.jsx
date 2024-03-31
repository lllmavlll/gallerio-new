import React from 'react'
import { Button } from 'react-bootstrap'
import ImageGallery from './ImageGallery'
import UploadImage from './UploadImage'
import { UserAuth } from '../../../auth/JWTAuthContext'
import { toast } from 'sonner'
import Hero from './Hero'

const Body = () => {
  const { user } = UserAuth()

  const uploadToggle = (e) => {
    e.preventDefault()
    toast.warning('You need to have an Account to Upload images!')
  }

  return (
    <div className='min-vh-100'>
      <Hero />
      {user ?

        <UploadImage />
        :
        <>
          <div className='d-flex justify-center align-items-center mt-10 min-vh-50'>
            <p className='mr-3'> upload your images NOW!</p>
            <Button onClick={e => uploadToggle(e)} variant='primary'>Upload</Button>
          </div>
        </>
      }

      <ImageGallery />

    </div>
  )
}

export default Body