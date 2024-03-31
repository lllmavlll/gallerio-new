import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase/config'
import { Spinner } from 'react-bootstrap'

const ImageGallery = () => {

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
          console.log(imageData)
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
    <div>
      {imageData && imageData.map((data, index, key) => (
        <>
          <img src={`${data.imageUrl}`} alt="" />
          <p>{data.userEmail}</p>
        </>
      ))}
    </div>
  )
}

export default ImageGallery