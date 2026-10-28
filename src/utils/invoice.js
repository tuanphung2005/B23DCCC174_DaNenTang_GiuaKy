import {VAT_RATE} from '../constants';

export const getInvoiceLines = (invoice, dishes) => {
  if (!invoice) {
    return [];
  }
  return invoice.items.map(item => {
    const dish = dishes.find(d => d.id === item.dishId);
    const unitPrice = dish?.price ?? 0;
    return {
      id: item.dishId,
      name: dish?.name ?? 'Món không tồn tại',
      quantity: item.quantity,
      unitPrice,
      lineTotal: unitPrice * item.quantity,
    };
  });
};

export const getTotals = lines => {
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const vat = Math.round(subtotal * VAT_RATE);
  return {subtotal, vat, total: subtotal + vat};
};
