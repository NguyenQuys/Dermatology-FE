import React, { useEffect, useState } from "react";
import styles from "/src/assets/customer/products/css/style.module.css";
import "/src/assets/customer/products/css/vars.css";

import comesticApi from "../../api/comestic.api";
import { Link } from "react-router-dom";

const Products: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await comesticApi.getAllCometics();
      setData(response.data);
    };
    fetchData();
  }, []);

  console.log(data);

  return (
    <div className={styles.snpM}>
      <div className={styles.section2}>
        <div className={styles.knowYourSkin}>
          <div className={styles.line3}></div>
          <div className={styles.snp2}>
            SẢN PHẨM
            <br />
          </div>
          <div className={styles.line2}></div>
        </div>
        <div className={styles.skinType}>
          {data &&
            data.map((comestic: any) => (
              <Link
                to={`/products/${comestic._id}`}
                className={styles.snp3}
                key={comestic.id}
              >
                <img
                  className={styles.frame6}
                  src="/src/assets/customer/products/images/frame-60.png"
                  alt="Product 1"
                />
                <div className={styles.frame7}>
                  <div className={styles.kemDuongAm}>
                    <span>
                      <span className={styles.kemDuongAmSpan}>
                        {comestic.name}
                        <br />
                      </span>
                      <span className={styles.kemDuongAmSpan2}>
                        Cấp ẩm cho làn da căng bóng, mịn màng
                      </span>
                    </span>
                  </div>
                  <img
                    className={styles.coin1}
                    src="/src/assets/customer/products/images/coin-1-10.png"
                    alt="Price"
                  />
                  <div className={styles.giaBan250000}>
                    Giá bán: {comestic.price}
                  </div>
                  <img
                    className={styles.carts1}
                    src="/src/assets/customer/products/images/carts-10.png"
                    alt="Add to cart"
                  />
                  <img
                    className={styles.star11}
                    src="/src/assets/customer/products/images/star-110.svg"
                    alt="Rating"
                  />
                  <div className={styles.rating}>{comestic.averageRating}</div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
