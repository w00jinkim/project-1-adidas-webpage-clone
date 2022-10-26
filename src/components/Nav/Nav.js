import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SlMagnifier } from 'react-icons/sl';
import { BiUser, BiHeart } from 'react-icons/bi';
import { RiShoppingBagLine } from 'react-icons/ri';
import { GiHamburgerMenu } from 'react-icons/gi';
import './Nav.scss';
import MIDNAVBAR_LINKER from './NavSD';

const Nav = () => {
  const [search, setSearch] = useState('');
  const [mockDataFetch, setMockDataFetch] = useState([]);
  const [wishlistFetch, setWishlistFetch] = useState([]);
  // const wishlistProductsCount = wishlistFetch.count();

  const onSearch = event => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  useEffect(() => {
    fetch('/data/Navmockdata/navmockdata.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setMockDataFetch(data);
      });
  }, []);

  // useEffect(() => {
  //   fetch('')
  //     .then(res => res.json())
  //     .then(data => setWishlistFetch(data));
  // });

  const [menShown, setMenShown] = useState(false);
  const [womenShown, setWomenShown] = useState(false);

  return (
    <div className="navComponent">
      <nav className="nav">
        <div className="navBox">
          <div className="upperNavBox">
            <button className="leftNotice">가입/로그인/배송지 입력 안내</button>
            <button className="middleNotice">
              회원가입 10% 쿠폰 및 생일 쿠폰 지급 관련 기준 안내
            </button>
            <button className="rightNotice">택배 서비스 안내사항</button>
          </div>
          <div className="middleNavBox">
            <div className="assistSection">
              {MIDNAVBAR_LINKER.map(el => (
                <Link key={el.id} className="link" to={el.url}>
                  {el.content}
                </Link>
              ))}
            </div>
          </div>
          <div className="lowerNavBox">
            <button className="leftMenuBar">
              <GiHamburgerMenu />
            </button>
            <div className="logo">
              <Link to="/">Wedidas</Link>
            </div>
            <div className="mainMenu">
              <ul className="mainMenuListing">
                <li
                  className="menuMen"
                  onMouseEnter={() => setMenShown(true)}
                  onMouseOver={() => setWomenShown(false)}
                >
                  MEN
                </li>
                <li
                  className="menuWomen"
                  onMouseEnter={() => setWomenShown(true)}
                  onMouseOver={() => setMenShown(false)}
                >
                  WOMEN
                </li>
                <li className="menuSports">SPORTS</li>
                <li className="menuBrands">BRANDS</li>
              </ul>
            </div>
            <div className="sideMenu">
              <div className="searchWrapper">
                <form action="/search">
                  <input
                    className="searchBar"
                    type="text"
                    value={search}
                    placeholder="검색"
                    onChange={onSearch}
                  />
                  <button className="searchSubmit" type="submit">
                    <SlMagnifier />
                  </button>
                </form>
              </div>
              <div className="iconWrapper">
                <Link to="/login">
                  <BiUser className="iconUser" />
                </Link>
                <Link to="/wishlist">
                  <BiHeart className="iconHeart" />
                </Link>
                <Link to="/cart">
                  <RiShoppingBagLine className="iconBag" />
                </Link>
                {/* {wishlistFetch.userId === userid ? 
                <p className='numbersofItemsinCart'>{wishlistFetch.userId.total{wishlistFetch.userId.total > 0 ? wishlistFetch.userId.total : null}}</p>
              : null }  */}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="hoverWholeBox">
        <div
          className="menHoverContainer"
          onMouseLeave={() => setMenShown(false)}
        >
          {menShown && (
            <div className="hoverContainer">
              {mockDataFetch
                .filter(mockDataFetch => mockDataFetch.gender === '남성')
                .map(data => (
                  <div key={data.id} className="mock">
                    <Link className="mainCategory" to={data.shoes.url}>
                      {data.shoes.name}
                    </Link>
                    {data.shoesCategory.map(el => (
                      <Link to={el.url}>{el.name}</Link>
                    ))}
                  </div>
                ))}
            </div>
          )}
          {menShown && (
            <div className="underLayOut">
              {mockDataFetch
                .filter(mockDataFetch =>
                  mockDataFetch.shoes.name.includes('남성')
                )
                .map((data, idx) => (
                  <Link key={data.id} className={data.id} to={data.shoes.url}>
                    {data.shoes.name}
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>
      <div className="hoverWholeBox">
        <div
          className="womenhoverContainer"
          onMouseLeave={() => setWomenShown(false)}
        >
          {womenShown && (
            <div className="hoverContainer">
              {mockDataFetch
                .filter(mockDataFetch => mockDataFetch.gender === '여성')
                .map(data => (
                  <div key={data.id} className="mock">
                    <Link to={data.shoes.url} className="mainCategory">
                      {data.shoes.name}
                    </Link>
                    {data.shoesCategory.map(el => (
                      <Link to={el.url}>{el.name}</Link>
                    ))}
                  </div>
                ))}
            </div>
          )}
          {womenShown && (
            <div className="underLayOut">
              {mockDataFetch
                .filter(mockDataFetch =>
                  mockDataFetch.shoes.name.includes('여성')
                )
                .map(data => (
                  <Link key={data.id} className={data.id} to={data.shoes.url}>
                    {data.shoes.name}
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
