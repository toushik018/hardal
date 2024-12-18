import { jsPDF } from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { CheckoutFormData } from '@/components/Checkout/CheckoutForm';
import loadImageAsBase64 from '@/utils/loadImageInPdf';

interface Product {
    name: string;
    quantity: string;
    price: number;
    total: number;
}

interface Package {
    package: string;
    price: number;
    products: {
        [key: string]: Array<{
            name: string;
            quantity: string;
            price: number;
            total: number;
        }>;
    };
}

interface MenuContent {
    name: string;
    ids: number[];
    count: number;
}

interface Menu {
    name: string;
    id: number;
    price: number;
    contents: MenuContent[];
}

interface GeneratePDFProps {
    orderData: {
        packages: Package[];
        totalPrice: string;
        menu?: Menu;
    };
    customerInfo: CheckoutFormData;
    orderNumber: string;
}

export const generateOrderPDF = async ({
    orderData,
    customerInfo,
    orderNumber,
}: GeneratePDFProps) => {
    const doc = new jsPDF();

    // Add Logo
    try {
        const base64Logo = await loadImageAsBase64('/logos/logo.png');
        doc.addImage(base64Logo, 'PNG', 15, 10, 30, 15);
    } catch (error) {
        console.error('Error adding logo to PDF:', error);
    }

    // Header
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Hardal Restaurant', 50, 20);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Bestellbestätigung', 50, 27);

    // Order Number & Date
    doc.setFontSize(11);
    doc.text(`Bestellnummer: ${orderNumber}`, 15, 50);
    doc.text(`Datum: ${new Date().toLocaleDateString('de-DE')}`, 15, 57);

    // Customer Information
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Kundeninformationen', 15, 70);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(
        [
            `${customerInfo.firstName} ${customerInfo.lastName}`,
            customerInfo.address,
            `${customerInfo.postalCode} ${customerInfo.city}`,
            `Tel: ${customerInfo.phone}`,
            `Email: ${customerInfo.email}`,
        ],
        15,
        78
    );

    // Order Details
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Bestelldetails', 15, 105);

    const tableData: RowInput[] = [];

    // Process each package
    if (Array.isArray(orderData.packages)) {
        orderData.packages.forEach((pkg) => {
            // Add package header
            tableData.push([
                {
                    content: `${pkg.package} (${pkg.price}€)`,
                    colSpan: 3,
                    styles: { fontStyle: 'bold', fillColor: [252, 200, 26] },
                },
            ]);

            // If menu is available and matches current package, organize by menu categories
            const isMenuPackage = orderData.menu?.name === pkg.package;

            if (isMenuPackage && orderData.menu) {
                // Process products according to menu categories
                orderData.menu.contents.forEach(category => {
                    // Add category header
                    tableData.push([
                        {
                            content: category.name,
                            colSpan: 3,
                            styles: { fontStyle: 'bold', fillColor: [245, 245, 245] },
                        },
                    ]);

                    // Add products for this category
                    category.ids.forEach(categoryId => {
                        const categoryProducts = pkg.products[categoryId];
                        if (Array.isArray(categoryProducts)) {
                            categoryProducts.forEach(product => {
                                const price = product.total > 0 ? `${product.total}€` : `${product.price}€`;
                                tableData.push([
                                    product.name,
                                    product.quantity,
                                    price
                                ]);
                            });
                        }
                    });
                });
            } else {
                // Process products without menu categories
                if (pkg.products) {
                    Object.entries(pkg.products).forEach(([_, products]) => {
                        if (Array.isArray(products)) {
                            products.forEach((product) => {
                                const price = product.total > 0 ? `${product.total}€` : `${product.price}€`;
                                tableData.push([
                                    product.name,
                                    product.quantity,
                                    price
                                ]);
                            });
                        }
                    });
                }
            }

            // Add a spacer row between packages
            tableData.push([
                { content: '', colSpan: 3, styles: { minCellHeight: 10 } },
            ]);
        });
    }

    // Add table
    autoTable(doc, {
        startY: 115,
        head: [['Artikel', 'Menge', 'Preis']],
        body: tableData,
        theme: 'striped',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [252, 200, 26] },
        columnStyles: {
            0: { cellWidth: 'auto' },
            1: { cellWidth: 30, halign: 'center' },
            2: { cellWidth: 40, halign: 'right' },
        },
        margin: { bottom: 60 },
    });

    // Total
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Gesamtbetrag: ${orderData.totalPrice}`, 15, finalY);

    // Footer
    const footerY = doc.internal.pageSize.height - 30;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Hardal Restaurant', 15, footerY);
    doc.text('Möllner Landstraße 3, 22111 Hamburg', 15, footerY + 5);
    doc.text('Tel: +49 408 470 82 | Email: info@hardal-restaurant.de', 15, footerY + 10);

    return doc;
};
