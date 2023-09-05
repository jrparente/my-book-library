import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white rounded-lg shadow sm:flex sm:items-center sm:justify-between p-4 sm:p-6 xl:p-8 dark:bg-gray-800">
      <p className="mb-4 text-sm text-center text-gray-500 dark:text-gray-400 sm:mb-0">
        &copy; {currentYear} My Book Library. All rights reserved.
      </p>
      <div className="flex justify-center items-center space-x-1">
        <Link
          href="#"
          className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <FontAwesomeIcon icon={faFacebook} size="lg" />
          <span className="sr-only">Facebook</span>
        </Link>
        <Link
          href="#"
          className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <FontAwesomeIcon icon={faTwitter} size="lg" />
          <span className="sr-only">Twitter</span>
        </Link>
        <Link
          href="#"
          className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <FontAwesomeIcon icon={faGithub} size="lg" />
          <span className="sr-only">Github</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
