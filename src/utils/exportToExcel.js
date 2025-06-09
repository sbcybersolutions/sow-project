import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export function exportQuoteToExcel(quote) {
  const { clientName, projectName, quoteDate, projects } = quote;

  const sheetData = [
    ['Client Name', clientName],
    ['Project Name', projectName],
    ['Quote Date', quoteDate],
    [],
    ['Project Type', 'Quantity', 'Billing Rate', 'Total', 'Details']
  ];

  projects.forEach((project) => {
    sheetData.push([
      project.type,
      project.quantity,
      `$${project.billingRate}`,
      `$${project.total.toFixed(2)}`,
      project.details || ''
    ]);

    if (project.breakdown && project.breakdown.length > 0) {
      sheetData.push(['', '', '', '', '']);
      sheetData.push(['  Role', 'Hours', 'Rate', 'Subtotal']);

      project.breakdown.forEach((item) => {
        sheetData.push([
          `  ${item.role}`,
          item.hours,
          `$${item.rate}`,
          `$${(item.hours * item.rate).toFixed(2)}`
        ]);
      });

      const totalInternal = project.breakdown.reduce(
        (sum, item) => sum + item.hours * item.rate,
        0
      );

      sheetData.push(['', '', '', `Internal Total: $${totalInternal.toFixed(2)}`]);
      sheetData.push([]);
    }
  });

  const grandTotal = projects.reduce((sum, p) => sum + p.total, 0);
  sheetData.push([]);
  sheetData.push(['', '', 'Grand Total', `$${grandTotal.toFixed(2)}`]);

  const ws = XLSX.utils.aoa_to_sheet(sheetData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Quote');

  const fileName = `${clientName.replace(/\s+/g, '_')}_${projectName.replace(/\s+/g, '_')}_Quote.xlsx`;

  const wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    type: 'array'
  });

  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), fileName);
}
