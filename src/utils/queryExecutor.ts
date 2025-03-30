// Mock data for simulating query results
const mockData = {
  users: [
    { id: 1, name: 'John Doe', email: 'john@example.com', created_at: '2023-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', created_at: '2023-02-20' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', created_at: '2023-03-10' },
  ],
  orders: [
    { id: 1, user_id: 1, order_date: '2023-04-15', total_amount: 150.00 },
    { id: 2, user_id: 2, order_date: '2023-04-16', total_amount: 75.50 },
    { id: 3, user_id: 1, order_date: '2023-04-17', total_amount: 200.00 },
  ],
  products: [
    { id: 1, name: 'Laptop', price: 999.99 },
    { id: 2, name: 'Mouse', price: 29.99 },
    { id: 3, name: 'Keyboard', price: 59.99 },
  ],
  inventory: [
    { product_id: 1, quantity: 45 },
    { product_id: 2, quantity: 100 },
    { product_id: 3, quantity: 30 },
  ],
};

export const executeQuery = (query: string): any[] => {
  // This is a very simple query executor that returns mock data based on the query
  // In a real application, this would connect to a database
  
  if (query.toLowerCase().includes('from users')) {
    return mockData.users;
  }
  
  if (query.toLowerCase().includes('from orders')) {
    // Simulate a JOIN with users
    return mockData.orders.map(order => ({
      name: mockData.users.find(u => u.id === order.user_id)?.name,
      order_date: order.order_date,
      total_amount: order.total_amount,
    }));
  }
  
  if (query.toLowerCase().includes('from products')) {
    // Simulate a JOIN with inventory and apply WHERE clause
    const results = mockData.products.map(product => {
      const inventoryItem = mockData.inventory.find(i => i.product_id === product.id);
      return {
        name: product.name,
        price: product.price,
        quantity: inventoryItem?.quantity || 0,
      };
    });

    // If query includes WHERE inventory.quantity < 50, filter the results
    if (query.toLowerCase().includes('where inventory.quantity < 50')) {
      return results.filter(item => item.quantity < 50);
    }

    return results;
  }
  
  return [];
};