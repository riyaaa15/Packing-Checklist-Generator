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

        itemsBox.innerHTML = "";   // clear old items
        itemsBox.style.display = "block";

        items.forEach(item => {
           const label = document.createElement("label");
            
           label.innerHTML = `
           <input type="checkbox" class="item-check">
           ${item}
           `;
           
           itemsBox.appendChild(label);
        });
        
        let checkBoxes = document.querySelectorAll(".item-check");

        checkBoxes.forEach(box => {
            box.addEventListener("change", () => {

                //color change
                if(box.checked) {
                    box.parentElement.style.color = "#d2c3e3";
                    box.parentElement.style.textDecoration = "line-through";

                } else {
                    box.parentElement.style.color = "#fff";
                    box.parentElement.style.textDecoration = "none";
                }

                let checkedCount = document.querySelectorAll(".item-check:checked").length;
                countText.innerHTML = `You've packed ${checkedCount} out of ${items.length} items.`;
            })
        });

        let addBtn = document.createElement("button");
        addBtn.classList.add("add");
        addBtn.textContent = "Add Item";

        itemsBox.appendChild(addBtn);

        addBtn.addEventListener("click", () => {

            let newTask = itemInput.value.trim();
            itemInput.style.display = "block";
            if(newTask === "") return;

            items.push(newTask);

            const label = document.createElement("label");
            label.innerHTML = `
            <input type="checkbox" class="item-check">
            ${newTask}
            `;

            itemsBox.insertBefore(label, addBtn);
            itemInput.value = "";

            
        })
    });
});

clearBtn.addEventListener("click", () => {
    itemsBox.innerHTML = "";
    itemsBox.style.display = "none";
    countText.innerHTML = "You've packed 0 out of 0 items."
});