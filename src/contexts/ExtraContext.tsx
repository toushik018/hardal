import { createContext, useContext, useState, ReactNode } from "react";
import { useAddExtraMutation } from "@/services/api";
import { toast } from "sonner";

interface ExtraContextType {
  handleAddExtra: (productId: string) => Promise<void>;
  isAddingExtra: boolean;
}

const ExtraContext = createContext<ExtraContextType | undefined>(undefined);

export function ExtraProvider({ children }: { children: ReactNode }) {
  const [addExtra] = useAddExtraMutation();
  const [isAddingExtra, setIsAddingExtra] = useState(false);

  const handleAddExtra = async (productId: string) => {
    if (!productId) {
      toast.error("Produkt ID fehlt");
      return;
    }

    setIsAddingExtra(true);
    try {
      const response = await addExtra({
        product_id: productId,
      }).unwrap();
      console.log(response.success);
      if (response.success) {
        toast.success("Extra erfolgreich hinzugefügt");
      }
    } catch (error: any) {
      console.error("Error adding extra:", error);
      toast.error(error.data?.error || "Fehler beim Hinzufügen des Extras");
    } finally {
      setIsAddingExtra(false);
    }
  };

  return (
    <ExtraContext.Provider value={{ handleAddExtra, isAddingExtra }}>
      {children}
    </ExtraContext.Provider>
  );
}

export const useExtra = () => {
  const context = useContext(ExtraContext);
  if (context === undefined) {
    throw new Error("useExtra must be used within an ExtraProvider");
  }
  return context;
};
