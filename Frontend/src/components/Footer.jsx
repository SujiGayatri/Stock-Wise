import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useState } from "react";
import { Link } from "react-router-dom";

const socials = [
  { icon: <FaFacebook />, url: "https://facebook.com" },
  { icon: <FaInstagram />, url: "https://instagram.com" },
  { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/suji-gayatri-kadiyala-075030256/" },
  { icon: <FaXTwitter />, url: "https://twitter.com" },
];

const Footer = () => {
  const [message, setMessage] = useState("");
  const handleInput = (e) => setMessage(e.target.value);
  const handleSend = () => {
    if (!message.trim()) return alert("Please enter a message");
    alert(`Message sent: ${message}`);
    setMessage("");
  };
  return (
    <div className="Footer">
      <div className="FooterMain">
        <div className="FooterIconCircles">
          <h2 className="FooterTitle">Stockwise</h2>
          <p className="FooterContent">Manage wardrobe, style effortlessly</p>
          <h3 className="FooterSubTitle">Send what you thought!!</h3>
          <div className="FooterInputWrapper">
            <input type="text" placeholder="Message…" value={message} onChange={handleInput} />
            <button onClick={handleSend}>Send</button>
          </div>
          <div className="FooterSocials">
            {socials.map(({ icon, url }, i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="FooterSocialIcon">{icon}</a>
            ))}
          </div>
          <p className="FooterNote">Optimize clothing, discover new styles</p>
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
          <p>Kakinada</p>
          <p>Andhra Pradesh,India</p>
          <p>stockwise45@email.com</p>
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
