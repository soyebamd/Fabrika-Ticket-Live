let testMode = "on"; // "on" or "off"
const publicKeyTest = "";
const publicKeyLive = "";

let stripe = testMode === "on" ? Stripe(publicKeyTest) : Stripe(publicKeyLive);

console.log("Stripe mode: " + (testMode === "on" ? "Test" : "Live"));

let elements = stripe.elements();
let card = elements.create("card");
let field_name;
let customer_name;
let customer_LastName;
let customer_email;
let customer_Phone;
let ticket_cost;
let amount;
let totalTicketCostWithAlltax;
let specialSeatingMessage;
let stripe_amount;
let subscribeCheckbox;
let getCode;
let showCodeText = false;
let COUPON_CODE_APPLY;
const tax = 0.05; // 5%
const Ticketing_fee = 0.04; // 4%

let calculateTax;
let calculateTicketingFee;

let permission = false;

//Stripe form data
function stripeFormData() {
  formData("menu_heading", menuHeading);

  let menuCounter = 0;

  course.forEach((courseTitle, index) => {
    menuCounter++;

    formData("ingredients_title" + [index], courseTitle);
    formData("ingredients_desc" + [index], courseIngredients[index]);
    formData("qty" + [index], quantity[index]);
  });
  formData("menuCounder", menuCounter);
  console.log("Menu counter " + menuCounter);
}

// dayOfWeek

// dateofWeek

// $("#getInfo").on("click", function () {
//   console.log(currentSeatSelected + " Seat");
// });
let loadingElement;
function loadImg() {
  loadingElement = document.createElement("div");
  loadingElement.className = "loading";

  let loadingElementImg = document.createElement("img");
  loadingElementImg.className = "loading-img";
  loadingElementImg.src =
    "/wp-content/uploads/2021/07/13091logo_gears-1-e1704813626867.png";

  loadingElement.appendChild(loadingElementImg);
}

loadImg();

let showDetails = document.getElementById("showDetails");

function paymentForm() {
  // Create the card element
  const cardElementLabel = document.createElement("label");
  cardElementLabel.setAttribute("for", "card-element");
  cardElementLabel.textContent = "Credit or debit card";

  const cardElementDiv = document.createElement("div");
  cardElementDiv.setAttribute("id", "card-element");

  const cardErrorsDiv = document.createElement("div");
  cardErrorsDiv.setAttribute("id", "card-errors");
  cardErrorsDiv.setAttribute("role", "alert");

  let submitButton;
  //submitButton/checkoutButton
  function checkoutButton() {
    submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("id", "submit-button");
    submitButton.setAttribute("class", "btn btn-primary mb-2");
    submitButton.textContent = "Checkout";
  }

  //checkoutContainer
  const checkoutContainer = document.createElement("div");
  checkoutContainer.setAttribute("id", "checkoutContainer");

  //checkout
  const checkoutAccept = document.createElement("input");
  checkoutAccept.setAttribute("type", "checkbox");
  checkoutAccept.setAttribute("id", "submit-checkbox");
  checkoutAccept.setAttribute("class", "form-input cbx hidden");

  //checkout design label

  const checkoutAcceptLable = document.createElement("label");
  checkoutAcceptLable.setAttribute("class", "form-check-label lbl");
  checkoutAcceptLable.setAttribute("for", "submit-checkbox"); // The ID of the associated input element

  //checkboxContent
  const checkboxContent = document.createElement("div");
  checkboxContent.setAttribute("id", "checkout-content");
  checkboxContent.innerHTML = `<label for="submit-checkbox terms-text my-15"><strong>Terms and Conditions</strong>:<br> By selecting this box, you are stating that you understand that these tickets are Non-Refundable. If you are unable to attend you must give the venue no less than a 24 hour notice in order to receive a credit to use at a later date. You understand that we are a 21+ venue at all times. Fabrika's management team reserves the right to refuse service at their own discretion. </label>`;

  const paymentForm = document.getElementById("payment-form");

  paymentForm.appendChild(cardElementLabel);
  paymentForm.appendChild(cardElementDiv);
  paymentForm.appendChild(cardErrorsDiv);

  paymentForm.appendChild(checkoutContainer);

  checkoutContainer.appendChild(checkoutAccept);
  checkoutContainer.appendChild(checkoutAcceptLable);

  checkoutContainer.appendChild(checkboxContent);

  //control submit button display

  let showButton = false;

  const checkTermsInputStatus = document.querySelector("#submit-checkbox");

  checkTermsInputStatus.addEventListener("input", function (inputStatus) {
    if (checkTermsInputStatus.checked == true) {
      showButton = true;
    } else {
      showButton = false;
    }

    console.log(showButton);

    if (showButton) {
      // submit/checkout Button
      checkoutButton();
      paymentForm.appendChild(submitButton);
    } else {
      const getSubmitButton = document.querySelector("#submit-button");

      if (getSubmitButton) {
        paymentForm.removeChild(submitButton);
      }
    }
  });
}

const form = document.getElementById("payment-form");

const cartForm = document.getElementById("cart-form");

cartForm.addEventListener("submit", function (event) {
  // ADD VARIABLES HERE FROM CODE TO ACCESS

  event.preventDefault();

  // COUPON_CODE

  COUPON_CODE_APPLY = VALID_COUPON_CODE[showDay.indexOf(dayOfWeek)];

  console.log("VALID_COUPON_CODE Coupon code is upper " + VALID_COUPON_CODE);
  console.log("coupon code day of week " + showDay.indexOf(dayOfWeek));

  if (COUPON_CODE) {
    getCode = document.querySelector("#coupon-code-input");

    console.log("Coupon code is " + COUPON_CODE);
    console.log("Valid Coupon code is " + VALID_COUPON_CODE);
    console.log("Input Coupon code is " + getCode.value);

    if (COUPON_CODE_APPLY === getCode.value) {
      showCodeText = true;
    }
    calculateTotal(getCode.value, showDay.indexOf(dayOfWeek));
  }

  console.log(showCodeText + "Show text is true");

  course = [];
  courseIngredients = [];
  quantity = [];

  //#LOAD DINNER MENU HERE WHEN TOGGLE DINNER OPTION

  // Content is now fully loaded, attach event listeners

  //Extra Menu

  if (totalDinnerPrice > 0) {
    menuHeading = "Menu";
  }

  const menuQuantity = document.querySelectorAll(".menu-quantity");
  const courseMenu = document.querySelectorAll(".ingredients-title");
  const ingredients = document.querySelectorAll(".ingredients");
  let menuCounter = 0;

  let totalAvailableMenu;

  totalAvailableMenu = menuQuantity.length;

  courseMenu.forEach((courseTitle, index) => {
    console.log("total menu are- " + menuCounter);
    //////
    if (courseTitle.checked) {
      console.log("total menu are NEXT- " + menuCounter);

      course.push(courseTitle.value);

      // prevent from all menu title entries
      if (menuQuantity[index]) {
        menuCounter++;
        quantity.push(menuQuantity[index].value);
        courseIngredients.push(ingredients[index].textContent);
      } else {
        quantity.push(0);
        courseIngredients.push(0);
      }
    }

    ///
  });

  //   console.log(menuCounter + "====" + totalAvailableMenu);

  //   console.log("check selected menu itesk");
  //   if (menuCounter >= totalAvailableMenu) {
  //     console.log(menuCounter + " == " + totalAvailableMenu);
  //     validateMenuItems = false;
  //   }

  //   if (validateMenuItems == true) {
  //     if (menuCounter < totalAvailableMenu || menuCounter == 0) {
  //       alert("Please select one item per person from each course.");
  //       return false;
  //     }
  //   }

  console.log("Validation menu");
  console.log(course_1);
  console.log(course_2);
  console.log(course_3);

  if (course_1 && course_2 && course_3) {
    validateMenuItems = false;
  } else {
    if (validateMenuItems == true) {
      alert("Please select one item per person from each course.");
      return false;
    }
  }

  console.log(course);
  console.log(courseIngredients);
  console.log(quantity);
  // END   //Extra Menu

  //   console.log(course_1);
  //   console.log(course_2);
  //   console.log(course_3);

  customer_name = document.getElementById("cart_customerName");

  customer_LastName = document.getElementById("cart_customerLastName");

  getSpecialSeatMessage = document.getElementById("specialSeating");
  customer_email = document.getElementById("cart_customerEmail");
  customer_Phone = document.getElementById("cart_customerPhone");

  subscribeCheckbox = document.getElementById("subscribeCheckbox");

  //cart_customerName;

  if (
    currentShowName == "Love, Inferno Show 1" ||
    currentShowName == "Love, Inferno Show 2"
  ) {
    ticket_cost =
      Number(currentEventPrice) * Number(currentSelectedDinnerPeople);
  } else {
    ticket_cost = Number(currentEventPrice) * Number(currentSeatSelected);
  }
  calculateTicketingFee = ticket_cost * Ticketing_fee;

  const ticket_cost_width_ticketing_fee = calculateTicketingFee + ticket_cost;

  const ticket_cost_width_ticketing_fee_width_tax =
    ticket_cost_width_ticketing_fee * tax;

  //total amout to send stript also
  totalTicketCostWithAlltax =
    Number(ticket_cost_width_ticketing_fee_width_tax) +
    Number(ticket_cost_width_ticketing_fee);

  calculateTax = ticket_cost_width_ticketing_fee * tax;

  //Add dinner cost also
  const totalDinnerCostWithAlltax = totalDinnerPrice;

  const totalCostWithAlltax =
    //Total ticket cost
    Number(totalTicketCostWithAlltax) +
    // Total Dinner cost if have
    Number(totalDinnerCostWithAlltax);

  //   console.log("total with ticketing fee " + calculateTicketingFee);

  //   console.log(
  //     "ticket cost with ticketing fees" + ticket_cost_width_ticketing_fee
  //   );

  //   console.log("total cost after tax " + ticket_cost_width_ticketing_fee * tax);

  //   console.log("total cost after tax " + totalCostWithAlltax);

  amount = totalCostWithAlltax;

  console.log(amount.toFixed(2) + "total amount with all taxes");

  stripe_amount = amount.toFixed(2);
  if (validateMenuItems == false) {
    showDetails.appendChild(loadingElement);
    this.style.opacity = ".6";
    this.style.filter = "blur(4px)";
    setTimeout(() => {
      loadingElement.remove();
      this.remove();
      cartDetails();
    }, 3000);
  }

  //Dinner Menu
  function dinnerMenu() {
    console.log(course);
    console.log(courseIngredients);
    console.log(quantity);

    let Heading = document.createElement("h2");
    Heading.innerHTML = `<strong>${menuHeading}:</strong>`;
    form.appendChild(Heading);

    course.forEach((menuItems, index) => {
      let menu = document.createElement("div");
      menu.className = "my-2";
      menu.innerHTML = `<p class="mb-0"><strong> ${menuItems} </strong> - QTY:  ${quantity[index]}</p> <p>${courseIngredients[index]}</p>`;
      form.appendChild(menu);
    });
    // Dinner Price
    let dinnerCostTitle = document.createElement("h2");
    dinnerCostTitle.className = "my-2 mb-0"; // Optional: Add a class for styling
    dinnerCostTitle.innerHTML = `<strong>Dinner:</strong>`;
    form.appendChild(dinnerCostTitle);

    let dinnerMenuPrice = document.createElement("div");
    dinnerMenuPrice.innerHTML = `<p ><strong> Dinner Price: </strong> $${calculateDinnerPrice} </p>`;
    form.appendChild(dinnerMenuPrice);

    // Dinner Tax
    let dinnerTax = document.createElement("div");
    dinnerTax.innerHTML = `<p><strong> Dinner Tax: </strong> $${calculateDinnerTax} </p>`;
    form.appendChild(dinnerTax);

    // Gratuity
    let gratuity = document.createElement("div");
    gratuity.innerHTML = `<p><strong> Gratuity: </strong> $${calculateGratuity} </p>`;
    form.appendChild(gratuity);

    let dinnerPrice = document.createElement("div");
    dinnerPrice.innerHTML = `<p><strong> Total Dinner Price: </strong> $${totalDinnerPrice} </p>`;
    form.appendChild(dinnerPrice);

    //    calculate dinner price for checkout price

    // Add dinner menu price varables

    formData("calculate_Dinner_Price", calculateDinnerPrice);

    formData("calculate_Dinner_Tax", calculateDinnerTax);

    formData("calculate_Gratuity", calculateGratuity);

    formData("total_Dinner_Price", totalDinnerPrice);
  }

  //cart details
  function cartDetails() {
    let cartTitle = document.createElement("h2");
    cartTitle.className = "mt-0";
    cartTitle.innerHTML = `<strong>Your Cart Details</strong>`;
    form.appendChild(cartTitle);

    let currentOnlineBookingDate = document.createElement("p");
    currentOnlineBookingDate.innerHTML = `<strong>Booking Date:</strong> ${currentBookingDate}`;
    form.appendChild(currentOnlineBookingDate);

    let customerNameText = document.createElement("p");
    customerNameText.innerHTML = `<strong>First Name:</strong> ${customer_name.value}`;
    form.appendChild(customerNameText);

    let customerNameLastText = document.createElement("p");
    customerNameLastText.innerHTML = `<strong>Last Name:</strong> ${customer_LastName.value}`;
    form.appendChild(customerNameLastText);

    // let subscribeME = document.createElement("p");
    // subscribeME.innerHTML = `<strong>Subscribe:</strong> ${subscribeCheckbox.checked}`;
    // form.appendChild(subscribeME);

    let customerEmail = document.createElement("p");
    customerEmail.innerHTML = `<strong>Email:</strong> ${customer_email.value}`;
    form.appendChild(customerEmail);

    let customerPhone = document.createElement("p");
    customerPhone.innerHTML = `<strong>Phone:</strong> ${customer_Phone.value}`;
    form.appendChild(customerPhone);

    let fabrikaShowName = document.createElement("p");
    fabrikaShowName.innerHTML = `<strong>Show Name:</strong> ${currentShowName}`;
    form.appendChild(fabrikaShowName);

    let selectedShowDate = document.createElement("p");
    selectedShowDate.innerHTML = `<strong>Show Date:</strong> ${dateofWeek}`;
    form.appendChild(selectedShowDate);

    let selectedShowDay = document.createElement("p");
    selectedShowDay.innerHTML = `<strong>Show Day:</strong> ${currentShowDay}`;
    form.appendChild(selectedShowDay);

    let currentShowBeigning = document.createElement("p");
    currentShowBeigning.innerHTML = `<strong>Show Time:</strong> ${currentShowBeigningTime}`;
    form.appendChild(currentShowBeigning);

    let selectedShowTime = document.createElement("p");
    selectedShowTime.innerHTML = `<strong>Seating Time:</strong> ${currentShowTime}`;
    form.appendChild(selectedShowTime);

    let selectedEventName = document.createElement("p");
    selectedEventName.innerHTML = `<strong>Event Name:</strong> ${currentEventName}`;
    form.appendChild(selectedEventName);

    let eventNames = [
      "General Admission",
      "Dinner Show",
      "Value Package",
      "Vip Couch Seating",
      "Mezzanine VIP Seating",
    ];

    if (totalDinnerPrice > 0) {
      dinnerMenu();
    }

    let ticketCostTitle = document.createElement("h2");
    ticketCostTitle.className = "my-2 mb-0"; // Optional: Add a class for styling
    ticketCostTitle.innerHTML = `<strong>Ticket:</strong>`;
    form.appendChild(ticketCostTitle);

    if (showCodeText) {
      let couponCode = document.createElement("p");
      couponCode.innerHTML = `<strong>Coupon Apply:</strong> ${COUPON_CODE_APPLY}`;
      form.appendChild(couponCode);
    }

    let ticketCost = document.createElement("p");
    ticketCost.innerHTML = `<strong>Ticket Cost:</strong> $${ticket_cost.toFixed(
      2
    )}`;
    form.appendChild(ticketCost);

    //calculateTicketingFee
    let selectedTicketingFee = document.createElement("p");
    selectedTicketingFee.innerHTML = `<strong>Ticketing Fee:</strong> $${calculateTicketingFee.toFixed(
      2
    )}`;
    form.appendChild(selectedTicketingFee);

    //calculateTax
    let selectedTax = document.createElement("p");
    selectedTax.innerHTML = `<strong>Philadelphia Tax:</strong> $${calculateTax.toFixed(
      2
    )}`;
    form.appendChild(selectedTax);

    //tickting cost
    if (totalDinnerPrice > 0) {
      let ticktingCost = document.createElement("p");
      ticktingCost.innerHTML = `<strong>Total Ticket Cost:</strong> $${Number(
        totalTicketCostWithAlltax.toFixed(2)
      )}`;
      form.appendChild(ticktingCost);
    }

    let selectedEventPrice = document.createElement("p");
    selectedEventPrice.className = "price-highlight";
    selectedEventPrice.innerHTML = `<strong>Total Cost:</strong> $${(
      Number(totalTicketCostWithAlltax) + Number(totalDinnerPrice)
    ).toFixed(2)}`;

    form.appendChild(selectedEventPrice);

    let selectedSeatSelected = document.createElement("p");
    selectedSeatSelected.innerHTML = `<strong>Number of Seats:</strong> ${currentSeatSelected}`;
    form.appendChild(selectedSeatSelected);

    let specialSeatingMessage = document.createElement("p");
    specialSeatingMessage.innerHTML = `<strong>Special Seating Message:</strong> ${getSpecialSeatMessage.value}`;
    form.appendChild(specialSeatingMessage);

    let selectedSeatPeople = document.createElement("p");
    selectedSeatPeople.innerHTML = `<strong>Number of People Attending:</strong> ${currentSeatPeople}`;
    form.appendChild(selectedSeatPeople);

    let selectedCelebration = document.createElement("p");
    selectedCelebration.innerHTML = `<strong>Are You Celebrating A Birthday:</strong> ${currentCelebration}`;
    form.appendChild(selectedCelebration);

    paymentForm();

    card = stripe.elements().create("card", {
      style: {
        base: {
          iconColor: "#cc8e1f",
          color: "#cc8e1f",
          fontWeight: "500",
          fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
          fontSize: "16px",
          fontSmoothing: "antialiased",
          ":-webkit-autofill": {
            color: "#cc8e1f78",
          },
          "::placeholder": {
            color: "#cc8e1f78",
          },
        },
        invalid: {
          iconColor: "red",
          color: "#ff0000",
        },
      },
    });

    card.mount("#card-element");

    afterGettingInfo();
  }

  //HIDE EXTRA ELEMENT WHEN PROCESS TO CART
  $("#duble-show-container, .hide-in-checkout").hide();
  $("#hide-in-ticekt").show().css({ display: "block" });
  $("#headingMessage").text("Cart");
});

function afterGettingInfo() {
  // console.log(form);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    createToken();
  });
}

function createToken() {
  stripe.createToken(card).then(function (result) {
    if (result.error) {
      let errorElement = document.getElementById("card-errors");
      errorElement.textContent = result.error.message;
    } else {
      permission = true;
      stripeTokenHandler(result.token);
    }
  });
}

function formData(fieldName, fieldValue) {
  let inputField = document.createElement("input");
  inputField.setAttribute("type", "hidden");
  inputField.setAttribute("name", fieldName);
  inputField.setAttribute("value", fieldValue);
  form.appendChild(inputField);
}

function stripeTokenHandler(token) {
  let hiddenTokenInput = document.createElement("input");
  hiddenTokenInput.setAttribute("type", "hidden");
  hiddenTokenInput.setAttribute("name", "stripeToken");
  hiddenTokenInput.setAttribute("value", token.id);
  form.appendChild(hiddenTokenInput);

  formData("customer_name", customer_name.value);

  formData("customer_LastName", customer_LastName.value);

  formData("customer_email", customer_email.value);
  formData("customer_Phone", customer_Phone.value);
  formData("subs", subscribeCheckbox.checked);

  formData("booking_date", currentBookingDate);

  formData("show_name", currentShowName);
  formData("show_date", dateofWeek);

  formData("show_day", currentShowDay);
  formData("show_time", currentShowTime);
  formData("show_start_time", currentShowBeigningTime);

  formData("event_name", currentEventName);

  formData("philadelphia_tax", calculateTax.toFixed(2));

  formData("ticketing_fee", calculateTicketingFee.toFixed(2));

  formData("special_seating", getSpecialSeatMessage.value);

  formData("ticket_cost", ticket_cost);

  if (showCodeText) {
    formData("coupon_code_apply", COUPON_CODE_APPLY);
  }

  // price that go to stripe also
  formData("event_price", stripe_amount);

  formData(
    "total_Ticket_Cost_With_All_tax",
    totalTicketCostWithAlltax.toFixed(2)
  );

  formData("event_seat", currentSeatSelected);
  formData("event_seat_attendee_people", currentSeatPeople);
  formData("celebrating_birthday", currentCelebration);

  if (totalDinnerPrice > 0) {
    stripeFormData();
  }

  //console.log(stripe_amount);

  const buyButton = document.getElementById("submit-button");
  buyButton.remove();
  showDetails.appendChild(loadingElement);
  form.style.opacity = ".6";
  form.style.filter = "blur(4px)";

  form.submit();
}
