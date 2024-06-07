declare module "cloudinary-react" {
    interface ImageProps {
      cloudName: string;
      publicId: string;
      width: number | string;
      //height: number | string;
      crop?: string;
    }
  
    export const Image: React.FC<ImageProps>;
  }
  