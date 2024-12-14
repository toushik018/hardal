import { FaChevronRight } from "react-icons/fa";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
  const footerMenu1 = {
    name: "Unsere Dienstleistungen",
    menus: [
      { name: "Frühstück" },
      { name: "Brunch" },
      { name: "Catering" },
      { name: "Reservierung" },
    ],
  };

  const footerMenu2 = {
    name: "Unser Menü",
    menus: [
      { name: "Soups" },
      { name: "Salads" },
      { name: "Mixed Grill" },
      { name: "Falafel" },
    ],
  };

  return (
    <footer className="bg-third">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-20">
          {/* Services Section */}
          <div className="flex flex-col gap-6 md:order-0 order-1">
            <h2 className="text-xl font-semibold">{footerMenu1.name}</h2>
            <ul className="flex flex-col gap-3">
              {footerMenu1.menus.map((menu, index) => (
                <li
                  key={index}
                  className="group cursor-pointer flex items-center justify-between 
                           py-2 border-b border-transparent hover:border-first 
                           hover:text-first transition-all duration-300"
                >
                  <span className="font-medium">{menu.name}</span>
                  <FaChevronRight className="size-4 transform group-hover:translate-x-1 transition-transform" />
                </li>
              ))}
            </ul>
          </div>

          {/* Center Logo Section */}
          <div className="flex flex-col items-center gap-8 order-0 md:order-1">
            <Image
              src="/logos/logoLarge.png"
              alt="Hardal Catering"
              width={198}
              height={138}
              className="w-auto h-auto"
            />
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold">
                Achtung Neuer Lieferservice
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-md">
                Einfach anrufen, bestellen und schon bald könnt ihr die bestellten
                Gerichte auch zu Hause vor dem Fernseher oder bei der Arbeit
                genießen.
              </p>
            </div>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-first/10 flex items-center justify-center
                         hover:bg-first hover:text-white transition-all duration-300"
              >
                <FaFacebookF className="size-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-first/10 flex items-center justify-center
                         hover:bg-first hover:text-white transition-all duration-300"
              >
                <FaInstagram className="size-5" />
              </a>
              <Image
                src="/icons/tripAdvisorIcon.svg"
                alt="TripAdvisor"
                width={54}
                height={54}
                className="hover:opacity-80 transition-opacity"
              />
            </div>
          </div>

          {/* Menu Section */}
          <div className="flex flex-col gap-6 order-2">
            <h2 className="text-xl font-semibold">{footerMenu2.name}</h2>
            <ul className="flex flex-col gap-3">
              {footerMenu2.menus.map((menu, index) => (
                <li
                  key={index}
                  className="group cursor-pointer flex items-center justify-between 
                           py-2 border-b border-transparent hover:border-first 
                           hover:text-first transition-all duration-300"
                >
                  <span className="font-medium">{menu.name}</span>
                  <FaChevronRight className="size-4 transform group-hover:translate-x-1 transition-transform" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} Hardal Catering. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
