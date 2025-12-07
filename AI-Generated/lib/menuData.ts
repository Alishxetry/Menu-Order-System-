export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export interface MenuCategory {
  [key: string]: MenuItem[];
}

export const menuData: MenuCategory = {
  "Beverages": [
    { id: 1, name: "Cappuccino", description: "Rich espresso with steamed milk foam", price: 3.5 },
    { id: 2, name: "Americano", description: "Espresso with hot water", price: 2.75 },
    { id: 3, name: "Iced Latte", description: "Chilled espresso with milk and ice", price: 4.0 },
    { id: 4, name: "Mocha", description: "Espresso with chocolate and steamed milk", price: 4.25 },
    { id: 5, name: "Green Tea", description: "Premium organic green tea", price: 2.5 },
    { id: 6, name: "Fresh Orange Juice", description: "Freshly squeezed oranges", price: 3.75 },
  ],
  "Snacks": [
    { id: 11, name: "Garlic Bread", description: "Toasted bread with garlic butter", price: 2.5 },
    { id: 12, name: "Veg Sandwich", description: "Fresh veggies with pesto", price: 5.0 },
    { id: 13, name: "Club Sandwich", description: "Triple-decker with chicken and bacon", price: 7.5 },
    { id: 14, name: "Nachos Supreme", description: "Crispy nachos with cheese and salsa", price: 6.0 },
  ],
  "Main Course": [
    { id: 31, name: "Pasta Alfredo", description: "Creamy fettuccine with parmesan", price: 12.0 },
    { id: 32, name: "Grilled Chicken", description: "Herb-marinated chicken with sides", price: 14.0 },
    { id: 33, name: "Veggie Buddha Bowl", description: "Quinoa, roasted veggies, tahini", price: 11.0 },
  ],
  "Desserts": [
    { id: 21, name: "Chocolate Brownie", description: "Warm brownie with ice-cream", price: 3.75 },
    { id: 22, name: "Cheesecake", description: "Classic creamy slice", price: 4.25 },
    { id: 23, name: "Tiramisu", description: "Italian coffee-flavored dessert", price: 5.0 },
    { id: 24, name: "Apple Pie", description: "Warm apple pie with cinnamon", price: 4.0 },
  ],
};

export const mockUsers = {
  waiters: [
    { name: 'Asha', uid: '1001234567', password: 'waiter123' },
    { name: 'Ram', uid: '1009876543', password: 'waiter123' },
  ],
  owners: [
    { name: 'Prashant', uid: '2000000001', password: 'owner123' },
  ],
  riders: [
    { name: 'Kiran', uid: '3001234567', password: 'rider123' },
    { name: 'Sunil', uid: '3009876543', password: 'rider123' },
  ],
};

export interface Order {
  id: number;
  date: string;
  tableNo?: string;
  address?: string;
  items: string;
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivering' | 'completed';
  waiter?: string;
  rider?: string;
  isDelivery: boolean;
  customerName?: string;
  customerPhone?: string;
}

export const initialOrders: Order[] = [
  { id: 501, date: '2025-12-07', tableNo: 'T3', items: 'Cappuccino x1, Brownie x1', total: 7.25, status: 'pending', waiter: 'Asha', isDelivery: false },
  { id: 502, date: '2025-12-06', tableNo: 'T1', items: 'Veg Sandwich x2', total: 10.00, status: 'completed', waiter: 'Ram', isDelivery: false },
  { id: 503, date: '2025-12-07', address: '123 Main St, Birtamode', items: 'Pasta Alfredo x1, Iced Latte x2', total: 20.00, status: 'delivering', rider: 'Kiran', isDelivery: true, customerName: 'John Doe', customerPhone: '+977-9812345678' },
  { id: 504, date: '2025-12-07', address: '456 Park Ave', items: 'Grilled Chicken x1, Mocha x1', total: 18.25, status: 'ready', isDelivery: true, customerName: 'Jane Smith', customerPhone: '+977-9898765432' },
];
