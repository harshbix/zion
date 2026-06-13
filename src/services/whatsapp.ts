// WhatsApp conversion system
export const WHATSAPP_NUMBER = '255789123456'; // Zion Cakes & Bites WhatsApp

export const WHATSAPP_URLS = {
  // Main WhatsApp link with prefilled message
  order: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hello, I want to place an order from Zion Cakes and Bites'
  )}`,

  // Product-specific orders
  orderProduct: (productName: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      `Hi! I'm interested in ordering ${productName} from Zion Cakes and Bites`
    )}`,

  // General inquiry
  inquiry: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hi! I have a question about Zion Cakes and Bites'
  )}`,

  // Custom order
  customOrder: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hello! I would like to inquire about a custom order from Zion Cakes and Bites'
  )}`,
};

// Direct WhatsApp phone for tel: links
export const WHATSAPP_TEL = `tel:+${WHATSAPP_NUMBER}`;
