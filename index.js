// index.js
import { Order } from './Order.js';

class Chat extends HTMLElement {
  constructor() {
    super();
    this.oOrder = new Order("123-456-7891");
  }

  sendMessage(evt) {
    evt.preventDefault();
    var msg = this.input.value;
    this.input.value = '';
    this.writeLine(msg);
  }

  writeLine(text) {
    this.messages.insertAdjacentHTML("beforeend", `<li class="message-item item-secondary">You say: ${text}</li>`);
    const aMessages = this.oOrder.handleInput(text);
    if (this.oOrder.isDone) {
      this.oOrder = new Order("456-789-1023"); // Reset order when done
    }
    for (let message of aMessages) {
      this.messages.insertAdjacentHTML("beforeend", `<li class="message-item item-primary">Bot says: ${message}</li>`);
    }
    this.messages.scrollTop = this.messages.scrollHeight;
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="chat-box">
        <div class="messages">
          <ul class="message-list"></ul>
          <form class="message-input">
            <input type="text" placeholder="Type your message..." />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>`;
    this.input = this.querySelector("input");
    this.messages = this.querySelector(".message-list");
    this.querySelector("form").addEventListener('submit', this.sendMessage.bind(this));
  }
}

customElements.define("x-chat", Chat);
