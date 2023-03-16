import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from 'assets/images';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';
import routerConfig from 'configs/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faEllipsisVertical,
    faEarthAsia,
    faQuestionCircle,
    faKeyboard,
    faUser,
    faCoins,
    faGear,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Button';
import Menu from 'components/Popper/Menu';
import 'tippy.js/dist/tippy.css';
import { MessIcons, MailIcons } from 'components/Icons';
import Image from 'components/Image';
import Search from '../Search';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faQuestionCircle} />,
        title: 'Feedback and Help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortuts',
    },
];

function Header() {
    const handleMenuChange = (MenuItems) => {
        switch (MenuItems.type) {
            case 'language':
                break;
            //handle change
            default:
        }
    };

    const currentMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@hoaa',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: '/logout',
            separate: true,
        },
    ];

    const currentUser = true;

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={routerConfig.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="titok" />
                </Link>

                <Search></Search>

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Button text lefticon={<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>}>
                                Upload
                            </Button>
                            <Tippy delay={[0, 100]} content="Tin nhắn" placement="bottom">
                                <button className={cx('action-btn-mess')}>
                                    <MessIcons></MessIcons>
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 100]} content="Hộp thư" placement="bottom">
                                <button className={cx('action-btn-mail')}>
                                    <MailIcons></MailIcons>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text lefticon={<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>}>
                                Upload
                            </Button>
                            <Button primary>Log in</Button>
                        </>
                    )}
                    <Menu items={currentUser ? currentMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/c491be0fc7a4213d13a8cf9f12ba776a~c5_100x100.jpeg?x-expires=1676163600&x-signature=kONSm5vNhe2LAJ50DR5xssSzLSI%3D"
                                className={cx('user-avatar')}
                                alt="Hasaki"
                            />
                        ) : (
                            <button className={cx('icon-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}
export default Header;
