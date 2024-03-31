import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Image } from 'react-bootstrap';
import { db } from '../../../firebase/config'
import { Spinner } from 'react-bootstrap'
import { UserAuth } from '../../../auth/JWTAuthContext'

const ImageGallery = () => {

  const { user } = UserAuth()

  const [imageData, setImageData] = useState([])
  const [isLoading, setIsLoadind] = useState(true)


  useEffect(() => {
    let unsubscribe
    const getData = async () => {
      try {

        const q = query(collection(db, "images"), orderBy("createdAt", "desc"));
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const images = [];
          querySnapshot.forEach((doc) => {
            const imageUrl = doc.data().imageUrl
            const userEmail = doc.data().userEmail
            const createdAt = doc.data().createdAt
            images.push({ imageUrl, userEmail, createdAt })
          });
          setImageData(images)
          console.log(images)
          setIsLoadind(false)
        });
      } catch (error) {
        console.error(error)
        setIsLoadind(false)
      }
    }

    getData()
    return () => {
      unsubscribe()
    }
  }, [])

  if (isLoading) {
    return (
      <>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </>
    )

  }


  return (
    <div className='grid md:grid-cols-3 justify-center gap-3 mt-10'>
      {imageData && imageData.map(data => (
        <div
          key={data.imageUrl}
          className='card card-compact w-full bg-base-100 shadow-xl border-radius-20'
        >
          <figure>
            <img src={data.imageUrl} alt='pics' />
          </figure>
          <div className='card-body'>
            <p>uploaded by:
              <span className='text-primary ml-1'>{data.userEmail}</span>
            </p>
            <span className='text-muted' >Posted on :{data.createdAt.toLocaleString()}</span>
          </div>

        </div>
      ))}
    </div>
  )
}

export default ImageGallery