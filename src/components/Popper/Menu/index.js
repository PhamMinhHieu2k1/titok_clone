import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Wapper as PopperWrapper } from 'components/Popper';
import MenuItems from './MenuItems';
import styles from './Menu.module.scss';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles);

const defaultFN = () => {};

function Menu({ children, items = [], hideOnClick = false, onChange = defaultFN }) {
    const [history, sethistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isPArent = !!item.children;

            return (
                <MenuItems
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isPArent) {
                            sethistory((pev) => [...pev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };
    return (
        <Tippy
            interactive
            delay={[0, 500]}
            offset={[13, 8]}
            hideOnClick={hideOnClick}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-items')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-poper')}>
                        {history.length > 1 && (
                            <Header
                                title="Language"
                                onBack={() => {
                                    sethistory((prev) => prev.slice(0, prev.length - 1));
                                }}
                            />
                        )}
                        <div className={cx('menu-body')}> {renderItems()}</div>
                    </PopperWrapper>
                </div>
            )}
            onHide={() => sethistory((prev) => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
