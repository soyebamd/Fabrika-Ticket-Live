// discount.js

export let COUPON_CODE = false;
export const DISCOUNTED_PRICE = 2.15;
export const DISCOUNTED_PRICE_FIXED = 15;

export const VALID_COUPON_CODE = [
  "ELEVATEDBRUNCH",
  "ELEVATEDBORDELLO",
  "ELEVATEDOPUS",
  "ELEVATEDOPUS",
];

export const VALID_COUPON_CODE_FIXED_DISCOUNT = [20, 20, 50, 50];

export let PERCENT_COUPON_CODE = "BOGO215";
export let FIXED_COUPON_CODE = "FIXED215";

export let totalCost = 0;

// Function to calculate total cost
export function calculateTotal(
  couponCode = "",
  day,
  currentSeatSelected,
  currentEventPrice
) {
  totalCost = 0;

  if (couponCode === PERCENT_COUPON_CODE) {
    const numberOfPairs = Math.floor(currentSeatSelected / 2);
    const remainingTickets = currentSeatSelected % 2;

    totalCost += numberOfPairs * (currentEventPrice + DISCOUNTED_PRICE);
    totalCost += remainingTickets * currentEventPrice;

    currentEventPrice = totalCost / currentSeatSelected;
  } else if (VALID_COUPON_CODE.includes(couponCode)) {
    console.log(`${couponCode} Coupon Code Applied`);

    let totalDiscountedPrice = VALID_COUPON_CODE_FIXED_DISCOUNT[day];
    currentEventPrice -= totalDiscountedPrice;

    totalCost = currentEventPrice * currentSeatSelected;
  } else {
    totalCost = currentSeatSelected * currentEventPrice;
  }

  console.log("Total Cost: $" + totalCost.toFixed(2));
  console.log("Price per ticket: $" + currentEventPrice.toFixed(2));

  return totalCost;
}

// Function to handle BOGO Discount
export function bogoDiscount(
  eventDate,
  showName,
  eventName,
  currentSeatSelected,
  currentEventPrice
) {
  console.log("Event Date: " + eventDate);
  console.log("Show Name: " + showName);
  console.log("Event Name: " + eventName);

  const couponInputWrapper = document.querySelector("#coupon-wrapper");

  if (showName && currentSeatSelected >= 2) {
    COUPON_CODE = true;

    if (COUPON_CODE) {
      couponInputWrapper.innerHTML = "";

      const couponInputLabel = document.createElement("label");
      couponInputLabel.setAttribute("for", "coupon-code-input");
      couponInputLabel.textContent = "Enter Coupon Code:";
      couponInputWrapper.appendChild(couponInputLabel);

      const couponInput = document.createElement("input");
      couponInput.type = "text";
      couponInput.id = "coupon-code-input";
      couponInput.className = "input-style";
      couponInput.placeholder = "Enter Coupon Code";

      couponInputWrapper.appendChild(couponInput);

      console.log(currentSeatSelected + " Seats");
      console.log("Original Price: $" + currentEventPrice);
    }
  } else {
    couponInputWrapper.innerHTML = "";
    console.log("Remove the discount code");
    COUPON_CODE = false;
  }

  console.log("Coupon Code: " + COUPON_CODE);
}
