import classNames from 'classnames';
import { useState, forwardRef } from 'react';
import images from 'assets/images';
import styles from 'components/Image/Image.module.scss';

const Image = forwardRef(({ src, alt, className, fallBack: customfallBack = images.NoImage, ...props }, ref) => {
    const [fallBack, setfallBack] = useState('');

    const handleError = () => {
        setfallBack(customfallBack);
    };
    return (
        <img
            className={classNames(styles.wrapper, className)}
            ref={ref}
            src={fallBack || src}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
});

export default Image;
