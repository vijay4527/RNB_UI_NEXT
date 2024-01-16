// components/ImageZoom.js
import React from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';

const ProductImageZoom = ({ imageSrc }) => {
    console.log("Image Source:", imageSrc);
    return (
        <InnerImageZoom
            src='https://ribbonsandballoons.com/assets1/uploads/Chocolate-Razzo-Web-Products_488008.jpg'
            zoomSrc='https://ribbonsandballoons.com/assets1/uploads/Chocolate-Razzo-Web-Products_488008.jpg'
            alt="Your Image"
            zoomType="hover"
            zoomPreload={true}
            hideCloseButton={true}
            imgAttributes={{
                srcSet: 'https://ribbonsandballoons.com/assets1/uploads/Chocolate-Razzo-Web-Products_488008.jpg'
            }}
                sources={[{
                srcSet: 'https://ribbonsandballoons.com/assets1/uploads/Chocolate-Razzo-Web-Products_488008.jpg',
                media: '(min-width: 768px)'
            }]}
        />
    
  );
};
export default ProductImageZoom;
