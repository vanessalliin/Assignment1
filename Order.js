// Order.js
export class Order {
  constructor(sFrom) {
    this.OrderState = {
      WELCOMING: () => {
        let aReturn = [];
        this.stateCur = this.OrderState.ORDERING_FOOD;
        aReturn.push("Welcome to Vanessa's Italian Takeout Food Service!");
        aReturn.push("What would you like to order? We have Pizza and Pasta.");
        return aReturn;
      },

      ORDERING_FOOD: (sInput) => {
        let aReturn = [];
        if (sInput.toLowerCase().includes("pizza")) {
          this.orderItem = "Pizza";
          this.stateCur = this.OrderState.PICK_SIZE;
          aReturn.push("What size would you like for your pizza? Small, Medium, or Large?");
        } else if (sInput.toLowerCase().includes("pasta")) {
          this.orderItem = "Pasta";
          this.stateCur = this.OrderState.PICK_SIZE;
          aReturn.push("What size would you like for your pasta? Small, Medium, or Large?");
        } else {
          aReturn.push("Sorry, we only have Pizza and Pasta. What would you like?");
        }
        return aReturn;
      },

      PICK_SIZE: (sInput) => {
        let aReturn = [];
        this.orderSize = sInput;
        if (this.orderItem === "Pizza") {
          this.stateCur = this.OrderState.PICK_TOPPINGS;
          aReturn.push("What toppings would you like on your pizza? (e.g., Pepperoni, Mushrooms, Olives)");
        } else {
          this.stateCur = this.OrderState.PICK_CHEESE;
          aReturn.push("What type of cheese would you like on your pasta? (e.g., Parmesan, Mozzarella, Cheddar)");
        }
        return aReturn;
      },

      PICK_TOPPINGS: (sInput) => {
        let aReturn = [];
        this.pizzaToppings = sInput;
        this.stateCur = this.OrderState.SELECTING_UPSELL;
        aReturn.push("Would you like to add a drink to your order? We have Pepsi and Lemonade.");
        return aReturn;
      },

      PICK_CHEESE: (sInput) => {
        let aReturn = [];
        this.pastaCheese = sInput;
        this.stateCur = this.OrderState.SELECTING_UPSELL;
        aReturn.push("Would you like to add a drink to your order? We have Pepsi and Lemonade.");
        return aReturn;
      },

      SELECTING_UPSELL: (sInput) => {
        let aReturn = [];
        if (sInput.toLowerCase().includes("pepsi") || sInput.toLowerCase().includes("lemonade")) {
          this.drink = sInput;
          aReturn.push(`You have added a ${sInput} to your order.`);
        }
        aReturn.push(`Thank you for your order! You ordered ${this.orderSize} ${this.orderItem}`);
        if (this.orderItem === "Pizza") {
          aReturn.push(`with toppings: ${this.pizzaToppings}`);
        } else {
          aReturn.push(`with ${this.pastaCheese} cheese.`);
        }
        aReturn.push("Your order will be ready for pickup in 20 minutes at 123 Main Street.");
        aReturn.push("Enjoy your meal, and thank you for choosing Vanessa's Italian Takeout!");
        this.isDone = true;
        return aReturn;
      }
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
