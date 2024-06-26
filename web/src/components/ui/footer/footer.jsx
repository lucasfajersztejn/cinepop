import { Link } from "react-router-dom";
import footerImage from "../../../assets/images/1.png"
import bg3 from "../../../assets/bg-images/bg4.png";

function Footer() {
  return (

    <footer className="bg-black mt-auto flex-shrink-0 relative">
      <div className="mx-auto max-w-screen-xl px-4 mt-4 pb-8 sm:px-6 lg:px-8">
        <div className="">
          <div className="flex items-center justify-center md:justify-between w-full mb-2">
            <Link to={"/"}><img src={footerImage} className="h-24 hidden md:block" alt="Popcorn image" /></Link>
            <a href="https://www.linkedin.com/in/lucas-fajersztejn-25bb93163/" target="_blank"><p className="font-googleFontFooter text-white hidden md:block text-xl md:text-4xl">Lucas Fajersztejn</p></a>
            <div className="flex flex-col md:flex-row md:gap-4 justify-center items-center">
              <a href="https://www.linkedin.com/in/lucas-fajersztejn-25bb93163/" target="_blank"><p className="font-googleFontFooter text-white md:hidden text-2xl mb-2">Lucas Fajersztejn</p></a>
              <div className="flex justify-center items-center gap-4">
                <a href="https://www.linkedin.com/in/lucas-fajersztejn-25bb93163/" target="_blank"><box-icon name='linkedin-square' type='logo' color='#ffffff' ></box-icon></a>
                <a href="https://github.com/lucasfajersztejn" target="_blank"><box-icon name='github' type='logo' color='#ffffff' ></box-icon></a>
              </div>
              <p className="mt-4 text-center text-sm text-gray-300 lg:mt-0 lg:text-right">
                Copyright &copy; 2024. All rights reserved.
              </p>
            </div>
          </div>
          <img src={bg3} className="absolute  bottom-[-5%] md:bottom-[-30%] lg:bottom-[-60%] xl:bottom-[-85%] 2xl:bottom-[-150%] left-0 w-full object-cover" alt="background movie tape image"/>
        </div>
      </div>
    </footer>

  );
}

export default Footer;
