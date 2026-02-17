let tripBtns = document.querySelectorAll(".trip-btn");
const itemsBox = document.querySelector(".items-section");
const countText = document.querySelector(".count-text");
const clearBtn = document.querySelector(".clear-btn");
const itemInput = document.querySelector(".item-input");

const tripItems = {
    vacation: ["Clothes", "Toothbrush", "Sunscreen", "Shoes", "Charger"],
    college: ["Notebook", "Laptop", "ID Card", "Water Bottle", "Pen"],
    office: ["Laptop", "Diary", "ID Card", "Lunch Box", "Wallet"]
};

tripBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        const tripType = btn.dataset.trip;
        const items = tripItems[tripType];

        itemsBox.innerHTML = "";
        itemsBox.style.display = "block";

        countText.innerHTML = `You've packed 0 out of ${items.length} items.`;

        items.forEach(item => {
            createItem(item, items);
        });

        let addBtn = document.createElement("button");
        addBtn.classList.add("add");
        addBtn.textContent = "Add Item";
        itemsBox.appendChild(addBtn);

        addBtn.addEventListener("click", () => {

            itemInput.style.display = "block";
            itemInput.focus();

            let newTask = itemInput.value.trim();
            if(newTask === "") return;

            items.push(newTask);

            createItem(newTask, items, addBtn);

            itemInput.value = "";
        });

        itemInput.onkeypress = e => {
            if (e.key === "Enter") addBtn.click();
        };
    });
});

function createItem(text, items, addBtn) {

    const label = document.createElement("label");

    label.innerHTML = `
        <input type="checkbox" class="item-check">
        ${text}
    `;

    if(addBtn){
        itemsBox.insertBefore(label, addBtn);
    }else{
        itemsBox.appendChild(label);
    }

    label.querySelector(".item-check").addEventListener("change", e => {

        if(e.target.checked){
            label.style.color="#d2c3e3";
            label.style.textDecoration="line-through";
        }else{
            label.style.color="#fff";
            label.style.textDecoration="none";
        }

        let checkedCount = document.querySelectorAll(".item-check:checked").length;
        countText.innerHTML = `You've packed ${checkedCount} out of ${items.length} items.`;
    });
}

clearBtn.addEventListener("click", () => {
    itemsBox.innerHTML = "";
    itemsBox.style.display = "none";
    countText.innerHTML = "You've packed 0 out of 0 items.";
    itemInput.style.display = "none";
});
