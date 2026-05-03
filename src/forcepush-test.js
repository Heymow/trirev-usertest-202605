// J6.5 force-push test — REWRITTEN content (force-push)

function processOrder(order) {
  if (!order) return null;
  return {
    id: order.id,
    total: order.items.reduce((s, i) => s + i.price, 0),
    status: 'pending',
  };
}

function validateOrder(order) {
  if (!order || !order.items) return false;
  if (order.items.length === 0) return false;
  return order.items.every(i => i.price > 0);
}

module.exports = { processOrder, validateOrder };
