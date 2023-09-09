import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function SocialLinks({ facebook, twitter, linkedin }) {
  return (
    <div className="flex space-x-5">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={facebook || "https://www.facebook.com"}
      >
        <FontAwesomeIcon icon={faFacebook} size="2x" />
      </a>

      <a
        href={twitter || "https://www.twitter.com"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </a>

      <a
        target="_blank"
        rel="noopener noreferrer"
        href={linkedin || "https://www.linkedin.com"}
      >
        <FontAwesomeIcon icon={faLinkedin} size="2x" />
      </a>
    </div>
  );
}

export default SocialLinks;
