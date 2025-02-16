// order_spec.js
import { Order } from '../Order.js';

describe("Tests all stages of an order", function() {

  it("test welcoming", function() {
    const oOrder = new Order("999-999-9999");
    const aResults = oOrder.handleInput("hello");
    expect(aResults[0]).toBe("Welcome to Vanessa's Takeout Service!");
    expect(aResults[1]).toBe("What would you like to order from our menu? Pizza or Burger?");
  });

  it("test ordering food (Burger)", function() {
    const oOrder = new Order("999-999-9999");
    oOrder.handleInput("hello"); // Start conversation
    const aResults = oOrder.handleInput("I would like to order a Burger");
    expect(aResults[0]).toBe("You have ordered: Burger with size Medium");
    expect(aResults[1]).toBe("Toppings: Cheese, Lettuce, Tomato");
  });

  it("test ordering food (Pizza)", function() {
    const oOrder = new Order("999-999-9999");
    oOrder.handleInput("hello"); // Start conversation
    const aResults = oOrder.handleInput("I would like to order a Pizza");
    expect(aResults[0]).toBe("You have ordered: Pizza with size Large");
    expect(aResults[1]).toBe("Toppings: Pepperoni, Olives, Mushrooms");
  });

  it("test incorrect food order", function() {
    const oOrder = new Order("999-999-9999");
    oOrder.handleInput("hello"); // Start conversation
    const aResults = oOrder.handleInput("I would like to order a Pasta");
    expect(aResults[0]).toBe("Sorry, we don't have that on the menu. Please choose a Burger or Pizza.");
  });

  it("test upsell (yes)", function() {
    const oOrder = new Order("999-999-9999");
    oOrder.handleInput("hello"); // Start conversation
    oOrder.handleInput("I would like to order a Burger"); // Order burger
    const aResults = oOrder.handleInput("yes"); // Say yes to upsell
    expect(aResults[0]).toBe("Great! Would you like to add a Drink to your order? We have Iced Tea and Lemonade available.");
  });

  it("test upsell (no)", function() {
    const oOrder = new Order("999-999-9999");
    oOrder.handleInput("hello"); // Start conversation
    oOrder.handleInput("I would like to order a Burger"); // Order burger
    const aResults = oOrder.handleInput("no"); // Say no to upsell
    expect(aResults[0]).toBe("No worries! Your order is complete. Thanks for ordering.");
  });

  it("test complete order", function() {
    const oOrder = new Order("999-999-9999");
    oOrder.handleInput("hello"); // Start conversation
    oOrder.handleInput("I would like to order a Pizza"); // Order pizza
    oOrder.handleInput("no"); // Skip upsell
    const aResults = oOrder.handleInput("goodbye");
    expect(aResults[0]).toBe("No worries! Your order is complete. Thanks for ordering.");
  });
});
