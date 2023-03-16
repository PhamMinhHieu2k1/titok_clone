import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    text = false,
    disable = false,
    rounded = false,
    outline = false,
    small = false,
    large = false,
    children,
    className,
    lefticon,
    onClick,
    ...passProps
}) {
    let Comp = 'button';

    const props = {
        onClick,
        ...passProps,
    };

    // Disable
    if (disable) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else {
        props.href = href;
        Comp = 'a';
    }

    const clases = cx('wrapper', {
        [className]: className,
        primary,
        text,
        disable,
        rounded,
        outline,
        small,
        large,
    });
    return (
        <Comp className={clases} {...props}>
            {lefticon && <span className={cx('icon')}>{lefticon}</span>}
            <span className={cx('title')}>{children}</span>
        </Comp>
    );
}

export default Button;
