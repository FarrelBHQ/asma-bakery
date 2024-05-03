document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Cookie 1", img: "product_1.jpg", price: 30000 },
      { id: 2, name: "Cookie 2", img: "product_1.jpg", price: 30000 },
      { id: 3, name: "Cookie 3", img: "product_1.jpg", price: 30000 },
      { id: 4, name: "Cookie 4", img: "product_1.jpg", price: 30000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // checking if there is a same product in the cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // if the cart is empty
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // if the item is the same or not
        this.items = this.items.map((item) => {
          // if its differents
          if (item.id !== newItem.id) {
            return item;
          } else {
            // if the item is the same, add quantity and totals
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // select item to remove base on id
      const cartItem = this.items.find((item) => item.id === id);

      // if item is more than one
      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          // if not the the one that is clicked
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // if the item remains one
        this.item = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

//form validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");
form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== null) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }
  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

// sending data when checkout clicked
checkoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  const message = formatMessage(objData);
  window.open(
    "https://wa.me/6281224347817?text=" + encodeURIComponent(message)
  );
});

// messages format for whatsapp
const formatMessage = (obj) => {
  return `Customer Data
  Nama: ${obj.name}
  Email: ${obj.email}
  Phone: ${obj.phone}
  Orders Data
  ${JSON.parse(obj.items).map(
    (item) => ` ${item.name} (${item.quantity} x ${rupiah(item.total)})\n`
  )}
  TOTAL: ${rupiah(obj.total)}
  Terima Kasih.
  `;
};

// currency converter
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    // minimumFractionDigits: "0",
  }).format(number);
};
