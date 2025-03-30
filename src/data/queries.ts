export const predefinedQueries = [
  {
    id: 'select-all-users',
    name: 'Select All Users',
    query: 'SELECT * FROM users;'
  },
  {
    id: 'user-orders',
    name: 'User Orders (Amount > $100)',
    query: `SELECT 
  users.name,
  orders.order_date,
  orders.total_amount
FROM users
JOIN orders ON users.id = orders.user_id
WHERE orders.total_amount > 100
ORDER BY orders.order_date DESC;`
  },
  {
    id: 'product-inventory',
    name: 'Low Stock Products',
    query: `SELECT 
  products.name,
  products.price,
  inventory.quantity
FROM products
JOIN inventory ON products.id = inventory.product_id
WHERE inventory.quantity < 50;`
  },
  {
    id: 'user-order-stats',
    name: 'User Order Statistics',
    query: `SELECT 
  users.name,
  COUNT(orders.id) as total_orders,
  SUM(orders.total_amount) as total_spent,
  AVG(orders.total_amount) as avg_order_value
FROM users
LEFT JOIN orders ON users.id = orders.user_id
GROUP BY users.id, users.name
HAVING COUNT(orders.id) > 0
ORDER BY total_spent DESC;`
  },
  {
    id: 'product-sales',
    name: 'Top Selling Products',
    query: `SELECT 
  products.name,
  COUNT(order_items.id) as times_sold,
  SUM(order_items.quantity) as total_quantity,
  SUM(order_items.quantity * products.price) as total_revenue
FROM products
JOIN order_items ON products.id = order_items.product_id
GROUP BY products.id, products.name
ORDER BY total_revenue DESC
LIMIT 5;`
  },
  {
    id: 'recent-activity',
    name: 'Recent User Activity',
    query: `SELECT 
  users.name,
  orders.order_date,
  products.name as product_name,
  order_items.quantity,
  orders.total_amount
FROM users
JOIN orders ON users.id = orders.user_id
JOIN order_items ON orders.id = order_items.order_id
JOIN products ON order_items.product_id = products.id
WHERE orders.order_date >= DATE_SUB(NOW(), INTERVAL 7 DAY)
ORDER BY orders.order_date DESC;`
  }
];