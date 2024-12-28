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
    guests?: number;
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

    // Set global text color
    doc.setTextColor(33, 37, 41);

    try {
        const base64Logo = await loadImageAsBase64('/logos/logo.png');
        doc.addImage(base64Logo, 'PNG', 15, 10, 20, 10);
    } catch (error) {
        console.error('Error adding logo to PDF:', error);
    }

    // Header
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Hardal Restaurant', 40, 15);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Catering-Auftrag', 40, 20);

    // Order Number & Date
    doc.setFontSize(10);
    doc.text(`Bestellnummer: ${orderNumber}`, 15, 30);
    doc.text(`Datum: ${new Date().toLocaleDateString('de-DE')}`, 15, 35);

    // Customer Information
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Kundeninformationen', 20, 46);
    doc.setFont('helvetica', 'normal');
    doc.text(
        [
            `${customerInfo.firstName} ${customerInfo.lastName}`,
            customerInfo.address,
            `${customerInfo.postalCode} ${customerInfo.city}`,
            `Tel: ${customerInfo.phone}`,
            `Email: ${customerInfo.email}`,
        ],
        20,
        52,
        { lineHeightFactor: 1.2 }
    );

    // Order Details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Bestelldetails', 15, 80);

    const tableData: RowInput[] = [];
    let calculatedTotal = 0;

    // Process each package
    if (Array.isArray(orderData.packages)) {
        orderData.packages.forEach((pkg, index) => {
            const basePackagePrice = pkg.price * (pkg.guests || 1);
            let extrasTotal = 0;

            // Add package header
            tableData.push([
                {
                    content: `${pkg.package}${pkg.guests ? ` (${pkg.guests} Gäste)` : ''}`,
                    colSpan: 2,
                    styles: {
                        fontStyle: 'bold',
                        fillColor: [240, 240, 240],
                        textColor: [33, 37, 41],
                        fontSize: 11
                    },
                },
                {
                    content: `${pkg.price}€`,
                    styles: {
                        fontStyle: 'bold',
                        fillColor: [240, 240, 240],
                        textColor: [33, 37, 41],
                        halign: 'right',
                        fontSize: 11
                    },
                },
            ]);

            const isMenuPackage = orderData.menu?.name === pkg.package;

            if (isMenuPackage && orderData.menu) {
                orderData.menu.contents.forEach(category => {
                    category.ids.forEach(categoryId => {
                        const categoryProducts = pkg.products[categoryId];
                        if (Array.isArray(categoryProducts)) {
                            categoryProducts.forEach(product => {
                                if (Number(product.quantity) === 10 && product.price > 0) {
                                    extrasTotal += product.total;
                                }
                                const price = product.total > 0 ? `${product.total}€` : `${product.price}€`;
                                tableData.push([product.name, product.quantity, price]);
                            });
                        }
                    });
                });
            } else {
                if (pkg.products) {
                    Object.entries(pkg.products).forEach(([_, products]) => {
                        if (Array.isArray(products)) {
                            products.forEach((product) => {
                                if (Number(product.quantity) === 10 && product.price > 0) {
                                    extrasTotal += product.total;
                                }
                                const price = product.total > 0 ? `${product.total}€` : `${product.price}€`;
                                tableData.push([product.name, product.quantity, price]);
                            });
                        }
                    });
                }
            }

            const packageTotal = basePackagePrice + extrasTotal;
            calculatedTotal += packageTotal;
            tableData.push([
                {
                    content: `Zwischensumme`,
                    colSpan: 2,
                    styles: {
                        fontStyle: 'bold',
                        fillColor: [245, 245, 245],
                        fontSize: 10
                    },
                },
                {
                    content: `${packageTotal.toFixed(2)}€`,
                    styles: {
                        fontStyle: 'bold',
                        fillColor: [245, 245, 245],
                        halign: 'right',
                        fontSize: 10
                    },
                },
            ]);

            // Add a smaller spacer row between packages
            if (index < orderData.packages.length - 1) {
                tableData.push([{ content: '', colSpan: 3, styles: { minCellHeight: 3 } }]);
            }
        });
    }

    // Add table with improved styling
    autoTable(doc, {
        startY: 85,
        head: [['Artikel', 'Menge', 'Preis']],
        body: tableData,
        theme: 'plain',
        styles: {
            fontSize: 9,
            cellPadding: { top: 2, right: 3, bottom: 2, left: 3 },
            overflow: 'linebreak',
            cellWidth: 'wrap',
            valign: 'middle',
            lineColor: [220, 220, 220],
            lineWidth: 0.1,
        },
        headStyles: {
            fillColor: [252, 200, 26],
            textColor: [33, 37, 41],
            fontStyle: 'bold',
            fontSize: 10,
            cellPadding: { top: 3, right: 3, bottom: 3, left: 3 },
        },
        columnStyles: {
            0: { cellWidth: 'auto' },
            1: { cellWidth: 20, halign: 'center' },
            2: { cellWidth: 30, halign: 'right' },
        },
        margin: { top: 85, bottom: 25 },
        didParseCell: function (data) {
            const row = data.row.raw as Array<{ content?: string }>;
            if (Array.isArray(row) && row[0] && typeof row[0] === 'object') {
                const isPackageHeader = data.row.index === 0 ||
                    (data.row.index > 0 &&
                        row[0].content &&
                        row[0].content.includes('Menü'));

                if (isPackageHeader) {
                    data.cell.styles.fillColor = [240, 240, 240];
                    data.cell.styles.textColor = [33, 37, 41];
                    data.cell.styles.fontSize = 11;
                    data.cell.styles.fontStyle = 'bold';
                }
            }
        },
    });

    // Total
    const finalY = (doc as any).lastAutoTable.finalY + 5;
    doc.setFillColor(240, 240, 240);
    doc.rect(15, finalY, 180, 8, 'F');
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`Gesamtbetrag: ${calculatedTotal.toFixed(2)}€`, 20, finalY + 5.5);

    // Footer
    const footerY = doc.internal.pageSize.height - 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Hardal Restaurant | Möllner Landstraße 3, 22111 Hamburg | Tel: +49 408 470 82 | Email: info@hardal-restaurant.de', doc.internal.pageSize.width / 2, footerY, { align: 'center' });

    return doc;
};

