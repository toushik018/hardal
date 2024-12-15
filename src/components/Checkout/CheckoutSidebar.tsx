import React from "react";

interface CheckoutSidebarProps {
  totalItems: number;
  totalPrice: string;
}

const CheckoutSidebar: React.FC<CheckoutSidebarProps> = ({
  totalItems,
  totalPrice,
}) => {
  return (
    <div className="hidden lg:block lg:w-1/2 xl:w-2/5 bg-second/70 p-12">
      <div className="h-full flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-8">
            Bestellung Zusammenfassung
          </h2>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <div className="flex justify-between text-lg text-white/90 mb-6">
              <span>Gesamte Produkte:</span>
              <span className="font-medium">{totalItems}</span>
            </div>
            
            <div className="pt-6 border-t border-white/10">
              <div className="flex justify-between text-2xl font-bold text-first">
                <span>Gesamtpreis:</span>
                <span>{totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Order Benefits */}
          <div className="space-y-4">
            {[
              { text: "Sichere Bezahlung", icon: "🔒" },
              { text: "Schnelle Lieferung", icon: "🚚" },
              { text: "24/7 Support", icon: "💬" },
            ].map((benefit, index) => (
              <div key={index} className="flex items-center text-white/80">
                <span className="mr-3 text-xl">{benefit.icon}</span>
                <span className="text-sm">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-white/70">
          <p className="text-sm">
            Haben Sie Fragen? Kontaktieren Sie uns:
          </p>
          <p className="font-semibold text-white mt-2">+49 408 470 82</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSidebar;
