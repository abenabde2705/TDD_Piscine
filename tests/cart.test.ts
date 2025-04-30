import { describe, expect, it, beforeEach } from "vitest";
import { addProduct, Product, getCart, removeProduct, clearCart, getProductCount, getTotal, applyDiscount } from '../src/cart';

describe("cart module", () => {
  beforeEach(() => {
    clearCart();
  });
  
  it("should add a product to the cart", () => {
    const Product1: Product={
      id:"21",
      name:"asba",
      price:20,
      quantity:1
    };
    const cartbeforeadd = getCart();
    expect(cartbeforeadd.length).toBe(0);
    addProduct(Product1);
    const cartafteradd = getCart();
    // écrire le test ici
    expect(cartafteradd.length).toBe(1);
  });
  it("should remove a product from the cart",()=>{
    const Product1: Product={
      id:"21",
      name:"asba",
      price:20,
      quantity:1
    };
    const cartbeforeremove = getCart();
    addProduct(Product1)
    removeProduct("21")
    const cartafterremove = getCart();


    expect(cartafterremove.length).toBe(0);
  });
  it("should retirieve product count",()=>{
    const cartbeforeadd = getCart();

    const Product1: Product={
      id:"21",
      name:"asba",
      price:20,
      quantity:1
    };
    const Product2: Product={
      id:"11",
      name:"qsd",
      price:10,
      quantity:4
    };
    addProduct(Product1);
    addProduct(Product2)
    const cartafteradd = getCart();

    expect(getProductCount()).toBe(5);
  });
  it("should retrieve the total of products",()=>{
  const product1: Product = {
    id: "21",
    name: "asba",
    price: 20,
    quantity: 1
  };
  const product2: Product = {
    id: "11",
    name: "qsd",
    price: 10,
    quantity: 4
  };
  
  addProduct(product1);
  addProduct(product2);
  const total = getTotal();
    expect(total).toBe(60);  });
  it("should apply discount on cart",()=>{
    const product1: Product = {
      id: "21",
      name: "asba",
      price: 20,
      quantity: 1
    };
    const product2: Product = {
      id: "11",
      name: "qsd",
      price: 10,
      quantity: 4
    };
    
    addProduct(product1);
    addProduct(product2);
    const totalBeforeDiscount = getTotal();
    applyDiscount("WELCOME10"); 
    const totalAfterDiscount = getTotal();
    
  });
});

