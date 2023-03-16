import { useEffect, useState, useRef } from 'react';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import TippyHeadless from '@tippyjs/react/headless';
import { Wapper as PopperWrapper } from 'components/Popper';
import AccountsItem from 'components/AccountsItem';

import * as searchService from 'Services/searchService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useDebounce } from '../hooks';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setsearchValue] = useState('');
    const [searchResult, setsearchResult] = useState([]);
    const [showResult, setshowResult] = useState(true);
    const [Loading, setLoading] = useState(false);
    const debounce = useDebounce(searchValue, 400);

    const inputRef = useRef();

    useEffect(() => {
        if (!debounce.trim()) {
            setsearchResult([]);

            return;
        }

        setLoading(true);
        //
        const fetchApi = async () => {
            setLoading(true);
            const result = await searchService.search(debounce);
            setsearchResult(result);
            setLoading(false);
        };
        fetchApi();
    }, [debounce]);
    const handleHideResult = () => {
        setshowResult(false);
    };
    const handleChange = (e) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setsearchValue(searchValue);
        }
    };

    return (
        <div>
            <TippyHeadless
                interactive
                appendTo={() => document.body}
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.map((result) => (
                                <AccountsItem key={result.id} data={result}></AccountsItem>
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search Accounts and videos"
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setshowResult(true)}
                    ></input>

                    {!!searchValue && !Loading && (
                        <button
                            className={cx('clear')}
                            onClick={() => {
                                setsearchValue('');
                                inputRef.current.focus();
                            }}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {Loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </TippyHeadless>
        </div>
    );
}

export default Search;
