const STORAGE_KEY = 'packageGuestCounts';

export const storePackageGuestCount = (packageId: string | number, guestCount: number) => {
    try {
        const currentCounts = getStoredGuestCounts();
        const updatedCounts = {
            ...currentCounts,
            [packageId]: guestCount
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCounts));
    } catch (error) {
        console.error('Error storing guest count:', error);
    }
};

export const getPackageGuestCount = (packageId: string | number): number | null => {
    try {
        const counts = getStoredGuestCounts();
        return counts[packageId] || null;
    } catch (error) {
        console.error('Error getting guest count:', error);
        return null;
    }
};

export const getStoredGuestCounts = (): Record<string, number> => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch (error) {
        console.error('Error getting stored guest counts:', error);
        return {};
    }
};

export const clearPackageGuestCount = (packageId: string | number) => {
    try {
        const counts = getStoredGuestCounts();
        delete counts[packageId];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(counts));
    } catch (error) {
        console.error('Error clearing guest count:', error);
    }
};

export const clearAllGuestCounts = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing all guest counts:', error);
    }
}; 