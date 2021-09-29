import React from 'react';
import { useEffect, useState } from 'react';
import paginate from './utils';

const url = 'https://jsonplaceholder.typicode.com/photos';

const useFetch = () => {
  const [loading, setLoading] = useState(true);
  const [data , setData ] = useState([]);
  const [images, setImages ] = useState([])
     //FETCH THE IMAGES
    const fetchImages = async () => {
    const reponse = await fetch(`${url}`)
    const images = await reponse.json()
    setData(paginate(images))
    setImages(images.slice(0,200))
    setLoading(false)
  }

  useEffect(() => {
      fetchImages()
  }, [])
    return { loading, data, images }
}

export default useFetch;

