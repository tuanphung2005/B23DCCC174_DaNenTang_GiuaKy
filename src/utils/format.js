const pad = value => String(value).padStart(2, '0');

export const formatPrice = value => {
  const number = Number(value) || 0;
  return `${String(number).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ`;
};

export const formatNumber = value => {
  const number = Number(value) || 0;
  return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const formatDateTime = date => {
  const d = date instanceof Date ? date : new Date(date);
  return `${pad(d.getHours())}:${pad(d.getMinutes())} ${pad(
    d.getDate(),
  )}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

export const onlyDigits = text => String(text).replace(/[^0-9]/g, '');
