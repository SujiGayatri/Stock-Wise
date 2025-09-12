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
        {/* <p className={styles.subtext}>
          Lorem ipsum dolor sit amet consectetur adipiscing </p> */}
          {/* <p className={styles.subtext}>elit Ut et massa mi.Aliquam in hendrerit uma.</p> */}
          {/* <p className={styles.subtext}>Pellentesque sit amet sapien.</p> */}
        <p className={styles.welcome}>
          Welcome to <strong>Stockwise</strong> — your smart solution for streamlined inventory management.
        </p>
        <p>
          At StockWise, we believe that inventory should never be a headache. 
          Our mission is to simplify, automate, and empower businesses to manage 
          their stock with complete confidence.
        </p>
        <p>
          Whether you're running a small retail store, scaling an e-commerce brand, 
          or managing a large warehouse, StockWise adapts to your needs. 
          With features like <strong>real-time stock tracking, low-stock alerts, reporting dashboards, and seamless integrations</strong>, 
          we help you reduce errors, cut costs, and keep your operations running smoothly.
        </p>
      </section>

      <section className={styles.mission}>
        <h3>Our Mission :</h3>
        <p>
          To revolutionize inventory management by providing businesses of all sizes 
          with a <strong>reliable, intuitive, and affordable</strong> solution.
        </p>
      </section>

      <section className={styles.productShowcase}>
  <img className={styles.productCard} src={shirt1} loading="lazy"/>
  <img className={styles.productCard} src={shirt2} loading="lazy"/>
<img className={styles.productCard} src={shirt3} loading="lazy"/>
<img className={styles.productCard} src={shirt4} loading="lazy"/>
      </section>

      <section className={styles.whyStockwise}>
        <h3>Why StockWise ?</h3>
        <div className={styles.features}>
          <div className={styles.featureBox}>
            <h4 className={styles.heading}>User-friendly interface</h4>
            <p>Manage your stock with ease using a clean and intuitive design.</p>
          </div>
          <div className={styles.featureBox}>
            <h4 className={styles.heading}>Real-time insights</h4>
            <p>Access live and accurate inventory data whenever you need it.</p>
          </div>
          <div className={styles.featureBox}>
            <h4 className={styles.heading}>Customizable features</h4>
             <p>Adapt StockWise to match the unique needs of your business.</p>
          </div>
          <div className={styles.featureBox}>
            <h4 className={styles.heading}>Dedicated support</h4>
            <p>Our team is with you every step of the way to ensure smooth operations.</p>
          </div>
        </div>
      </section>

      
    </div>
  );
}

export default AboutPage;