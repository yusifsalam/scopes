import Image from 'next/image'

const ImageGallery = ({urls, sign}: {urls: string[], sign: string}) => {
    if (urls.length === 0) {
      return <p>No images for {sign} yet!</p>
    }
    return (
        urls.map((d, i) => (
          <Image key={i} src={d} alt="" height={1024} width={1024} />
        ))
      )
  }
  
export default ImageGallery