interface MovingImageProps {
    src: string;  // Define the expected type for `src`
}

function MovingImage({ src }:MovingImageProps) {  // Accept src as a prop
    return (
        <img 
            src={src}  // Use src prop for the image source
            alt="NBA Dunk"
            className="center left-0 bottom-0 min-w-full min-h-75 w-full overflow-hidden object-cover object-top z-negative"
        />
    );
}

export default MovingImage;
