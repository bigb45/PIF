import { FacebookOutlined, LinkedIn } from "@mui/icons-material";
import { Instagram, Twitter } from "lucide-react";
import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-400">
            <FacebookOutlined className="fab fa-facebook-f"></FacebookOutlined>
          </a>
          <a href="#" className="hover:text-gray-400">
            <Twitter className="fab fa-twitter"></Twitter>
          </a>
          <a href="#" className="hover:text-gray-400">
            <Instagram className="fab fa-instagram"></Instagram>
          </a>
          <a href="#" className="hover:text-gray-400">
            <LinkedIn className="fab fa-linkedin-in"></LinkedIn>
          </a>
        </div>
        <p className="text-sm mt-4">
          &copy; {new Date().getFullYear()} Placeholder Technologies. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
