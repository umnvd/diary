import { FunctionComponent, useRef } from 'react';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import '../styles/ImageCropper.css';

interface ImageCropperProps {
    url: string;
    onSave: (croppedImage: string) => void;
}

const ImageCropper: FunctionComponent<ImageCropperProps> = (
    { url, onSave }
) => {
    const cropperRef = useRef<HTMLImageElement>(null);
    const onCrop = () => {
        const imageElement: any = cropperRef?.current;
        const cropper: any = imageElement?.cropper;
        onSave(cropper.getCroppedCanvas().toDataURL());
    };

    return (
        <Cropper
            src={url}
            className='image-cropper'
            initialAspectRatio={1 / 1}
            guides={false}
            crop={onCrop}
            ref={cropperRef}
            viewMode={1}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
        />
    );
};

export default ImageCropper;