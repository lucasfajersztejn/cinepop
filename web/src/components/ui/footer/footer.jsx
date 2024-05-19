import footerImage from "../../../assets/images/1.png"


function Footer() {
  return (

    <footer className="bg-black mt-auto flex-shrink-0">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          <img src={footerImage} className="h-24" alt="Popcorn image" />
          <div className="flex flex-col md:flex-row md:gap-4 justify-center items-center">
            <div className="flex justify-center items-center gap-4">
              <a href="https://www.linkedin.com/in/lucas-fajersztejn-25bb93163/" target="_blank"><box-icon name='linkedin-square' type='logo' color='#ffffff' ></box-icon></a>
              <a href="https://github.com/lucasfajersztejn" target="_blank"><box-icon name='github' type='logo' color='#ffffff' ></box-icon></a>
            </div>
            <p className="mt-4 text-center text-sm text-gray-300 lg:mt-0 lg:text-right">
              Copyright &copy; 2024. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>

  );
}

export default Footer;
