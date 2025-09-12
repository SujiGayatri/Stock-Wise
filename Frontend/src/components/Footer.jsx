import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) {
      alert("Please enter a message");
      return;
    }
    alert(`Message sent: ${message}`);
    setMessage("");
  };

  return (
    <div className="Footer">
      <div className="FooterMain">
        <div className="FooterIconCircles">
          <h2 className="FooterTitle">Stockwise</h2>
          <p className="FooterContent">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>

          <h3 className="FooterSubTitle">Send what you thought!!</h3>
          <div className="FooterInputWrapper">
            <input
              type="text"
              placeholder="Message…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSend}>Send</button>
          </div>

          <p className="FooterNote">
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="FooterRedirection">
          <strong>HOME</strong>
          <Link to="/stock">STOCK</Link>
          <Link to="/style">STYLE</Link>
          <Link to="/dashboard">DASHBOARD</Link>
          <Link to="/contact">CONTACT</Link>
        </div>

        <div className="FooterContact">
          <strong>CONTACT</strong>
          <p>456 Sample Street</p>
          <p>Los Angeles, CA 90001</p>
          <p>sample@email.com</p>
          <p>(123) 456-7890</p>
        </div>

        <div className="FooterSocials">
          <strong>FOLLOW US</strong>
          <p><span className="FooterIconCircle"><FaLinkedin /></span> LinkedIn</p>
          <p><span className="FooterIconCircle"><FaFacebook /></span> Facebook</p>
          <p><span className="FooterIconCircle"><FaXTwitter /></span> Twitter</p>
          <p><span className="FooterIconCircle"><FaInstagram /></span> Instagram</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
