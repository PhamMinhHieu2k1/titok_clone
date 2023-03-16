import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './AccountsItem.module.scss';
import Image from 'components/Image';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function AccountsItem({ data }) {
    return (
        <Link to={`/@${data.nickname}`} className={cx('wapper')}>
            <Image className={cx('avatar')} src={data.avatar} alt={data.full_name}></Image>
            <div className={cx('info')}>
                <p className={cx('name')}>
                    <span>{data.full_name}</span>
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </p>
                <span className={cx('username')}>{data.nickname} </span>
            </div>
        </Link>
    );
}

export default AccountsItem;
