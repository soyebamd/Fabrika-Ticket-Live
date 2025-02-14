// ============================
// Fabrika Reservation System - Main Script
// ============================

// Copyright © 2025 Gloria Esposito & Soyeb Ahmed. All rights reserved.
//
// This script is responsible for managing the reservation system for a restaurant or similar venue.
// It dynamically updates table availability based on the current day of the week and user-selected location.
// It also allows users to interact with available tables, select seats, and view the total cost for their reservation.

// Key features of this system:
// - Table availability is shown based on the current day of the week.
// - Tables have varying prices based on the day (e.g., Sunday, Thursday, Friday, Saturday) and location.
// - Users can choose their location (Main Floor or Mezzanine) and see corresponding table information.
// - A date picker allows users to select a different day for reservation, updating the table options accordingly.
// - The system dynamically adjusts to show which tables are available, with a price and seat options for each table.

// Structure Overview:
// - The reservation tables are divided into different "groups" based on their location (Main Floor or Mezzanine).
// - Each table's data includes information like table number, minimum and maximum seat requirements, description, and price.
// - The system updates the display whenever a user changes the location or selects a different day via the date picker.

// Main Components:
// 1. **Location Selection**: Users can choose between the Main Floor or Mezzanine, and the available tables update accordingly.
// 2. **Day-based Pricing**: Prices for tables change depending on the selected day of the week (e.g., weekends may have higher prices).
// 3. **Dynamic Table Creation**: Tables are dynamically created and displayed with checkboxes for selecting seats.
// 4. **Date Picker**: Allows users to select a different date and see available tables for that day.

// ============================
// C#7d0101its:
// ============================
// Developed by: Soyeb Ahmed
// Concept/Design by: Gloria Esposito (https://gloriaesposito.com/)
// ============================

// The flow of the code is as follows:
// 1. Initialization of variables and default settings (like location and current day).
// 2. Table reservation data is dynamically updated and displayed based on user input (location, day, seat selection).
// 3. Pricing is adjusted depending on the selected day, and users can interact with the checkboxes to add/remove tables.
// 4. The system uses a date picker to select a future day for reservation and updates the table view accordingly.
//
// Please refer to the individual functions below for specific logic on each feature (like the day-based pricing, table creation, and seat selection).

// EASY NAVIGATION
// ✅ 1. STRIPE PAYMENT AND DATA
// ============================
"use strict";

import { FabrikaReservationTables } from "./src/reservationTables.js";

import { BookedTable } from "./src/bookedTable.js";

import { newShows } from "./src/specialShows.js";

import {
  calculateTotal,
  bogoDiscount,
  COUPON_CODE,
  PERCENT_COUPON_CODE,
} from "./src/Coupon.js";

import {
  mainFloorContainer,
  mainMezzanineContainer,
  tableSlot,
  group1_tables,
  group2_tables,
  group3_tables,
  group4_tables,
  group5_tables,
  group6_tables,
  group7_tables,
  group8_tables,
  group9_tables,
  group10_tables,
  group11_tables,
  group12_tables,
  group13_tables,
  group14_tables,
  group15_tables,
  group16_tables,
  group17_tables,
  group18_tables,
  group19_tables,
  group20_tables,
  group21_tables,
  group22_tables,
  mezzanine_group1_tables,
} from "./src/tableManagement.js";

//dinner menu

import { DinnerMenu } from "./src/DinnerMenu.js";

document.addEventListener("DOMContentLoaded", function () {
  // Fetch the dinner menu

  let currentShowName;
  let currentShowBeigningTime;
  let currentShowDay;
  let currentShowTime;
  let currentEventName;
  let currentEventPrice = 0;
  let currentSeatSelected;
  let currentCelebration;
  let currentSeatPeople;

  //Menu
  let menuHeading;
  let validateMenuItems = false;

  console.log(validateMenuItems + "VALIDATE MENU FOR CHECKOUT");

  const VALID_COUPON_CODE = [
    "ELEVATEDBRUNCH",
    "ELEVATEDBORDELLO",
    "ELEVATEDOPUS",
    "ELEVATEDOPUS",
  ];

  //### DINNER STUFF HERE
  //

  let calculateDinnerPrice;
  let calculateDinnerTax;
  let calculateGratuity;
  let totalDinnerPrice = 0;
  //END ### DINNER STUFF HERE

  currentSeatSelected = 1;
  currentSeatPeople = 0;

  const result = document.querySelector("#result");

  const scrollContainer = document.querySelector(".in-one-row-scroll");

  // Base to trace days
  const showDays = [0, 4, 5, 6];

  const mainFloor_default_price = [20, 10, 50, 50];
  let mainFloor_default_price_array = [...mainFloor_default_price];

  const mainfloor_Opus_price = [20, 10, 75, 75];
  let mainfloor_Opus_price_array = [...mainfloor_Opus_price];

  const mainFloor_couch_default_price = [200, 50, 300, 300];
  let mainFloor_couch_default_price_array = [...mainFloor_couch_default_price];

  const mainFloor_vip_couch_default_price = [400, 50, 750, 750];
  let mainFloor_vip_couch_default_price_array = [
    ...mainFloor_vip_couch_default_price,
  ];

  //  Mezzanine table prices per persone and couch

  const mezzanine_default_price = [20, 10, 50, 50];
  const mezzanine_default_price_array = [...mezzanine_default_price];

  const mezzanine_couch_price = [300, 50, 650, 650];
  const mezzanine_couch_price_array = [...mezzanine_couch_price];

  const mezzanine_special_default_price = [20, 20, 45, 45];
  const mezzanine_special_couch_price = [300, 50, 650, 650];

  // END Mezzanine table prices per persone and couch

  //Min Spend
  const minSpend = [0, 0, 50, 100];
  let minSpendArray = [...minSpend];

  //Show Hours
  const showHours = [
    "1:00 PM to 2:00PM",
    "7:30 PM - 8:00PM",
    "8:00 PM - 9:00PM",
    "7:30 PM to Close",
  ];
  let showHoursArray = [...showHours];

  //Show Starting Time
  const showStartingTime = ["1:00 PM", "7:30 PM", "8:00 PM", "7:30 PM"];
  let showStartingTimeArray = [...showStartingTime];
  // #End
  //Show features image
  const featureImage = document.querySelector("#featured-image");

  const showFeatureImage = [
    "https://fabrikaphilly.com/wp-content/uploads/2024/08/sunday-drag-brunch.jpg",
    "https://fabrikaphilly.com/wp-content/uploads/2024/08/thursday-burlesque.jpeg",
    "https://fabrikaphilly.com/wp-content/uploads/2024/07/DSC04654.jpeg",
    "https://fabrikaphilly.com/wp-content/uploads/2024/07/DSC04654.jpeg",
  ];
  let showFeatureImageArray = [...showFeatureImage];
  // #End
  const showWrapper = document.querySelector("#show");

  const showName = document.querySelector("#show-name-span");

  const showStartSpan = document.querySelector("#show-start-span");

  const getBookedDay = document.querySelector("#show-day-span");

  const minSpendSpan = document.querySelector("#min-spend");

  const showDate = document.querySelector("#show-date");

  const showHoursSpan = document.querySelector("#show-hours");

  const showInfo = document.querySelector("#show-info");

  const cartCount = document.querySelector("#cart-count");

  const checkoutWrappper = document.querySelector(".checkout-wrappper");

  const burgerMenu = document.querySelector("#menu");

  function activeToggle() {
    const handleBurgerMenuClick = function () {
      checkoutWrappper.classList.toggle("pos-0");
    };
    burgerMenu.addEventListener("click", handleBurgerMenuClick);
  }

  const customerInformation = document.querySelector("#customer-information");
  customerInformation.style.display = "none";
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let timeIdSlot = [];

  // Create a Set of unique booked tables
  const BookedTableSet = new Set(
    BookedTable.map(
      (booked) =>
        `${booked.table_id}__${booked.table_location}__${booked.table_booking_date}__${booked.time_Id}`
    )
  );
  console.log(BookedTableSet);

  //Scroll content cetner

  function scrollContentCenter() {
    // console.log("Scroll cotent scroll");
    if (scrollContainer) {
      scrollContainer.scrollLeft =
        (scrollContainer.scrollWidth - scrollContainer.clientWidth) / 2;
    }
  }

  //console.log(BookedTableSet.table_location);

  let showEventShow = false;
  let showInfoDisplay = false;

  function showEvent(show) {
    showEventShow = show;

    eventWrapper.style.display = show ? "block" : "none";
  }

  // Feature Image Display
  function featureImageDisplay(url) {
    featureImage.innerHTML = "";
    const featureImg = document.createElement("img");
    featureImg.src = url;
    featureImg.className = "feature-image img-fluid";

    featureImage.appendChild(featureImg);
  }
  // End

  const eventWrapper = document.querySelector("#events");

  //checkout div
  const checkout = document.querySelector("#checkout");

  checkout;

  let total = 0;

  let showLocation;

  let mainFloorTables = [];

  const selectedCheckboxes = {}; // Store selected checkboxes (table_number => [seat_numbers])
  const selectedTime = {};
  const timeSlotWrapper = document.querySelector("#time-slot");

  let seatingTime = {
    sundayTimeSlot: ["12:00", "12:15", "12:30", "12:45", "13:00", "13:15"],

    thursdayTimeSlot: [
      "18:00",
      "18:15",
      "18:30",
      "18:45",
      "19:00",
      "19:15",
      "19:30",
    ],

    fridayTimeSlot: [
      "18:00",
      "18:15",
      "18:30",
      "19:00",
      "19:15",
      "19:30",
      "19:45",
      "20:00",
      "20:15",
    ],

    saturdayTimeSlot: [
      "18:00",
      "18:15",
      "18:30",
      "19:00",
      "19:15",
      "19:30",
      "19:45",
    ],
    timeSlot: function () {
      return [
        this.sundayTimeSlot,
        this.thursdayTimeSlot,
        this.fridayTimeSlot,
        this.saturdayTimeSlot,
      ];
    },
  };

  let seatingTimeArray = Object.values(seatingTime);

  let showId = "";

  const showNames = [
    {
      show_id: "all",
      show_name: "All",
      show_link: "#",
      show_description: "All Show",
    },
    {
      show_id: "bordello",
      show_name: "Bordello (Burlesque)",
      show_link: "#",
      show_description: "A night of burlesque.",
    },
    {
      show_id: "opus",
      show_name: "Opus (Variety Show)",
      show_link: "#",
      show_description: "A fun variety show with performances.",
    },
    {
      show_id: "drag_brunch",
      show_name: "Drag Brunch",
      show_link: "#",
      show_description: "Brunch with fabulous drag performances.",
    },
  ];
  let { timeSlot } = seatingTime;

  const slots = timeSlot.call(seatingTime);
  let slotsArray = [...slots];

  console.log(slotsArray + "Slot array");

  let showNamesArray = [...showNames];

  const showDisplayName = [
    showNamesArray[3]["show_name"],
    showNamesArray[1]["show_name"],
    showNamesArray[2]["show_name"],
    showNamesArray[2]["show_name"],
  ];
  let showDisplayNameArray = [...showDisplayName];

  const today = new Date();

  let currentDay = today.getDay(); //### Get the current day (0 = Sunday, ..., 6 = Saturday)

  const currentBookingDate = today.toLocaleDateString("en-US");

  //🧑‍💻⚡ Insert New Show Name

  showNamesArray = [...showNamesArray, ...newShows];

  console.log(showNamesArray);

  // initialize the inseertNewShow function

  const chooseLocation = document.querySelectorAll(".location");

  let bookingDate = new Date();

  bookingDate = $.datepicker.formatDate("mm/dd/yy", bookingDate);

  // get reservation info in array
  const reservationData = [];

  eventWrapper.style.display = "none";

  // Add minSpend to array according to day

  //### GET THE DEFAULT LOCATION VALUE
  if (chooseLocation.length > 0) {
    chooseLocation[0].checked = true; // Select the first option
    showLocation = chooseLocation[0].value; // Set the default location

    // Filter tables for the default location
    mainFloorTables = FabrikaReservationTables.filter(
      (table) => table.location === showLocation
    );

    //### TRIGGER THE RESERVATION TABLES FUNCTION
    ReservationTables(currentDay);
  }
  //END

  //### GET THE SELECTED LOCATION VALUE THROUGH RADIO BUTTON EVENT LISTENER
  chooseLocation.forEach((location) => {
    location.addEventListener("change", function () {
      if (location.checked) {
        showLocation = location.value;
        //  console.log(showLocation); // This will log the selected location  value from the radio button

        mainFloorTables = FabrikaReservationTables.filter(
          (table) => table.location === showLocation
        );
        //### TRIGGER THE RESERVATION TABLES FUNCTION
        ReservationTables(currentDay);

        console.log(reservationData);

        //END
      }

      console.log(location.value + "location");

      if (location.value == "Mezzanine Floor") {
        mainFloorContainer.style.display = "none";
        mainMezzanineContainer.style.display = "block";
      }
      if (location.value == "Main Floor") {
        mainFloorContainer.style.display = "block";
        mainMezzanineContainer.style.display = "none";
      }
    });
  });
  //END

  function triggerDatepickerUpdate(ID) {
    let specialShow = newShows.find((show) => show.show_id === ID);

    if (specialShow && specialShow.showDates.length > 0) {
      let firstAvailableDate = specialShow.showDates[0];

      console.log(`Jumping to first available date: ${firstAvailableDate}`);

      // **Update the datepicker to the first valid date**
      $("#datepicker").datepicker("setDate", firstAvailableDate);
      $("#datepicker").datepicker("option", "defaultDate", firstAvailableDate);
    }
  }

  function ResetTables() {
    reservationData.length = 0;
    checkout.innerHTML = "";
    cartCount.textContent = 0;
    customerInformation.style.display =
      reservationData.length == 0 ? "none" : "block";
  }

  function insertNewShow(ID, dayIndexs) {
    const currentDate = bookingDate; // Assuming bookingDate is defined somewhere

    newShows.some((show) => {
      if (ID === show.show_id && show.showDates.includes(currentDate)) {
        console.log(`Current Show for ${currentDate}: ${show.show_name}`);

        console.log(dayIndexs + " Get the day index");

        console.log(showDisplayNameArray[dayIndexs] + " Get show index");

        console.log(showDisplayNameArray[dayIndexs] + " Get show index");
        console.log(show.show_name + " Show Get show index");

        showDisplayNameArray[dayIndexs] = show.show_name;

        console.log(
          showDisplayNameArray[dayIndexs] + " Updated Get show index"
        );
        //   $("#datepicker").datepicker("setDate", currentDate);

        return true; // Stop the loop
      } else {
        if (!show.showDates.includes(currentDate)) {
          showDisplayNameArray = [...showDisplayName];
        }
        return false; // Continue the loop
      }
    });
  }

  function displayShowName(count) {
    // Assuming you have a DOM element to display the show name

    console.log("Invalid index or DOM element not found");
  }

  function clearTables() {
    // group1_tables.innerHTML = "";
    // group2_tables.innerHTML = "";
    // group3_tables.innerHTML = "";
    // group4_tables.innerHTML = "";

    tableSlot.forEach((clearTableData) => {
      clearTableData.innerHTML = "";
    });

    mezzanine_group1_tables.innerHTML = "";
  }
  function clearTimeSlot() {
    timeSlotWrapper.innerHTML = "";
  }

  //### UPDATE DATEPICKER ACCORDING TO SHOW ID

  function setShowID(setNewShowID) {
    showId = setNewShowID;
    console.log(showId);
    $("#datepicker-container").datepicker("refresh");
  }

  //END

  function show() {
    showNamesArray.forEach((show) => {
      console.log("Show Name: " + show.show_name);
      console.log("Show Link: " + show.show_link);
      console.log("Show Description: " + show.show_description); // Logs the show description

      const showItems = document.createElement("li");
      showItems.textContent = show.show_name;
      showItems.setAttribute("data_id", show.show_id);
      showItems.className = "show-link";

      showWrapper.appendChild(showItems);

      const firstItem = document.querySelector(".show-link");

      firstItem.classList.add("active");

      //### ON CLICK SHOW NAMES
      showItems.addEventListener("click", function () {
        showInfoDisplay = false;
        eventWrapper.style.display = "none";
        console.log(showInfoDisplay);
        showId = this.getAttribute("data_id");
        //   showName.textContent = show.show_name;
        setShowID(showId);
        insertNewShow(showId, showDays.indexOf(currentDay));
        document
          .querySelectorAll(".show-link")
          .forEach((link) => link.classList.remove("active"));
        this.classList.add("active");

        ReservationTables(currentDay);
      });
    });
  }
  show();

  //END

  function ReservationTables(currentDay) {
    console.log(showId + "Show ID");

    //### INSERT NEW SHOW
    insertNewShow(showId, showDays.indexOf(currentDay));

    newShows.forEach((newShow) => {
      console.log(`${bookingDate} Booking date for show`);

      //🧑‍💻⚡Default things update for special shows

      if (
        newShow.showDates.includes(bookingDate) &&
        showId === newShow.show_id
      ) {
        const index = showDays.indexOf(currentDay);
        minSpendArray[index] = newShow.MinSpend;
        showStartingTimeArray[index] = newShow.ShowStartAt;
        showHoursArray[index] = newShow.ShowHours;
        slotsArray[index] = newShow.seatingTime;
      }

      //🧑‍💻⚡Seating price update for wicked-cabaret
      if (["wicked-cabaret"].includes(showId)) {
        mainFloor_default_price_array[showDays.indexOf(currentDay)] = 40;
      }

      //🧑‍💻⚡Seating price update for love-inferno-ticket, love-inferno-ticket-2
      if (["love-inferno-ticket", "love-inferno-ticket-2"].includes(showId)) {
        mainFloor_default_price_array[showDays.indexOf(currentDay)] = 85;
        mainfloor_Opus_price_array[showDays.indexOf(currentDay)] = 130;
      }

      //🧑‍💻⚡Reset to remaining shows
      if (["all", "bordello", "opusShow", "drag_brunch"].includes(showId)) {
        minSpendArray = [...minSpend];
        showStartingTimeArray = [...showStartingTime];
        showHoursArray = [...showHours];
        slotsArray = [...slots];
        mainFloor_default_price_array = [...mainFloor_default_price];
        mainfloor_Opus_price_array = [...mainfloor_Opus_price];
      }
    });

    //END
    console.log("Display by Default");

    console.log(bookingDate + "Current Date");

    console.log(currentDay + "Current DAY");

    // show info only in default show date
    showInfo.style.display = showInfoDisplay ? "block" : "none";

    // Get current show
    showName.textContent = "";
    showDays.forEach((displayname, index) => {
      if (displayname == currentDay) {
        showName.textContent = showDisplayNameArray[index];
        displayShowName(showDisplayNameArray[index]);
        currentShowName = showDisplayNameArray[index];
      }
    });

    const dayofWeek = daysOfWeek[currentDay];

    // Get current Day
    getBookedDay.textContent = dayofWeek;

    // Conditional requirment for starting time
    /* if (bookingDate === "01/24/2025") {
  
    showStartingTimeArray[showDays.indexOf(currentDay)] = "22:00 PM";
  } else {
    showStartingTimeArray = [...showStartingTime];
  }*/
    // End

    // Show Starting Time
    showStartSpan.textContent =
      showStartingTimeArray[showDays.indexOf(currentDay)];

    //Min Spend Block
    // Conditional requirment for Min Spend
    /*if (bookingDate === "01/24/2025") {
    minSpendArray[showDays.indexOf(currentDay)] = 150;
  } else {
    minSpendArray = [...minSpend];
  }*/
    // End
    minSpendSpan.textContent = `$${
      minSpendArray[showDays.indexOf(currentDay)]
    }`;
    // End MinSpend
    // show Date

    showDate.textContent = bookingDate;

    // Show Hours
    showHoursSpan.textContent = showHoursArray[showDays.indexOf(currentDay)];

    // Show Feature Image
    let featureImageUrl = showFeatureImageArray[showDays.indexOf(currentDay)];

    if (featureImageUrl) featureImageDisplay(featureImageUrl);

    // If special show overwirte exiting

    // End
    //### TIME SLOT MANAGEMENT
    clearTimeSlot();

    // convert to stagndard time

    function convertTime(time24) {
      let [hours, minutes] = time24.split(":").map(Number);
      let period = hours >= 12 ? "PM" : "AM";

      // Convert hours from 24-hour format to 12-hour format
      hours = hours % 12 || 12; // Convert 0 (midnight) to 12

      return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${period}`;
    }

    function timeSlotManagment(timeslot) {
      if (timeslot === 0) {
        timeslot = slotsArray[0];
      } else if (timeslot === 4) {
        timeslot = slotsArray[1];
      } else if (timeslot === 5) {
        timeslot = slotsArray[2];
      } else if (timeslot === 6) {
        timeslot = slotsArray[3];
      } else {
      }

      console.log;

      timeslot.forEach((time, index) => {
        //  console.log(time, index);

        // Create label for time slot
        const label = document.createElement("label");

        // Create li element for time slot
        const wrapTimeSlots = document.createElement("li");
        wrapTimeSlots.setAttribute("name", convertTime(time));
        wrapTimeSlots.value = convertTime(time);
        wrapTimeSlots.textContent = convertTime(time);

        // Create input radio element
        const convertedTime = "time_" + time.replace(/[:\s]/g, "");
        const wrapTimeSlots_input = document.createElement("input");
        wrapTimeSlots_input.setAttribute("type", "radio");
        wrapTimeSlots_input.className = "show-times";
        wrapTimeSlots_input.setAttribute("name", "selected_time");
        wrapTimeSlots_input.setAttribute("id", convertedTime);
        wrapTimeSlots_input.value = convertTime(time);

        const time_id = `${convertedTime}_${index}_${showLocation.replace(
          / /g,
          ""
        )}`;

        timeIdSlot.push(convertedTime);

        //console.log(time_id + "dddddddddddddddddddddddddddddddddddd");

        // Initialize or check if the time slot is already selected for this location
        if (
          selectedTime[showLocation] &&
          selectedTime[showLocation][time_id] === index
        ) {
          wrapTimeSlots_input.checked = true; // If the time slot is selected for the current location
        } else {
          wrapTimeSlots_input.checked = false; // Deselect if it's not selected
        }

        // Handle change event when a time slot is selected or deselected
        wrapTimeSlots_input.addEventListener("change", function () {
          // if (reservationData.time_slot == wrapTimeSlots_input.value) {
          //   console.log("Value " + reservationData.time_slot);
          // }

          // First, uncheck all checkboxes
          const resetOnTimeChange =
            document.querySelectorAll(".form-check-input");
          resetOnTimeChange.forEach((reset) => {
            reset.checked = false;
          });

          showEvent(true);

          if (this.checked) {
            // Find and check the corresponding checkbox
            console.log(reservationData);

            reservationData.forEach((reservation) => {
              console.log("Time slot value:", wrapTimeSlots_input.value);

              // Check if this reservation has the same time slot
              if (wrapTimeSlots_input.value === reservation.time_slot) {
                const checkboxes =
                  document.querySelectorAll(".form-check-input");

                checkboxes.forEach((checkbox) => {
                  // Check if checkbox ID matches the reservation's table_id
                  if (checkbox.id === reservation.table_id) {
                    checkbox.checked = true;
                  }
                });
              }
            });

            //   console.log(this.id + " checkbox id");

            // Initialize the selectedTime object for the current location if not already done
            if (!selectedTime[showLocation]) {
              selectedTime[showLocation] = {};
            }

            // Deselect all other checkboxes for the current location
            for (const key in selectedTime[showLocation]) {
              if (selectedTime[showLocation].hasOwnProperty(key)) {
                selectedTime[showLocation][key] = null; // Unselect any previously selected time for the current location
              }
            }

            // Update the selectedTime object with the new time selection for the current location
            selectedTime[showLocation][time_id] = index; // Only store the latest selection for this floor

            // Update the reservation data with the selected time slot
            reservationData.time_slot = this.value;

            // Log updated reservation data
            //   console.log("Updated selectedTime:", selectedTime);
            //  console.log("Current Value" + this.value);
          }

          //  console.log(showLocation + " - Trace location");
          console.log(reservationData);
          //  console.log(reservationData.table_location);
        });

        // Append the radio input and the label to the DOM
        timeSlotWrapper.appendChild(label);
        label.appendChild(wrapTimeSlots_input);
        label.appendChild(wrapTimeSlots);
      });
    }
    if (currentDay === 0 || currentDay >= 4) {
      timeSlotManagment(currentDay);
    }
    //END

    total = 0; // Reset the total price to zero for now once the day changes and table will still be selected value if checked
    clearTables(); // Clear existing tables before creating new ones

    /*
  result.innerHTML = `<thead><tr>
    <td>Table Number</td>
      <td> Minimum Seats</td>
      <td> Maximum Seats</td>
      <td> Price</td>
      <td> Description</td>
      <td> Image URL</td>
  </tr></thead>
 `;*/

    /*🧑‍💻
  ⚡- Update table price according to day 
  ⚡- Get tableData from mainfloorTable loop == reservation table loop
  */

    mainFloorTables.forEach((tableData) => {
      //###IF DAY IS SUNDAY DAY VALUE 0

      //If current day is 0 == Sunday

      //🧑‍💻⚡ Change Tier number according to sheet

      // 🧑‍💻⚡Add type to reservation data

      if (
        (tableData.table_number >= 500 && tableData.table_number <= 506) || // IDs 500-506
        (tableData.table_number >= 315 && tableData.table_number <= 317) // IDs 315-317
      ) {
        tableData.type = "per couch";
      } else {
        tableData.type = "per person";
      }

      //Default add tier Price
      tableData.tier = 1;

      let tier_color = "#cb82e6";

      const isWeekendOpus = currentDay === 5 || currentDay === 6; // Check if it's Friday or Saturday

      const isThursdayBordello = currentDay === 4; // Thursday Bordello Show

      const isSundayDragBrunch = currentDay === 0; // Sunday DragBrunch

      // default price set
      tableData.price =
        mainFloor_default_price_array[showDays.indexOf(currentDay)];

      if (isWeekendOpus) {
        //  console.log(tableData.table_number);

        tier_color = "#ff0000";
        // 🧑‍💻⚡Main Floor tables

        if (
          (tableData.table_number >= 100 && tableData.table_number <= 104) ||
          (tableData.table_number >= 110 && tableData.table_number <= 115) ||
          (tableData.table_number >= 120 && tableData.table_number <= 125) ||
          (tableData.table_number >= 200 && tableData.table_number <= 204) ||
          (tableData.table_number >= 210 && tableData.table_number <= 212) ||
          (tableData.table_number >= 220 && tableData.table_number <= 222)
        ) {
          tier_color = "#cb82e6";
          tableData.price =
            mainfloor_Opus_price_array[showDays.indexOf(currentDay)];
        }
      }

      if (tableData.table_number >= 504 && tableData.table_number <= 506) {
        tier_color = "#5271ff";

        tableData.price =
          mainFloor_couch_default_price_array[showDays.indexOf(currentDay)];
      }

      if (tableData.table_number >= 500 && tableData.table_number <= 503) {
        tier_color = "#57c06b";

        tableData.price =
          mainFloor_vip_couch_default_price_array[showDays.indexOf(currentDay)];
      }

      //  Mezzanine Table Prices

      if (
        (tableData.table_number >= 304 && tableData.table_number <= 314) ||
        (tableData.table_number >= 315 && tableData.table_number <= 317) ||
        (tableData.table_number >= 601 && tableData.table_number <= 603) ||
        (tableData.table_number >= 300 && tableData.table_number <= 303) ||
        (tableData.table_number >= 400 && tableData.table_number <= 403)
      ) {
        tableData.price =
          mezzanine_default_price_array[showDays.indexOf(currentDay)];
      }
      if (tableData.table_number >= 315 && tableData.table_number <= 317) {
        tableData.price =
          mezzanine_couch_price_array[showDays.indexOf(currentDay)];
        tier_color = "#57c06b";
        if (isWeekendOpus) {
          tier_color = "#ffde59";
        }
      }

      if (isWeekendOpus) {
        if (
          (tableData.table_number >= 601 && tableData.table_number <= 603) ||
          (tableData.table_number >= 400 && tableData.table_number <= 403)
        ) {
          tableData.price =
            mezzanine_special_default_price[showDays.indexOf(currentDay)];
          tier_color = "#eda140";
        }
      }

      //console.log(tableData);

      //END

      //### IF DAY IS MONDAY, TUESDAY, WEDNESDAY DAY VALUE 1, 2, 3
      //NON BOOKING DAYS
      /*
    if (currentDay >= 1 && currentDay <= 3) {
      // console.log("non booking days");
      // Display the properties you need
      result.innerHTML = `OFF DAY`;
    } else {
      //### DISPLAY THE TABLES DATA
      result.innerHTML += `<tr>
    <td> ${tableData.table_number}</td>
  <td>  ${tableData.min_seat_requirment}</td>
   <td> ${tableData.max_seat_requirment}</td>
 <td>   $${tableData.price}</td>
  <td> ${tableData.desc}</td>
 <td>    ${tableData.image}</td>
  </tr>
 `;
    }
    */
      //END
      if (tableData.table_number == "A" || tableData.table_number == "B") {
        //🧑‍💻⚡ CREATE TABLES WITH OPTIONS ON FRONTEND MAIN.JS
        //🧑‍💻⚡ GROUP 1 TABLE  WITH A AND B TABLE NUMBER, ID row-AB
        createTable(tableData, group1_tables, tier_color, currentDay);
      }

      //### GROUP 2 TABLE  WITH 105 TO 109 TABLE NUMBER, ID row-109-105
      if (tableData.table_number >= 105 && tableData.table_number <= 109) {
        createTable(tableData, group2_tables, tier_color, currentDay);
      }

      //### GROUP 3 TABLE  WITH 100 TO 104 TABLE NUMBER, ID row-104-100
      if (tableData.table_number >= 100 && tableData.table_number <= 104) {
        createTable(tableData, group3_tables, tier_color, currentDay);
      }

      //### GROUP 3 TABLE  WITH 100 TO 104 TABLE NUMBER, ID row-104-100
      if (tableData.table_number >= 200 && tableData.table_number <= 204) {
        createTable(tableData, group4_tables, tier_color, currentDay);
      }

      //### GROUP 3 TABLE  WITH 100 TO 104 TABLE NUMBER, ID row-104-100
      if (tableData.table_number >= 205 && tableData.table_number <= 209) {
        createTable(tableData, group5_tables, tier_color, currentDay);
      }

      //### GROUP 3 TABLE  WITH 100 TO 104 TABLE NUMBER, ID row-104-100
      if (tableData.table_number >= 110 && tableData.table_number <= 115) {
        createTable(tableData, group6_tables, tier_color, currentDay);
      }

      //### GROUP 3 TABLE  WITH 100 TO 104 TABLE NUMBER, ID row-104-100
      if (tableData.table_number >= 116 && tableData.table_number <= 119) {
        createTable(tableData, group7_tables, tier_color, currentDay);
      }

      //### GROUP 3 TABLE  WITH 100 TO 104 TABLE NUMBER, ID row-104-100
      if (tableData.table_number >= 120 && tableData.table_number <= 125) {
        createTable(tableData, group8_tables, tier_color, currentDay);
      }

      //### GROUP 3 TABLE  WITH 100 TO 104 TABLE NUMBER, ID row-104-100
      if (tableData.table_number >= 126 && tableData.table_number <= 129) {
        createTable(tableData, group9_tables, tier_color, currentDay);
      }

      //### GROUP 3 TABLE  WITH 100 TO 104 TABLE NUMBER, ID row-104-100
      if (tableData.table_number >= 130 && tableData.table_number <= 131) {
        createTable(tableData, group10_tables, tier_color, currentDay);
      }

      //### GROUP 3 TABLE  WITH 100 TO 104 TABLE NUMBER, ID row-104-100
      if (tableData.table_number >= 132 && tableData.table_number <= 133) {
        createTable(tableData, group11_tables, tier_color, currentDay);
      }

      //### GROUP 3 TABLE  WITH 100 TO 104 TABLE NUMBER, ID row-104-100
      if (tableData.table_number >= 210 && tableData.table_number <= 212) {
        createTable(tableData, group12_tables, tier_color, currentDay);
      }

      //### GROUP 3 TABLE  WITH 100 TO 104 TABLE NUMBER, ID row-104-100
      if (tableData.table_number >= 220 && tableData.table_number <= 222) {
        createTable(tableData, group13_tables, tier_color, currentDay);
      }

      //### GROUP 3 TABLE  WITH 100 TO 104 TABLE NUMBER, ID row-104-100
      if (tableData.table_number == 230) {
        createTable(tableData, group14_tables, tier_color, currentDay);
      }

      //### GROUP 3 TABLE  WITH 100 TO 104 TABLE NUMBER, ID row-104-100
      if (tableData.table_number >= 504 && tableData.table_number <= 506) {
        createTable(tableData, group15_tables, tier_color, currentDay);
      }

      //### GROUP 3 TABLE  WITH 100 TO 104 TABLE NUMBER, ID row-104-100
      if (tableData.table_number >= 500 && tableData.table_number <= 501) {
        createTable(tableData, group16_tables, tier_color, currentDay);
      }

      //### GROUP 3 TABLE  WITH 100 TO 104 TABLE NUMBER, ID row-104-100
      if (tableData.table_number >= 502 && tableData.table_number <= 503) {
        createTable(tableData, group17_tables, tier_color, currentDay);
      }

      //### GROUP 3 TABLE  WITH 100 TO 104 TABLE NUMBER, ID row-104-100
      if (tableData.table_number == 317) {
        createTable(tableData, group18_tables, tier_color, currentDay);
      }

      //### GROUP 3 TABLE  WITH 100 TO 104 TABLE NUMBER, ID row-104-100
      if (tableData.table_number >= 601 && tableData.table_number <= 603) {
        createTable(tableData, group19_tables, tier_color, currentDay);
      }

      //### GROUP 3 TABLE  WITH 100 TO 104 TABLE NUMBER, ID row-104-100
      if (tableData.table_number >= 315 && tableData.table_number <= 316) {
        createTable(tableData, group20_tables, tier_color, currentDay);
      }

      //### GROUP 3 TABLE  WITH 100 TO 104 TABLE NUMBER, ID row-104-100
      if (tableData.table_number >= 300 && tableData.table_number <= 303) {
        createTable(tableData, group21_tables, tier_color, currentDay);
      }

      //### GROUP 3 TABLE  WITH 100 TO 104 TABLE NUMBER, ID row-104-100
      if (tableData.table_number >= 400 && tableData.table_number <= 403) {
        createTable(tableData, group22_tables, tier_color, currentDay);
      }

      //### GROUP 4 TABLE  WITH 305 TO 315 TABLE NUMBER, ID row-304-314
      if (tableData.table_number >= 304 && tableData.table_number <= 314) {
        createTable(tableData, mezzanine_group1_tables, tier_color, currentDay);
      }
    });
  }
  //### CREATE TABLES FUNCTION WITH CHOOSE SEAT NUMBER
  function createTable(data, tableGroup, color, currentDay) {
    if (data.price) {
      // console.log("Current Day" + currentDay);
      if (currentDay >= 1 && currentDay <= 3) {
        // console.log("Non-booking day: No tables created");
        return; // Exit the function if it's an off day
      }

      const createCol = document.createElement("div");

      createCol.classList.add("table-reserve");
      // createCol.style.backgroundColor = color;
      createCol.innerHTML = `<div class="input-container"><div class="card text-dark fw-bold text-center" style="background-color:${color}">$${data.price}
  <small style="font-size:10px;">${data.table_number}</small><small  style="font-size:10px;">${data.type}</small></div>
  </div>`;

      tableGroup.appendChild(createCol);

      const maxSeat = data.max_seat_requirment;

      for (let i = 1; i <= maxSeat; i++) {
        const inputCheckbox = document.createElement("input");
        inputCheckbox.setAttribute("type", "checkbox");
        inputCheckbox.setAttribute(
          "id",
          `seat_number_${data.table_number}_${i}`
        );

        timeSlotWrapper.appendChild(inputCheckbox);

        // Assign the table ID

        const table_id = `seat_number_${data.table_number}_${i}`;

        const getTimeSlot = document.querySelectorAll(".show-times");
        // console.log("Fix booked table for location");

        // Function to update the selected time slot and call bookedTableData
        function updateTimeSlot(timeSlot) {
          data.time_Id = timeSlot.id;
          // console.log(timeSlot.id + " Data time id");
          bookedTableData();
          scrollContentCenter();
        }

        // Loop through each time slot
        getTimeSlot.forEach((gettimeSlot) => {
          // ✅ If already checked by default, process it immediately
          if (gettimeSlot.checked) {
            console.log(gettimeSlot.id + " Time slot checked get id");
            updateTimeSlot(gettimeSlot);
          }

          // ✅ Add event listener to detect user changes
          gettimeSlot.addEventListener("change", function () {
            //  ✅ Ensure that all checked time slots update correctly
            getTimeSlot.forEach((slot) => {
              if (slot.checked) {
                updateTimeSlot(slot);
              }
            });
          });
        });

        function bookedTableData() {
          const traceBookedTable = `${table_id}__${data.location}__${bookingDate}__${data.time_Id}`;

          const inputCheckbox = document.getElementById(table_id);

          if (BookedTableSet.has(traceBookedTable)) {
            console.log(traceBookedTable + "trace booked table");

            inputCheckbox.style.border = "Solid 4px red";
            inputCheckbox.checked = true;
            inputCheckbox.setAttribute("disabled", true);
          } else {
            inputCheckbox.style.border = "0";
            inputCheckbox.checked = false;
            inputCheckbox.removeAttribute("disabled");
          }
        }

        //  console.log("Is it is in reservatoin visit to conrol???");

        // console.log(data);

        // Create label element
        const label = document.createElement("label");
        label.setAttribute("for", table_id); // Associate with checkbox using the same id
        //  label.textContent = `Seat ${i}`; // Add text content for the label

        // Create table image and insert in label

        // const tableImg = document.createElement("img");

        // tableImg.src = "/assets/Bar_Chairs_Back_Final_1x.webp";
        // tableImg.className = "table";

        // label.appendChild(tableImg);

        // function checkedImg(id) {
        //   const labelId = document.querySelector(`label[for="${id}"]`);

        //   const changeCheckedImg = labelId.querySelectorAll("img");

        //   changeCheckedImg[0].setAttribute(
        //     "src",
        //     "/assets/Bar_Chairs_Back_Final.webp"
        //   );
        // }

        /* remove commnet when need to back multple reservation
       
       if (
          selectedCheckboxes[table_id] &&
          selectedCheckboxes[table_id].includes(i)
        ) {
          inputCheckbox.checked = true;
        }

        */

        ResetTables();

        inputCheckbox.setAttribute("name", "selected_table");
        inputCheckbox.setAttribute("class", "form-check-input");

        inputCheckbox.addEventListener("change", function () {
          // change checked seat image

          // if (this.checked) {
          //   checkedImg(this.id);
          // }
          //### GET SLOT TIME

          let slotTime;
          let slotTimeID;

          getTimeSlot.forEach((slot) => {
            if (slot.checked) {
              console.log("slot are checked");

              slotTime = slot.value;
              slotTimeID = slot.id;
            }
          });
          //END
          //### IF CHECKED REMAIN CHECKED OPTION

          if (this.checked) {
            console.log("checkbox checked");

            if (!selectedCheckboxes[table_id]) {
              selectedCheckboxes[table_id] = [];
            }

            selectedCheckboxes[table_id].push(i);

            //END

            total += data.price; // Add the table price when checked

            console.log("total price " + currentEventPrice);

            console.log(currentDay + "current selected date");

            let showName;

            if (showDays.includes(currentDay)) {
              showName = showDays.indexOf(currentDay);
              currentShowDay = daysOfWeek[currentDay];
              console.log(showName + "current Day");
            }

            //### ADD DATA TO ARRAY
            reservationData.push({
              show_table_id: data.id,
              show_name: showDisplayNameArray[showName],
              show_day: currentShowDay,
              table_id: table_id,
              table_number: data.table_number,
              table_price: Number(data.price),
              table_location: data.location,
              table_booking_date: bookingDate,
              show_start_at: showStartSpan.textContent,
              time_slot: slotTime,
              time_Id: slotTimeID,
            });

            updateTableDisplay(this);

            //END
          } else {
            const index = selectedCheckboxes[table_id].indexOf(i);
            if (index > -1) {
              selectedCheckboxes[table_id].splice(index, 1);
              total -= data.price;
            }
            total -= data.price; // Subtract the table price when unchecked
            //

            //### FIND TABLE NUMBER (INDEX) OF THE ELEMENT AND REMOVE IT.
            const removeBookingIndex = reservationData.findIndex(
              (reservation) =>
                reservation.table_id === table_id &&
                reservation.table_booking_date === bookingDate
            );

            if (removeBookingIndex !== -1) {
              reservationData.splice(removeBookingIndex, 1);
              console.log("Removed Reservation:", reservationData);
              cartCount.textContent = reservationData.length;

              updateTableDisplay();
            }
          }

          function updateTableDisplay(isTimeSelected) {
            //   checkout.innerHTML = "";

            // Create a map to track unique table_id + time_slot combinations
            const uniqueReservations = new Map();

            // Process reservations to keep only the latest entry for duplicate table_id + time_slot
            reservationData.forEach((data, index) => {
              if (data.time_slot === undefined) {
                alert("Please select time slot first");
                isTimeSelected.checked = false;
                reservationData.splice(index, 1);
                return;
              }

              const key = `${data.table_id}_${data.time_slot}`;
              uniqueReservations.set(key, { data, index });
            });

            // Clear existing reservationData array

            // Clear existing content in the checkout element
            ResetTables();

            // Clear reservationData before rebuilding

            // Rebuild reservationData and display with unique entries
            uniqueReservations.forEach(({ data, index }) => {
              // Add back to reservationData
              reservationData.push(data);

              // Show/hide customer information

              // Create a new reservation item
              const reservationItem = document.createElement("div");
              reservationItem.classList.add("reservation-item");
              reservationItem.setAttribute("data-table-id", data.table_id); // Add a data attribute for easy identification
              reservationItem.innerHTML = `
    <div class="remove" id="${data.table_id}" data-date="${data.table_booking_date}" data-time="${data.time_slot}"><i class="fa-solid fa-trash-can"></i></div>
    <p><strong>Show Day</strong>: ${data.show_day}</p>
    <p><strong>Date</strong>: ${data.table_booking_date}</p>
    <p><strong>Seating Time</strong>: ${data.time_slot}</p>
    <p><strong>${data.table_location}</strong>: $${data.table_price}</p>
    <p>For dev use only:</p>
    <p><strong>Table</strong>: ${data.table_id}</p>
  `;

              cartCount.textContent = reservationData.length;

              console.log(reservationData.length + "REservaton data lentth");

              // Update total number of selected people for Dinner
              currentSelectedDinnerPeople = reservationData.length;

              customerInformation.style.display =
                reservationData.length == 0 ? "none" : "block";

              dinnerMenu(currentDay);

              activeToggle(true);

              // if (reservationData.length < 0) {
              //   $("#menuContainer").hide();
              // } else {
              //   $("#menuContainer").show();
              // }

              // Append the reservation item to the checkout element
              checkout.appendChild(reservationItem);

              // Add event listener to the remove button
              const removeButton = reservationItem.querySelector(".remove");
              removeButton.addEventListener("click", function () {
                // Remove the reservation item from the DOM
                checkout.removeChild(reservationItem);

                // Remove the item from reservationData array
                const indexToRemove = reservationData.findIndex(
                  (item) =>
                    item.table_id === data.table_id &&
                    item.table_booking_date == data.table_booking_date &&
                    item.time_slot == data.time_slot
                );
                if (indexToRemove !== -1) {
                  document.getElementById(this.id).checked = false;
                  reservationData.splice(indexToRemove, 1);
                  cartCount.textContent = reservationData.length;
                }

                // Optional: Update the UI or perform additional cleanup
                console.log(
                  `Removed reservation with table_id: ${data.table_id}`
                );
              });
            });
          }
        });

        // inputCheckbox.appendChild(document.createTextNode(i));
        const inputWrapper = tableGroup.querySelectorAll(".input-container");

        inputWrapper.forEach((input) => {
          input.appendChild(inputCheckbox);
          input.appendChild(label);
        });

        if (i % 2 === 0) {
          inputWrapper.forEach((input) => {
            input.parentNode.insertBefore(inputCheckbox, input);
            input.parentNode.insertBefore(label, input);
          });
        } else {
          inputWrapper.forEach((input) => {
            input.parentNode.insertBefore(inputCheckbox, input.nextSibling);
            input.parentNode.insertBefore(label, input.nextSibling);
          });
        }

        // if (i % 2 === 0) {
        //   console.log(i + " Even");
        //   inputCheckbox.style.border = "1px solid #7d0101";
        // }
      }
    }
  }
  //END

  function resetData(bookingSelectedDate) {
    console.log(bookingSelectedDate + " RESET Booking DATE");

    // First, uncheck all checkboxes
    const selectedSeatReset = document.querySelectorAll(".form-check-input");
    selectedSeatReset.forEach((reset) => {
      reset.checked = false;
    });

    // Then, check boxes that match reservations for the selected date
    reservationData.forEach((data) => {
      if (data.table_booking_date.includes(bookingSelectedDate)) {
        const checkbox = document.querySelector(`#${data.table_id}`);
        if (checkbox) {
          checkbox.checked = true;
          console.log(`Checkbox ${checkbox.id} checked`);
        }
      }
    });

    //Reset time slot

    // First unchked all time slot

    // First, uncheck all checkboxes
    const timeSlotReset = document.querySelectorAll(".show-times");
    timeSlotReset.forEach((reset) => {
      reset.checked = false;
    });
    reservationData.forEach((data) => {
      if (data.table_booking_date.includes(bookingSelectedDate)) {
        const checkbox = document.querySelector(`#${data.time_Id}`);
        // console.log(checkbox.id + "time slot");
        if (checkbox) {
          checkbox.checked = true;
          console.log(`Checkbox ${checkbox.id} checked`);
        }
      }
    });

    //reset reservation data to default
    reservationData.length = 0;
    checkout.innerHTML = "";
  }
  //END

  //### TRIGGER THE RESERVATION TABLES FUNCTION WITH CURRENT DAY
  if (currentDay == showDays[currentDay])
    ReservationTables(showDays[currentDay]);
  //END

  //# DATE PICKER FUNCTION
  $(function () {
    const maxDay = new Date();

    // Initialize the datepicker
    $("#datepicker-container").datepicker({
      minDate: maxDay,
      //onload
      beforeShowDay: function (date) {
        /*  
      
      ###GET TODAY DATE IF NEED

      var today = new Date();
 
      var currentDayFormatted = $.datepicker.formatDate("mm/dd/yy", date);

      var todayFormatted = $.datepicker.formatDate("mm/dd/yy", today);

      if (todayFormatted === currentDayFormatted) {
        console.log(todayFormatted);
      }*/

        // console.log("bookingDate" + bookingDate);
        var formattedDate = $.datepicker.formatDate("mm/dd/yy", date);

        let specialShow = newShows.find((show) => show.show_id === showId);

        if (specialShow) {
          // Enable only the dates in showDates
          if (specialShow.showDates.includes(formattedDate)) {
            return [true];
          }
          return [false]; // Disable all other dates
        }

        if (showId === "bordello") {
          // If the day is Thursday (getDay() === 4), return [true] to make it active
          if (date.getDay() === 4) {
            currentDay = 4;
            return [true]; // Enable Thursday
          }
          return [false]; // Disable other days
        } else if (showId === "opus" || showId === "wicked-cabaret") {
          currentDay = 5;
          // If the day is Thursday (getDay() === 4), return [true] to make it active
          if (date.getDay() === 5 || date.getDay() === 6) {
            return [true]; // Enable Thursday
          }
          return [false]; // Disable other days
        } else if (showId === "drag_brunch") {
          currentDay = 0;
          // If the day is Thursday (getDay() === 4), return [true] to make it active
          if (date.getDay() === 0) {
            return [true]; // Enable Thursday
          }
          return [false]; // Disable other days
        }

        var day = date.getDay();

        // Disable Monday (1), Tuesday (2), Wednesday (3)
        if (day == 1 || day == 2 || day == 3) {
          return [false]; // Disable these days
        }

        return [true];
      },
      beforeShow: function (input, inst) {
        let specialShow = newShows.find((show) => show.show_id === showId);

        if (specialShow && specialShow.showDates.length > 0) {
          let firstAvailableDate = specialShow.showDates[0];

          // Set the datepicker to the first available date
          $(this).datepicker("setDate", firstAvailableDate);

          // Optional: Move the datepicker to the first available date
          $(this).datepicker("option", "defaultDate", firstAvailableDate);
        }
      },
      onSelect: function (dateText, inst) {
        //  result.innerHTML = "";

        const selectedDate = new Date(dateText);
        // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

        bookingDate = $.datepicker.formatDate("mm/dd/yy", selectedDate);
        //  console.log("Formatted Date:", bookingDate);

        const dayOfWeek = selectedDate.getDay();
        // Get the day of the month (1 to 31)
        const dayOfMonth = selectedDate.getDate();
        // Get the full name of the day (e.g., Monday, Tuesday)
        const dayName = selectedDate.toLocaleString("default", {
          weekday: "long",
        });
        // Log the results
        //   console.log("Day of the week (0-6):", dayOfWeek); // Sunday = 0, Monday = 1, etc.
        //  console.log("Day of the month (1-31):", dayOfMonth);
        //   console.log("Day name (e.g., 'Monday'):", dayName);
        currentDay = dayOfWeek;

        selectedCalDate = selectedDate;

        dinnerMenu(dayOfWeek);

        //### TRIGGER THE RESERVATION TABLES FUNCTION

        //displayShowName.indexOf(showDays);

        showInfoDisplay = true;

        console.log(showInfoDisplay + "Show info");

        ReservationTables(currentDay);

        resetData(bookingDate);
        scrollContentCenter();
        //END
      },
    });
  });

  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //### DINNER STUFF HERE
  //

  $("#menuContainer").hide();

  let dinnerOptionsLogicCondition = false;

  const dinnerPrice = 35;
  const dinnerTax = 0.08; //8%
  const gratuity = 0.2; // 20%

  let todaySelectedDate = new Date();

  console.log(todaySelectedDate + "Today date");

  let SelectedMenuCount = 0;
  let course_1 = 0;
  let course_2 = 0;
  let course_3 = 0;
  let course = [];
  let courseIngredients = [];
  let quantity = [];
  let selectedCalDate;

  let currentSelectedDinnerPeople = 1;

  const prixFixeDinnerMenuOption = document.querySelector(
    "#prix-fixe-dinner-menu-option"
  );

  function calculateDinner(currentPeopleForDinner) {
    console.log(currentPeopleForDinner);
    calculateDinnerPrice = dinnerPrice * currentPeopleForDinner;
    calculateDinnerTax = calculateDinnerPrice * dinnerTax;
    calculateGratuity = calculateDinnerPrice * gratuity;

    // Rounding the results to 2 decimal places
    calculateDinnerPrice = calculateDinnerPrice.toFixed(2);
    calculateDinnerTax = calculateDinnerTax.toFixed(2);
    calculateGratuity = calculateGratuity.toFixed(2);

    console.log(calculateDinnerPrice);
    console.log(calculateDinnerTax);
    console.log(calculateGratuity);

    totalDinnerPrice = (
      parseFloat(calculateDinnerPrice) +
      parseFloat(calculateDinnerTax) +
      parseFloat(calculateGratuity)
    ).toFixed(2);
    console.log("Total Dinner Price" + totalDinnerPrice);
  }

  // function dinnerMenu();
  // dinner options menu logic
  function dinnerOptionsLogic() {
    // select option auto when change qty
    const menuQuantity = document.querySelectorAll(".menu-quantity");

    menuHeading = currentEventName + " Menu";

    // const currentPeople = Number(this.value);
    // const selectedPeople = Number(currentSeatSelected);

    const ingredientsCheckbox = document.querySelectorAll(".ingredients-title");

    menuQuantity.forEach((autoselect, index) => {
      // console.log(currentSeatSelected + "Current Seat Selection");

      autoselect.addEventListener("change", function () {
        console.log("Current Seat Selected +" + currentSeatSelected);

        //console.log(CourseName);

        // DINNER OPTION MENU LOGIC

        const CourseName = this.getAttribute("data-coursename");
        if (CourseName == "first-course") {
          SelectedMenuCount = 0;

          menuQuantity.forEach((autoselect) => {
            if (autoselect.getAttribute("data-coursename") === "first-course") {
              SelectedMenuCount += parseInt(autoselect.value);
            }
          });

          if (SelectedMenuCount > currentSelectedDinnerPeople) {
            ingredientsCheckbox[index].checked = false;
            this.value = 0;
            course_1 = 0;

            alert(
              "Please choose the quantity of tickets bought for each course."
            );
          } else if (SelectedMenuCount < currentSelectedDinnerPeople) {
            course_1 = 0;
            ingredientsCheckbox[index].checked = true;
          } else {
            ingredientsCheckbox[index].checked = true;
            course_1 = 1;
          }

          if (this.value == 0) {
            ingredientsCheckbox[index].checked = false;
          }
        } else if (CourseName == "second-course") {
          SelectedMenuCount = 0;

          menuQuantity.forEach((autoselect) => {
            if (
              autoselect.getAttribute("data-coursename") === "second-course"
            ) {
              SelectedMenuCount += parseInt(autoselect.value);
            }
          });

          if (SelectedMenuCount > currentSelectedDinnerPeople) {
            ingredientsCheckbox[index].checked = false;
            this.value = 0;
            course_2 = 0;
            alert(
              "Please choose the quantity of tickets bought for each course."
            );
          } else if (SelectedMenuCount < currentSelectedDinnerPeople) {
            course_2 = 0;
            ingredientsCheckbox[index].checked = true;
          } else {
            ingredientsCheckbox[index].checked = true;
            course_2 = 1;
          }

          if (this.value == 0) {
            ingredientsCheckbox[index].checked = false;
          }
        } else if (CourseName == "third-course") {
          SelectedMenuCount = 0;

          menuQuantity.forEach((autoselect) => {
            if (autoselect.getAttribute("data-coursename") === "third-course") {
              SelectedMenuCount += parseInt(autoselect.value);
            }
          });

          if (SelectedMenuCount > currentSelectedDinnerPeople) {
            ingredientsCheckbox[index].checked = false;
            this.value = 0;
            course_3 = 0;

            alert(
              "Please choose the quantity of tickets bought for each course."
            );
          } else if (SelectedMenuCount < currentSelectedDinnerPeople) {
            course_3 = 0;
            ingredientsCheckbox[index].checked = true;
          } else {
            ingredientsCheckbox[index].checked = true;
            course_3 = 1;
          }

          if (this.value == 0) {
            ingredientsCheckbox[index].checked = false;
          }
        }
        //END DINNER COURSE OPTIONS
      });
    });
  }

  // function create radio button
  function createRadioButtons(name, options, containerId) {
    // Create radio buttons for each option
    options.forEach((option, index) => {
      // Create main div container
      const formGroup = document.createElement("div");
      formGroup.className = "form-group d-flex flex-start";

      // Create radio input
      const radioInput = document.createElement("input");
      radioInput.className = "form-check-input cbx hidden";
      radioInput.type = "radio";
      radioInput.name = name;
      radioInput.id = `${name}-${option.toLowerCase()}`; // e.g., celebrating-yes
      radioInput.value = option;
      if (index == 0 && option == "Yes" && reservationData.length > 0) {
        radioInput.checked = true;

        validateMenuItems = true;
        dinnerOptionsLogicCondition = true;

        console.log("Dinner is ready!");
        $("#menuContainer").show();

        // calculate dinner price

        calculateDinner(currentSelectedDinnerPeople);
        if (dinnerOptionsLogicCondition === true) {
          dinnerOptionsLogic();
        }
      }
      // Change to use handleDinnerChoice instead of handleCelebratingChoice
      radioInput.addEventListener("change", function () {
        if (this.checked) {
          handleDinnerChoice(this.value); // Make sure this matches your function name
        }
      });

      // Create label
      const label = document.createElement("label");
      label.className = "form-check-label lbl mr-1";
      label.setAttribute("for", `${name}-${option.toLowerCase()}`);

      // Create span for text
      const span = document.createElement("span");
      span.textContent = ` ${option}`;

      // Append all elements
      formGroup.appendChild(radioInput);
      formGroup.appendChild(label);
      formGroup.appendChild(span);

      // Append to container
      containerId.appendChild(formGroup);
    });
  }

  // Define the handler function
  function handleDinnerChoice(value) {
    dinnerOptionsLogicCondition = false;
    // Changed function name to match

    if (value === "Yes" && reservationData.length > 0) {
      validateMenuItems = true;
      dinnerOptionsLogicCondition = true;

      console.log("Dinner is ready!");
      $("#menuContainer").show();

      // calculate dinner price

      calculateDinner(currentSelectedDinnerPeople);
    } else {
      validateMenuItems = false;
      dinnerOptionsLogicCondition = false;
      calculateDinner(0);

      console.log("No dinner selected!");
      $("#menuContainer").hide();
    }
    console.log(dinnerOptionsLogicCondition + " - LOGIC FUNCTION");
    if (dinnerOptionsLogicCondition === true) {
      dinnerOptionsLogic();
    }
  }

  function dinnerMenu(day) {
    console.log(validateMenuItems + "Validation is conflict");

    prixFixeDinnerMenuOption.innerHTML = "";
    if (day >= 4 && day <= 6 && reservationData.length > 0) {
      console.log(reservationData.lengt);
      console.log(day + "YES DINNER MENU");

      // Create the h2 element for dinner title
      const dinnerHeading = document.createElement("p");

      dinnerHeading.classList.add("mt-5");

      dinnerHeading.textContent = `Indulge in Fabrika's $35 3-course menu as an add-on for online orders. Select "yes" to continue and enjoy a delicious dining experience!`;

      prixFixeDinnerMenuOption.style.display = "block";
      prixFixeDinnerMenuOption.appendChild(dinnerHeading);

      // create option to choose dinner yes or no
      createRadioButtons(
        "dinner-option",
        ["Yes", "No"],
        prixFixeDinnerMenuOption
      );

      validateMenuItems = true;

      // disable dinner
      disabledDinner();
    } else {
      // dinner not available
      dinnerNotAvailable();
    }
  }

  //disabled dinner
  function disabledDinner() {
    // Hide dinner before 24 hours
    console.log(selectedCalDate + "Selected Date");
    console.log(todaySelectedDate + "Current Date fsdfdsfdsfdsfds");

    // Add 24 hours to current date for food delivery cutoff
    const cutoffDate = new Date(todaySelectedDate);

    console.log(cutoffDate + "Today cuto off date");
    cutoffDate.setHours(12);
    //todaySelectedDate.getHours()
    // Check if selected date is after the cutoff
    const isFoodDeliveryAvailable = selectedCalDate >= cutoffDate;

    if (isFoodDeliveryAvailable) {
      $("#menuContainer").show();

      console.log("Food Delivery Avaiable on this date");
    } else {
      dinnerNotAvailable();
    }
  }

  function dinnerNotAvailable() {
    $("#menuContainer").hide();
    validateMenuItems = false;
    calculateDinner(0);
    prixFixeDinnerMenuOption.innerHTML = "";
    prixFixeDinnerMenuOption.style.display = "none";
    dinnerOptionsLogicCondition = false;
    console.log("Food Delivery Not Available");
  }

  calculateDinner(currentSelectedDinnerPeople);

  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅
  //✅ STRIPE PAYMENT AND DATA

  // Stripe code here

  let testMode = "on"; // "on" or "off"
  const publicKeyTest = "pk_test_02LVg7SP0rgbdV3wcR1XqkoK00SNxG9bJu";
  const publicKeyLive = "pk_live_DZ3iuEkfi0crkfodvUT9t1J500u58eDiQL";

  let stripe =
    testMode === "on" ? Stripe(publicKeyTest) : Stripe(publicKeyLive);

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

    console.log("Show Days" + showDays);
    console.log("current  Days" + currentDay);

    COUPON_CODE_APPLY = VALID_COUPON_CODE[showDays.indexOf(currentDay)];

    console.log("VALID_COUPON_CODE Coupon code is upper " + VALID_COUPON_CODE);
    console.log("coupon code day of week " + showDays.indexOf(currentDay));

    if (COUPON_CODE) {
      getCode = document.querySelector("#coupon-code-input");

      console.log("Coupon code is " + COUPON_CODE);
      console.log("Valid Coupon code is " + VALID_COUPON_CODE);
      console.log("Input Coupon code is " + getCode.value);

      if (COUPON_CODE_APPLY === getCode.value) {
        showCodeText = true;
      }
      calculateTotal(getCode.value, showDays.indexOf(currentDay));
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

    let getSpecialSeatMessage = document.getElementById("specialSeating");
    customer_email = document.getElementById("cart_customerEmail");
    customer_Phone = document.getElementById("cart_customerPhone");

    subscribeCheckbox = document.getElementById("subscribeCheckbox");

    // get totals of all array data

    reservationData.forEach((data) => {
      currentEventPrice += Number(data.table_price);
      console.log(currentEventPrice);
    });

    console.log(currentEventPrice + "Total price for tables");

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

      //Get reservation loop for tickets here

      console.log(reservationData + " Reservation Data here after submit");

      reservationData.forEach((ticket) => {
        const ticketLayout = document.createElement("div");
        ticketLayout.classList.add("ticket-layout");

        let tableNumber = document.createElement("p");
        tableNumber.className = "d-none";
        tableNumber.innerHTML = `<strong>Table Number:</strong> ${ticket.table_id}`;

        let fabrikaShowID = document.createElement("p");
        tableNumber.className = "d-none";
        fabrikaShowID.innerHTML = `<strong>Table ID:</strong> ${ticket.show_table_id}`;

        let fabrikaShowName = document.createElement("p");
        fabrikaShowName.innerHTML = `<strong>Show Name:</strong> ${ticket.show_name}`;

        let currentOnlineBookingDate = document.createElement("p");
        currentOnlineBookingDate.innerHTML = `<strong>Booking Date:</strong> ${currentBookingDate}`;

        let selectedShowDate = document.createElement("p");
        selectedShowDate.innerHTML = `<strong>Show Date:</strong> ${ticket.table_booking_date}`;

        let selectedShowDay = document.createElement("p");
        selectedShowDay.innerHTML = `<strong>Show Day:</strong> ${ticket.show_day}`;

        let currentShowBeigning = document.createElement("p");
        currentShowBeigning.innerHTML = `<strong>Show Time:</strong> ${ticket.show_start_at}`;

        let selectedShowTime = document.createElement("p");
        selectedShowTime.innerHTML = `<strong>Seating Time:</strong> ${ticket.time_slot}`;

        let selectedEventName = document.createElement("p");
        selectedEventName.innerHTML = `<strong>Event Name:</strong> ${ticket.table_location}`;

        let ticketCost = document.createElement("p");
        ticketCost.innerHTML = `<strong>Ticket Price:</strong> $${ticket.table_price.toFixed(
          2
        )}`;

        ticketLayout.appendChild(tableNumber);

        ticketLayout.appendChild(fabrikaShowID);
        ticketLayout.appendChild(fabrikaShowName);
        ticketLayout.appendChild(currentOnlineBookingDate);
        ticketLayout.appendChild(selectedShowDate);
        ticketLayout.appendChild(selectedShowDay);
        ticketLayout.appendChild(currentShowBeigning);
        ticketLayout.appendChild(selectedShowTime);
        ticketLayout.appendChild(selectedEventName);
        ticketLayout.appendChild(ticketCost);

        form.appendChild(ticketLayout);
      });

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

      // code this if couch it will show couch instad of seat.

      let selectedSeatSelected = document.createElement("p");
      selectedSeatSelected.innerHTML = `<strong>Number of Seats:</strong> ${reservationData.length}`;
      form.appendChild(selectedSeatSelected);

      // adtive this when couch is activated.
      let selectedSeatPeople = document.createElement("p");
      selectedSeatPeople.innerHTML = `<strong>Number of People Attending:</strong> ${currentSeatPeople}`;
      form.appendChild(selectedSeatPeople);

      let specialSeatingMessage = document.createElement("p");
      specialSeatingMessage.innerHTML = `<strong>Special Seating Message:</strong> ${getSpecialSeatMessage.value}`;
      form.appendChild(specialSeatingMessage);

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
    formData("show_date", bookingDate);

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
});
