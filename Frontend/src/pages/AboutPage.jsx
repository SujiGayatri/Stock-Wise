import React from 'react';
import styles from '../AboutPage.module.css';
import shirt1 from '../assets/AboutUs/shirt1.jpg'
import shirt2 from '../assets/AboutUs/shirt2.jpg'
import shirt3 from '../assets/AboutUs/shirt3.png'
import shirt4 from '../assets/AboutUs/shirt4.png'


function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <section className={styles.aboutUs}>
        <h2>About Us</h2>
        <p className={styles.subtext}>
          Lorem ipsum dolor sit amet consectetur adipiscing </p>
          <p className={styles.subtext}>elit Ut et massa mi.Aliquam in hendrerit uma.</p>
          <p className={styles.subtext}>Pellentesque sit amet sapien.</p>
        <p className={styles.welcome}>
          Welcome to <strong>Stockwise</strong> — your smart solution for streamlined inventory management.
        </p>
        <p>
          In a fast-moving business world, managing inventory accurately and efficiently is more than just important —
          it's essential. That’s why we built Stockwise: to help businesses take control of their inventory with ease,
          precision, and confidence.
        </p>
        <p>
          Whether you're a small retail store, an expanding e-commerce brand, or a large warehouse operation, Stockwise
          is designed to adapt to your needs. With features like real-time stock tracking, low-stock alerts, reporting
          dashboards, and seamless integrations, our platform helps you reduce errors, cut costs, and keep your operations
          running smoothly.
        </p>
      </section>

      <section className={styles.mission}>
        <h3>Our Mission :</h3>
        <p>
          To simplify inventory management for businesses of all sizes by providing a reliable, intuitive, and affordable solution.
        </p>
      </section>

      <section className={styles.productShowcase}>
  <img className={styles.productCard} src={shirt1}/>
  <img className={styles.productCard} src={shirt2}/>
<img className={styles.productCard} src={shirt3}/>
<img className={styles.productCard} src={shirt4}/>
      </section>

      <section className={styles.whyStockwise}>
        <h3>Why StockWise ?</h3>
        <div className={styles.features}>
          <div className={styles.featureBox}>
            <h4 className={styles.heading}>User-friendly interface</h4>
            <p>Spend less time planning, more time managing.</p>
          </div>
          <div className={styles.featureBox}>
            <h4 className={styles.heading}>Real-time insights</h4>
            <p>Stay updated with accurate inventory data.</p>
          </div>
          <div className={styles.featureBox}>
            <h4 className={styles.heading}>Customizable features</h4>
            <p>Built to grow with your business.</p>
          </div>
          <div className={styles.featureBox}>
            <h4 className={styles.heading}>Dedicated support</h4>
            <p>We’re with you every step of the way.</p>
          </div>
        </div>
      </section>

      
    </div>
  );
}

export default AboutPage;
