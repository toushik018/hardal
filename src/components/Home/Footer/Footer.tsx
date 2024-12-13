import { FaChevronRight } from "react-icons/fa";

const Footer = () => {
  const footerMenu1 = {
    name: "Unsere Dienstleistungen",
    menus: [
      {
        name: "Frühstück",
      },
      {
        name: "Brunch",
      },
      {
        name: "Catering",
      },
      {
        name: "Reservierung",
      },
    ],
  };
  const footerMenu2 = {
    name: "Unser Menü",
    menus: [
      {
        name: "Soups",
      },
      {
        name: "Salads",
      },
      {
        name: "Mixed Grill",
      },
      {
        name: "Falafel",
      },
    ],
  };

  return (
    <div className="bg-third px-[91px] py-[89px]">
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-44">
        <div className="flex flex-col gap-2 md:order-0 order-1">
          <h2 className="font-semibold">{footerMenu1.name}</h2>
          <ul className="flex flex-col gap-2">
            {footerMenu1.menus.map((menu, index) => (
              <li
                key={index}
                className=" cursor-pointer flex flex-row justify-between items-center  hover:border-b-2 py-2 hover:border-first hover:text-first transition-all duration-300 ease-in-out"
              >
                {menu.name}
                <FaChevronRight className="size-5" />
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center gap-2 order-0 md:order-1">
          <img
            src="/logos/logoLarge.png"
            alt="logo"
            width={198}
            height={138}
            className="w-[198px] h-[138px]"
          />
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-[28px]">
              Achtung Neuer Lieferservice
            </h2>
            <span className="md:w-[483px]">
              Einfach anrufen, bestellen und schon bald könnt ihr die bestellten
              Gerichte auch zu Hause vor dem Fernseher oder bei der Arbeit
              genießen.
            </span>
          </div>
          <div className="flex items-center gap-5">
            <img
              src="/icons/facebookIcon.svg"
              alt="icon"
              width={54}
              height={54}
            />
            <img
              src="/icons/InstagramIcon.svg"
              alt="icon"
              width={54}
              height={54}
            />
            <img
              src="/icons/tripAdvisorIcon.svg"
              alt="icon"
              width={54}
              height={54}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 order-2">
          <h2 className="font-semibold">{footerMenu2.name}</h2>
          <ul className="flex flex-col gap-2">
            {footerMenu2.menus.map((menu, index) => (
              <li
                key={index}
                className=" cursor-pointer flex flex-row justify-between items-center  hover:border-b-2 py-2 hover:border-first hover:text-first transition-all duration-300 ease-in-out"
              >
                {menu.name}
                <FaChevronRight className="size-5" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
