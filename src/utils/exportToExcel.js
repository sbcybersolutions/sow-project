import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export function exportQuoteToExcel(quote) {
  const { clientName, projectName, quoteDate, projects } = quote;

  const data = [
    ['Client Name', clientName],
    ['Project Name', projectName],
    ['Quote Date', quoteDate],
    [],
    ['Project Type', 'Quantity', 'Billing Rate', 'Total', 'Details']
  ];

  projects.forEach((item) => {
    data.push([
      item.type,
      item.quantity,
      `$${item.billingRate}`,
      `$${item.total.toFixed(2)}`,
      item.details || ''
    ]);
  });

  const grandTotal = projects.reduce((sum, p) => sum + p.total, 0);
  data.push([]);
  data.push(['', '', 'Grand Total', `$${grandTotal.toFixed(2)}`]);

  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Quote');

  const fileName = `${clientName.replace(/\s+/g, '_')}_${projectName.replace(/\s+/g, '_')}_Quote.xlsx`;

  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), fileName);
}
