export const DinnerMenu = [
  {
    "love-inferno-ticket": {
      menu: {
        "Fabrika Easter Dinner Menu": [
          "Three Course Menu",
          "(Add quantity to the quantity box. The radio button will highlight when completed.)",
        ],
        "First Course": [
          { course_name: "Appetizers (select one)" },
          {
            title: "Curry Shrimp Caesar",
            ingredients:
              "Grilled Shrimp, Romaine, Curry Caesar Dressing, Croutons, Parmesan Cheese, Cherry Tomatoes",
          },
          {
            title: "Greek Salad",
            ingredients:
              "Cucumbers, Red Onion, Feta Cheese, Tomatoes, Kalamata Olives, House Vinaigrette",
          },
          {
            title: "Arancini",
            ingredients:
              "Fried Parmesan Arancini served with a Creamy Cauliflower Sauce",
          },
          {
            title: "Fried Queso",
            ingredients: "Fried Queso Manchego Cheese Served with Lime Crema",
          },
        ],
        "Second Course": [
          { course_name: "Main Course (select one)" },
          {
            title: "Hanger Steak",
            ingredients:
              "Juicy hanger steak, marinated in a blend of Worcestershire sauce, maple syrup, and soy sauce. Served with fingerling potato, broccolini, and a comforting ladle of savory beef gravy.",
          },
          {
            title: "Branzino",
            ingredients:
              "Fresh branzino delicately seasoned and served with creamy parmesan couscous, grilled asparagus, and a velvety miso-based sauce. (PSC)",
          },
          {
            title: "Cauliflower Steak",
            ingredients:
              "Thick-cut cauliflower steak grilled to perfection and served with a parmesan sauce and miso cream, with a teriyaki glaze.",
          },
        ],
        "Third Course": [
          { course_name: "Dessert (select one)" },
          {
            title: "Tiramisu",
            ingredients:
              "Layers of coffee-soaked ladyfingers and creamy mascarpone, finished with a hint of cognac. An irresistible Italian Classic that’ll whisk you away to coffee heaven.",
          },
          {
            title: "Matcha Ice Cream",
            ingredients:
              "Homemade Matcha ice Cream served with Wasabi Meringue",
          },
        ],
      },
    },
    default: {
      menu: {
        "Fabrika Easter Dinner Menu": [
          "Three Course Menu",
          "(Add quantity to the quantity box. The radio button will highlight when completed.)",
        ],
        "First Course": [
          { course_name: "Select one per person" },
          {
            title: "Curry Shrimp Caesar",
            ingredients:
              "Grilled Shrimp, Romaine, Curry Caesar Dressing, Croutons, Parmesan Cheese, Cherry Tomatoes",
          },
          {
            title: "Greek Salad",
            ingredients:
              "Cucumbers, Red Onion, Feta Cheese, Tomatoes, Kalamata Olives, House Vinaigrette",
          },
        ],
        "Second Course": [
          { course_name: "Appetizers (select one)" },
          {
            title: "Arancini",
            ingredients:
              "Fried Parmesan Arancini served with a Creamy Cauliflower Sauce",
          },
          {
            title: "Fried Queso",
            ingredients: "Fried Queso Manchego Cheese Served with Lime Crema",
          },
        ],
        "Third Course": [
          { course_name: "Main Course (select one)" },
          {
            title: "Hanger Steak",
            ingredients:
              "Juicy hanger steak, marinated in a blend of Worcestershire sauce, maple syrup, and soy sauce. Served with fingerling potato, broccolini, and a comforting ladle of savory beef gravy.",
          },
          {
            title: "Branzino",
            ingredients:
              "Fresh branzino delicately seasoned and served with creamy parmesan couscous, grilled asparagus, and a velvety miso-based sauce. (PSC)",
          },
          {
            title: "Cauliflower Steak",
            ingredients:
              "Thick-cut cauliflower steak grilled to perfection and served with a parmesan sauce and miso cream, with a teriyaki glaze.",
          },
        ],
      },
    },
  },
];

const menuContainer = document.getElementById("menuContainer");

// Choose the correct menu object (update this if needed)
const menuKey = "love-inferno-ticket"; // or "default" based on your requirement
const menuData = DinnerMenu[0][menuKey].menu; // Access the correct menu structure

// Add menu title
const menuTitle = document.createElement("h2");
menuTitle.textContent = menuData["Fabrika Easter Dinner Menu"][0];
menuContainer.appendChild(menuTitle);

// Add menu description
const menuDescription = document.createElement("p");
menuDescription.innerHTML = `<strong>${menuData["Fabrika Easter Dinner Menu"][1]}</strong>`;
menuContainer.appendChild(menuDescription);

// Iterate over the menu
for (const course_menu in menuData) {
  if (course_menu !== "Fabrika Easter Dinner Menu") {
    const section = document.createElement("section");
    const courseTitle = document.createElement("h3");
    courseTitle.textContent = course_menu;
    section.appendChild(courseTitle);

    menuData[course_menu].forEach((item) => {
      if (item.course_name) {
        const courseName = document.createElement("p");
        courseName.textContent = item.course_name;
        section.appendChild(courseName);
      } else {
        const article = document.createElement("article");

        const div = document.createElement("div");
        div.classList.add("d-flex");

        const titleWrapper = document.createElement("div");
        titleWrapper.classList.add("titleWrapper");

        const input = document.createElement("input");
        input.type = "checkbox";
        input.name = course_menu.toLowerCase().replace(/ /g, "-");
        input.id = item.title.toLowerCase().replace(/ /g, "-");
        input.value = item.title;
        input.classList.add("ingredients-title");

        const span = document.createElement("span");
        span.classList.add("radio-box");

        const label = document.createElement("label");
        label.htmlFor = item.title.toLowerCase().replace(/ /g, "-");
        label.innerHTML = `<p><strong>${item.title}</strong></p>`;

        titleWrapper.appendChild(input);
        titleWrapper.appendChild(span);
        titleWrapper.appendChild(label);
        div.appendChild(titleWrapper);

        const select = document.createElement("select");
        select.classList.add("menu-quantity");
        select.setAttribute(
          "data-coursename",
          course_menu.toLowerCase().replace(/ /g, "-")
        );
        select.name = item.title.toLowerCase().replace(/ /g, "-");

        for (let i = 0; i <= 14; i++) {
          const option = document.createElement("option");
          option.value = i;
          option.textContent = i;
          select.appendChild(option);
        }

        div.appendChild(select);
        article.appendChild(div);

        const ingredients = document.createElement("p");
        ingredients.innerHTML = `<small class="ingredients">${item.ingredients}</small>`;
        article.appendChild(ingredients);

        section.appendChild(article);
      }
    });

    menuContainer.appendChild(section);
  }
}
