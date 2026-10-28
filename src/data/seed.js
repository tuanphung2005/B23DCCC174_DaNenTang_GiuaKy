import {INVOICE_STATUS} from '../constants';
import {formatDateTime} from '../utils/format';

export const seedDishes = [
  {id: 'dish_nem_ran', name: 'Nem rán', category: 'Khai vị', price: 45000, available: true},
  {id: 'dish_goi_cuon', name: 'Gỏi cuốn', category: 'Khai vị', price: 35000, available: true},
  {id: 'dish_pho_bo', name: 'Phở bò', category: 'Món chính', price: 65000, available: true},
  {
    id: 'dish_com_rang',
    name: 'Cơm rang hải sản',
    category: 'Món chính',
    price: 75000,
    available: true,
  },
  {id: 'dish_bun_cha', name: 'Bún chả', category: 'Món chính', price: 55000, available: true},
  {
    id: 'dish_che_ba_mau',
    name: 'Chè ba màu',
    category: 'Tráng miệng',
    price: 25000,
    available: true,
  },
  {id: 'dish_banh_flan', name: 'Bánh flan', category: 'Tráng miệng', price: 20000, available: true},
  {id: 'dish_tra_dao', name: 'Trà đào', category: 'Đồ uống', price: 30000, available: true},
  {id: 'dish_ca_phe', name: 'Cà phê sữa', category: 'Đồ uống', price: 25000, available: true},
];

export const createSeedInvoices = () => [
  {
    id: 'invoice_seed_1',
    tableNumber: 3,
    items: [
      {dishId: 'dish_pho_bo', quantity: 2},
      {dishId: 'dish_tra_dao', quantity: 2},
    ],
    status: INVOICE_STATUS.SERVING,
    createdAt: formatDateTime(new Date()),
  },
];
