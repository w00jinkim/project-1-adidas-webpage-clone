import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import WishProduct from './components/WishProduct';
import Button from '../../components/Button/Button';
import './Wishlist.scss';

const Wishlist = () => {
  const [wishItemList, setWishItemList] = useState([]);
  const itemZero =
    '아직 관심 목록에 저장한 항목이 없습니다. 쇼핑을 시작하고 관심 목록에 좋아하는 제품을 추가하세요.';

  useEffect(() => {
    fetch('http://10.58.52.231:3000/wishlists', {
      method: 'GET',
      headers: {
        // Authorization: localStorage.getItem('token'),
        authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTY2NjM0MzA4MywiZXhwIjoxNjY3MTIwNjgzfQ.TrSZfWZYTYsCkQEYAjarC_BuWh5cK8QTfLHR83WpIaQ',
      },
    })
      .then(res => res.json())
      .then(data => {
        setWishItemList(data.wishlists);
      });
  }, [wishItemList]);

  const onRemove = useCallback(
    id => {
      setWishItemList(wishItemList.filter(item => item.productId !== id));
    },
    [wishItemList]
  );

  return (
    <div className="wishList">
      <p className="title">나의 관심 목록</p>
      <p className="productCount">총 {wishItemList.length} 주문상품</p>
      {wishItemList.length === 0 ? (
        <p>{itemZero}</p>
      ) : (
        <>
          <div className="wishListItem">
            {wishItemList &&
              wishItemList?.map(item => (
                <WishProduct
                  className="wishItem"
                  key={item.productId}
                  data={item}
                  onRemove={onRemove}
                />
              ))}
          </div>
          <div className="signupBanner">
            <p className="signupTitle">관심 목록을 꼭 간직하세요</p>
            <p className="description">
              아디클럽에 가입하고 첫 번째 주문에 대한 15% 할인 바우처를
              받으세요. 로그인 하면 아이템을 저장할 수 있습니다.
            </p>

            <Link to="/signup">
              <Button>가입하기</Button>
            </Link>

            <p className="signin">아디클럽 회원이신가요?</p>
            <Link to="/login">로그인</Link>
          </div>
        </>
      )}
    </div>
  );
};
export default Wishlist;
