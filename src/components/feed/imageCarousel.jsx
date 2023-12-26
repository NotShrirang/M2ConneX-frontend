import React, { useState } from "react";

const PostCarousel = ({ post }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => prevIndex + 1);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <div className="relative w-full h-64">
      {post.images && post.images.length > 0 && (
        <>
          {post.images.map((image, index) => (
            <img
              key={index}
              className={`relative w-full h-full object-cover transition-transform duration-300 transform ${
                index === currentImageIndex ? "" : "hidden"
              }`}
              src={image.image}
              alt=""
            />
          ))}
          {post.images.length > 1 && (
            <>
              {currentImageIndex > 0 && (
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full font-bold"
                >
                  &lt;
                </button>
              )}
              {currentImageIndex < post.images.length - 1 && (
                <button
                  onClick={nextImage}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full font-bold"
                >
                  &gt;
                </button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PostCarousel;
