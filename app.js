let tripBtns = document.querySelectorAll(".trip-btn");
const itemsBox = document.querySelector(".items-section");
const countText = document.querySelector(".count-text");
const clearBtn = document.querySelector(".clear-btn");
const itemInput = document.querySelector(".item-input");

// Predefined items for each trip type
const tripItems = {
    vacation: ["Clothes", "Toothbrush", "Sunscreen", "Shoes", "Charger"],
    college: ["Notebook", "Laptop", "ID Card", "Water Bottle", "Pen"],
    office: ["Laptop", "Diary", "ID Card", "Lunch Box", "Wallet"]
};

// Handle trip selection
tripBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        const tripType = btn.dataset.trip;
        const items = tripItems[tripType];

        // Reset and display items section
        itemsBox.innerHTML = "";
        itemsBox.style.display = "block";

        countText.innerHTML = `You've packed 0 out of ${items.length} items.`;

        // Render items
        items.forEach(item => {
            createItem(item, items);
        });

        // Create add button
        let addBtn = document.createElement("button");
        addBtn.classList.add("add");
        addBtn.textContent = "Add Item";
        itemsBox.appendChild(addBtn);

        // add new item
        addBtn.addEventListener("click", () => {

            itemInput.style.display = "block";
            itemInput.focus();

            let newTask = itemInput.value.trim();
            if(newTask === "") return;

            items.push(newTask);

            createItem(newTask, items, addBtn);

            itemInput.value = "";
        });

        // Allow Enter key to add item
        itemInput.onkeypress = e => {
            if (e.key === "Enter") addBtn.click();
        };
    });
});

// Create and render individual item
function createItem(text, items, addBtn) {

    const label = document.createElement("label");
    label.classList.add("item-row");

    const span = document.createElement("span");
    span.innerHTML = `
        <input type="checkbox" class="item-check">
        ${text}
    `;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");

    label.appendChild(span);
    label.appendChild(deleteBtn);

    // Keep  "Add Item" button at bottom
    if(addBtn){
        itemsBox.insertBefore(label, addBtn);
    }else{
        itemsBox.appendChild(label);
    }

    const checkbox = span.querySelector(".item-check");

    // Update UI and counter on checkbox change
    checkbox.addEventListener("change", () => {

        if(checkbox.checked){
            label.style.color="#d2c3e3";
            label.style.textDecoration="line-through";
        }else{
            label.style.color="#fff";
            label.style.textDecoration="none";
        }

        let checkedCount = document.querySelectorAll(".item-check:checked").length;
        countText.innerHTML = `You've packed ${checkedCount} out of ${items.length} items.`;
    });

    // Remove item from UI and array
    deleteBtn.addEventListener("click", () => {

        const index = items.indexOf(text);
        if(index > -1){
            items.splice(index, 1);
        }

        label.remove();

        let checkedCount = document.querySelectorAll(".item-check:checked").length;
        countText.innerHTML = `You've packed ${checkedCount} out of ${items.length} items.`;
    });
}

// Clear current trip view
clearBtn.addEventListener("click", () => {
    itemsBox.innerHTML = "";
    itemsBox.style.display = "none";
    countText.innerHTML = "You've packed 0 out of 0 items.";
    itemInput.style.display = "none";
});
