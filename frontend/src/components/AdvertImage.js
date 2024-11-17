import React, { useEffect, useState } from 'react'
import { Skeleton } from '@mui/material'

const AdvertImage = ({imageUrl, altText, width, height}) => {
    const [loading, setLoading] = useState(true);
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        const loadImage = async () => {
            try {
                const response = await fetch(imageUrl);
                const blob = await response.blob();
                const objectUrl = URL.createObjectURL(blob);
                setImageSrc(objectUrl);
            }
            catch (error) {
                console.error("Error loading image:", error);
            }
            finally {
                setLoading(false);
            }
        }

        loadImage();
    }, [imageUrl]);
  return (
    <div>
        {loading ? (
            <Skeleton animation={"wave"} variant='rectangular' width={width} height={height}/>
        ) : (
            <img src={imageSrc} alt={altText} width={width} height={height}/>
        )}
    </div>
  )
}

export default AdvertImage