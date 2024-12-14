// Create a skeleton component for the shop page
const ShopSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] animate-pulse">
      {/* Header Skeleton */}
      <div className="sticky top-0 z-30 bg-white border-b">
        <div className="w-full px-5 py-6">
          <div className="max-w-[1400px] mx-auto">
            {/* Category Info */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-48 bg-gray-200 rounded-lg" />
              <div className="h-6 w-32 bg-gray-200 rounded-lg" />
            </div>

            {/* Stepper Skeleton */}
            <div className="w-full">
              <div className="flex items-center justify-between relative">
                {/* Progress Line Background */}
                <div className="absolute top-[18px] left-[5%] right-[5%] h-[2px] bg-gray-200" />
                {/* Progress Line Loaded */}
                <div className="absolute top-[18px] left-[5%] w-[30%] h-[2px] bg-first" />

                {/* Step Circles */}
                {[1, 2, 3, 4].map((_, idx) => (
                  <div key={idx} className="relative flex flex-col items-center z-10">
                    {/* Step Circle */}
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center 
                      ${idx === 0 ? 'bg-first' : 'bg-white border-2 border-gray-200'}`}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full 
                        ${idx === 0 ? 'bg-white' : 'bg-gray-200'}`} 
                      />
                    </div>
                    {/* Step Label */}
                    <div className="mt-1.5 h-3 w-16 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="w-full px-5 py-6">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Products Grid Skeleton */}
          <div className="grow w-full">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 space-y-4">
                {/* Horizontal Menu Card Skeletons */}
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="flex gap-6 bg-white rounded-2xl p-5 hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    {/* Image Skeleton */}
                    <div className="relative w-[180px] h-[180px] rounded-xl overflow-hidden flex-shrink-0 bg-gray-200" />
                    
                    {/* Content Skeleton */}
                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-7 w-48 bg-gray-200 rounded-lg" />
                          <div className="h-5 w-24 bg-gray-200 rounded-lg" />
                        </div>
                        <div className="h-4 w-3/4 bg-gray-200 rounded-lg mb-2" />
                        <div className="h-4 w-1/2 bg-gray-200 rounded-lg" />
                      </div>

                      {/* Bottom Section */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div className="h-8 w-24 bg-gray-200 rounded-lg" />
                        <div className="h-10 w-32 bg-gray-200 rounded-lg" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart Summary Skeleton */}
          <div className="md:w-[650px] w-full sticky top-[90px]">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 space-y-4">
                <div className="h-8 w-48 bg-gray-200 rounded-lg" />
                <div className="p-3 bg-gray-50 rounded-lg space-y-2">
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                </div>
                <div className="flex gap-2">
                  <div className="h-12 flex-1 bg-gray-200 rounded-xl" />
                  <div className="h-12 flex-1 bg-gray-200 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopSkeleton;
