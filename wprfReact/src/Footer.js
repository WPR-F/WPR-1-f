import './Footer.css';

export default function App() {
  return (
      <div className="footer-container">
          <div className="copyright">
              <ul>
                  <li>
                      <a>© 2023 Stichting Accessibility</a>
                  </li>
              </ul>
          </div>
          <div className="footer-buttons">
              <ul>
                  <li>
                      <a href="#Disclaimer">Disclaimer</a>
                  </li>
                  <li>
                      <a href="#Privacy policy">Privacy policy</a>
                  </li>
                  <li>
                      <a href="#Sitemap">Sitemap</a>
                  </li>
                  <li>
                      <a href="#Cookies">Cookies</a>
                  </li>
                  <li>
                      <a href="#Toegankelijkheidsverklaring">Toegankelijkheidsverklaring</a>
                  </li>
              </ul>
          </div>
      </div>
  );
}

