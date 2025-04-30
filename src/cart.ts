import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string().min(1, "L'ID du produit ne peut pas être vide"),
  name: z.string().min(1, "Le nom du produit ne peut pas être vide"),
  price: z.number().positive("Le prix doit être positif"),
  quantity: z.number().int().positive("La quantité doit être un entier positif")
});

export type Product = z.infer<typeof ProductSchema>;
let cart: Product[]= [];
export function clearCart(): void {
  cart = [];
}
// TODO: implémenter le module cart ici
export  function addProduct(product: Product): void{
  try {
    const validatedProduct = ProductSchema.parse(product);
    cart.push(validatedProduct);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Validation du produit échouée: ${error.errors.map(e => e.message).join(", ")}`);
    }
    throw error;
  }
}
export   function removeProduct(productId: string): void{
  cart = cart.filter(product => product.id !== productId);
}
export function getProductCount(): number{
  return cart.reduce((total, product) => total + product.quantity, 0);
}
export function getTotal():number {
  return cart.reduce((total,product)=> total + product.price*product.quantity,0)
}
export function applyDiscount(code: string): void{
  const discounts: { [code: string]: number } = {
    "WELCOME10": 0.10, 
    "SUMMER20": 0.20, 
    "FLASH50": 0.50    
  };
  if (!discounts[code]) {
    throw new Error(`Code de réduction invalide: ${code}`);
  }

  const discountRate = discounts[code];
  cart = cart.map(product => {
    return {
      ...product,
      price: Number((product.price * (1 - discountRate)).toFixed(2))
    };
  });


}

export function getCart(): Product[] {
  return [...cart]; 
}


