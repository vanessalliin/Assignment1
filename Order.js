// Order.js
export class Order {
  constructor(sFrom) {
    this.OrderState = {
      WELCOMING: () => {
        let aReturn = [];
        this.stateCur = this.OrderState.ORDERING_FOOD;
        aReturn.push("Welcome to Vanessa's Takeout Service!");
        aReturn.push("What would you like to order from our menu? Pizza or Burger?");
        return aReturn;
      },

      ORDERING_FOOD: (sInput) => {
        let aReturn = [];
        const menu = [
          { name: "Burger", size: "Medium", toppings: ["Cheese", "Lettuce", "Tomato"] },
          { name: "Pizza", size: "Large", toppings: ["Pepperoni", "Olives", "Mushrooms"] }
        ];

        // Match user input to food items
        const item = menu.find(m => sInput.toLowerCase().includes(m.name.toLowerCase()));

        if (item) {
          aReturn.push(`You have ordered: ${item.name} with size ${item.size}`);
          aReturn.push(`Toppings: ${item.toppings.join(", ")}`);
          this.stateCur = this.OrderState.SELECTING_UPSELL;
        } else {
          aReturn.push("Sorry, we don't have that on the menu. Please choose a Burger or Pizza.");
        }

        return aReturn;
      },

      SELECTING_UPSELL: (sInput) => {
        let aReturn = [];
        if (sInput.toLowerCase().includes("yes")) {
          aReturn.push("Great! Would you like to add a Drink to your order? We have Iced Tea and Lemonade available.");
          this.stateCur = this.OrderState.ADDING_DRINK;
        } else {
          aReturn.push("No worries! Your order is complete. Thanks for ordering.");
          this.isDone = true;  // Mark the order as done
        }
        return aReturn;
      },

      ADDING_DRINK: (sInput) => {
        let aReturn = [];
        if (sInput.toLowerCase().includes("yes")) {
          aReturn.push("You have added a Drink to your order.");
        }
        aReturn.push("Thanks for your order! We'll send a confirmation soon.");
        this.isDone = true; // Mark the order as done
        return aReturn;
      },
    };

    this.stateCur = this.OrderState.WELCOMING;
    this.isDone = false;
    this.sFrom = sFrom;
  }

  handleInput(sInput) {
    return this.stateCur(sInput);
  }

  isDone() {
    return this.isDone;
  }
}
