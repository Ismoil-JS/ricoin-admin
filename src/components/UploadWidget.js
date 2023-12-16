import { useEffect, useRef } from 'react';

const useCloudinaryUpload = (onSuccess) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'dkdpaugkn',
        uploadPreset: 'ricoin-product',
      },
      function (error, result) {
        if (!error && result && result.event === 'success') {
          const imageUrl = result.info.secure_url;
          onSuccess(imageUrl); 
        }
      }
    );
  });

  const openWidget = () => {
    widgetRef.current.open();
  };

  return { openWidget };
};

export default useCloudinaryUpload;
