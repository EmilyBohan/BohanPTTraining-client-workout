import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
const Footer = () => {
  return (
    <div className="py-8 px-7 md:px-14 lg:px-28 text-lg text-center flex flex-col md:flex-row justify-between items-center">
      <p className="text-gray-500">
        © 2021 Bohan PT & Training. All rights reserved.
      </p>
      <ul className="flex gap-5 mt-5 md:mt-0">
        <li className="border-2 border-primary rounded-full p-3 hover:bg-primary hover:text-white cursor-pointer">
          <a href="https://www.instagram.com/bohanpttraining/">
            <FaInstagram size={25} />
          </a>
        </li>
        <li className="border-2 border-primary rounded-full p-3 hover:bg-primary hover:text-white cursor-pointer">
          <a href="https://www.facebook.com/people/Bohan-PT-Training-PLLC/61566740589366/">
            <FaFacebookSquare size={25} />
          </a>
        </li>
        <li className="border-2 border-primary rounded-full p-3 hover:bg-primary hover:text-white cursor-pointer">
          <a href="https://bohanpttraining.netlify.app/">
            <TbWorld size={25} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
