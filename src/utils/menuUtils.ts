export const getPackageMenuId = (packageName: string): number | undefined => {
    const packageMap: { [key: string]: number } = {
        "Classic Menü": 1,
        "Signature Menü": 2,
        "Exclusive Menü": 3,
        "Fingerfood Menü": 4,
        "BBQ Menü": 5,
        "Fisch Menü": 6,
    };
    return packageMap[packageName];
}; 