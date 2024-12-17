const Section3 = () => {
  return (
    <section id="gallery-section" className="container mx-auto px-4 py-24">
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span
          className="inline-block px-4 py-2 bg-first/5 rounded-full 
                       text-sm font-medium text-first tracking-wide mb-4"
        >
          Galerie
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
          Entdecken Sie unsere{" "}
          <span className="text-first">kulinarischen Meisterwerke</span>
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Ein Einblick in unsere Kreationen, die Ihre Veranstaltung zu einem
          unvergesslichen Erlebnis machen
        </p>
      </div>

      {/* Modern Gallery Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          <div className="group relative overflow-hidden rounded-2xl aspect-[4/5]">
            <img
              src="/images/img1.jpg"
              alt="Culinary creation"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
            <img
              src="/images/img5.jpg"
              alt="Culinary creation"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        {/* Middle Column */}
        <div className="space-y-8 md:translate-y-12">
          <div className="group relative overflow-hidden rounded-2xl aspect-square">
            <img
              src="/images/img4.jpg"
              alt="Culinary creation"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="group relative overflow-hidden rounded-2xl aspect-[4/5]">
            <img
              src="/images/img2.jpg"
              alt="Culinary creation"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
            <img
              src="/images/img3.jpg"
              alt="Culinary creation"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="group relative overflow-hidden rounded-2xl aspect-[4/5]">
            <img
              src="/images/img6.jpg"
              alt="Culinary creation"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section3;
