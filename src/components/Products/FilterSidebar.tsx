import { Filters } from "@/types/product";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/AccordionItem";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";

interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (category: keyof Filters, value: string[]) => void;
  isFilterOpen: boolean;
}

const categories = [
  "All",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Desserts",
  "Drinks",
];
const allergens = ["Gluten", "Lactose", "Nuts", "Eggs", "Soy"];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  isFilterOpen,
}) => {
  return (
    <aside
      className={`w-full md:w-1/4 bg-white p-6 rounded-lg transition-all duration-300 ease-in-out ${
        isFilterOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Filters</h2>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger className="text-lg font-semibold text-gray-700 group">
            Categories
            <ChevronDown className="h-5 w-5 shrink-0 text-gray-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </AccordionTrigger>
          <AccordionContent className="transition-all duration-200 ease-in-out">
            <div className="space-y-2 mt-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories?.includes(category)}
                    onCheckedChange={(checked: boolean) => {
                      if (checked) {
                        onFilterChange("categories", [
                          ...(filters.categories || []),
                          category,
                        ]);
                      } else {
                        onFilterChange(
                          "categories",
                          filters.categories?.filter((c) => c !== category) ||
                            []
                        );
                      }
                    }}
                  />
                  <Label
                    htmlFor={`category-${category}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="allergens">
          <AccordionTrigger className="text-lg font-semibold text-gray-700 group">
            Allergen-Free
            <ChevronDown className="h-5 w-5 shrink-0 text-gray-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </AccordionTrigger>
          <AccordionContent className="transition-all duration-200 ease-in-out">
            <div className="space-y-2 mt-2">
              {allergens.map((allergen) => (
                <div key={allergen} className="flex items-center space-x-2">
                  <Checkbox
                    id={`allergen-${allergen}`}
                    checked={filters.allergens?.includes(allergen)}
                    onCheckedChange={(checked: boolean) => {
                      if (checked) {
                        onFilterChange("allergens", [
                          ...(filters.allergens || []),
                          allergen,
                        ]);
                      } else {
                        onFilterChange(
                          "allergens",
                          filters.allergens?.filter((a) => a !== allergen) || []
                        );
                      }
                    }}
                  />
                  <Label
                    htmlFor={`allergen-${allergen}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {allergen}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};
