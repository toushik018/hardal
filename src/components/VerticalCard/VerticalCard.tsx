"use client";

import Image from "next/image";
import { Package } from "@/types/package";
import { useGetMenuContentQuery } from "@/services/api";

interface MenuContent {
  name: string;
  ids: number[];
  count: number;
}

interface VerticalCardProps {
  packageData: Package;
  onSelect?: (packageData: Package) => void;
}

// Skeleton component
const SkeletonCard = () => (
  <div className="animate-pulse bg-white rounded-2xl h-[500px] overflow-hidden">
    {/* Image Skeleton */}
    <div className="h-48 bg-gray-200" />

    {/* Content Skeleton */}
    <div className="p-6">
      {/* Package Contents Skeleton */}
      <div className="mb-6">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
        <div className="space-y-2">
          {[1, 2, 3].map((index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="h-4 bg-gray-200 rounded w-24" />
              <div className="h-4 bg-gray-200 rounded w-8" />
            </div>
          ))}
        </div>
      </div>

      {/* Price Info Skeleton */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
          <div className="h-4 bg-gray-200 rounded w-20" />
          <div className="h-6 bg-gray-200 rounded w-16" />
        </div>
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-5 bg-gray-200 rounded w-20" />
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="h-12 bg-gray-200 rounded-xl" />
    </div>
  </div>
);

const getImageSrc = (id: number) => {
  return `/images/package${id}.jpg`;
};

const VerticalCard = ({ packageData, onSelect }: VerticalCardProps) => {
  const { data: menuContentData, isLoading } = useGetMenuContentQuery(
    packageData.id
  );
  const menuContents = menuContentData?.contents || [];

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSelect) {
      onSelect(packageData);
    }
  };

  if (isLoading) {
    return <SkeletonCard />;
  }

  return (
    <div
      className="group h-full bg-white rounded-2xl transition-all duration-300 
                    hover:shadow-xl border border-gray-100 overflow-hidden relative"
    >
      {/* Card Header */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={getImageSrc(packageData.id)}
          alt={packageData.name}
          width={800}
          height={400}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <h3 className="text-2xl font-bold text-white mb-1">
            {packageData.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm">
              Menü
            </span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Menu Contents */}
        {menuContents.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-500 mb-3">
              Paket Übersicht
            </h4>
            <div className="space-y-2">
              {menuContents.map((content: MenuContent, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-600">{content.count} {content.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Price Info */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
            <span className="text-gray-600">Pro Person</span>
            <div className="flex items-baseline gap-1">
              <span className="text-sm text-gray-400">ab</span>
              <span className="text-2xl font-bold text-first">
                {packageData.price}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600">Mindestanzahl</span>
            <div className="flex items-baseline gap-1">
              <span className="text-sm text-gray-400">ab</span>
              <span className="text-lg font-semibold text-gray-900">
                {packageData.minimumClients}
                <span className="text-gray-400 text-base ml-1">Personen</span>
              </span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleButtonClick}
          className="w-full bg-first/10 text-first font-medium py-3 rounded-xl
                     transition-all duration-200 
                     hover:bg-first hover:text-white
                     active:transform active:scale-[0.98]
                     flex items-center justify-center gap-2
                     relative z-10"
        >
          Speisen auswählen
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Overlay for card hover effect */}
      <div className="absolute inset-0 pointer-events-none bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default VerticalCard;
