import React from "react";

interface MenuItemProps {
  title: string;
  description: string;
  items: number;
  dishes: number;
  price: number;
  people: number;
}

const MenuItem: React.FC<MenuItemProps> = ({
  title,
  description,
  items,
  dishes,
  price,
  people,
}) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
    <div className="bg-emerald-600 p-4">
      <h3 className="text-2xl font-bold text-white">{title}</h3>
      <p className="text-emerald-100">{description}</p>
    </div>
    <div className="p-6">
      <ul className="mb-4">
        <li className="flex items-center mb-2">
          <svg
            className="w-5 h-5 text-emerald-500 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          {items} Choose finger food
        </li>
        <li className="flex items-center">
          <svg
            className="w-5 h-5 text-emerald-500 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          {dishes} available dishes
        </li>
      </ul>
      <div className="text-3xl font-bold text-emerald-600 mb-2">
        from {price.toFixed(2)}€
        <span className="text-base font-normal text-gray-600">/person</span>
      </div>
      <p className="text-sm text-gray-600 mb-4">plus VAT</p>
      <p className="text-sm text-gray-600 mb-4">from {people} people</p>
      <button className="w-full bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600 transition-colors">
        Select dishes
      </button>
    </div>
  </div>
);

const Menu: React.FC = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold text-center mb-8">Finger food menus</h1>
    <p className="text-center text-gray-600 mb-4">
      Cold finger food snacks served on sustainable disposable plates.
    </p>
    <p className="text-center text-gray-600 mb-8">
      Choose between four, five and six appetizers per person.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <MenuItem
        title="Finger food basic"
        description="Clear but inexpensive!"
        items={4}
        dishes={23}
        price={14.9}
        people={15}
      />
      <MenuItem
        title="Finger food classic"
        description="The standard finger food menu"
        items={5}
        dishes={42}
        price={18.9}
        people={15}
      />
      <MenuItem
        title="Finger food premium"
        description="Lots of choice for special occasions!"
        items={6}
        dishes={53}
        price={24.9}
        people={15}
      />
    </div>
    <p className="text-center text-gray-600 mt-8">
      Delivery, assembly, cleaning and collection free of charge, throughout
      Germany! Drinks, equipment and staff can be booked optionally.
    </p>
  </div>
);

export default Menu;
