//This function is used to get the input from the user and also pushes the additional values in the localstorage
function userInput() {
  let userValue = document.getElementById("todoUserInput").value;
  if (userValue == "") {
    alert("Please type anything!");
    return;
  }

  let newList = {
    text: userValue,
    isChecked: false,
  };
  create(newList);
  values.push(newList);
  clearInput();
}

//This variable holds the get item method that has the stored values in the localstorage
let values = getItemList();

//This loop continuously runs the create function
for (let todo of values) {
  create(todo);
}

//This function clears the values in the input element
function clearInput() {
  document.getElementById("todoUserInput").value = "";
}

/**
 * In this function two major events are happening one is adding a strike out when the checkbox is clicked
 * and the second one is the result variable holds the values that has the inserted objects and the findIndex method is used to find the index value of
 * the that object and stores it in the eachitem...
 * and we assigning the variable called gettingResult that the values of the result variable. and
 * the condition was added if the objects ischecked is true it turns out false and if it doesn't it turns true.
 */
function checkValueLocalStorage(labelElement, itemList) {
  // console.log(labelElement)
  // console.log(itemList)

  labelElement.classList.toggle("checkvalue");
  let result = values.findIndex(function (eachItem) {
    if (itemList.textContent === eachItem.text) {
      return true;
    } else {
      return false;
    }
  });
  console.log(result);
  let gettingResult = values[result];
  console.log(gettingResult);

  if (gettingResult.isChecked === true) {
    gettingResult.isChecked = false;
  } else {
    gettingResult.isChecked = true;
  }
}

//This function holds the major role this create function iterates the list input and label making process.
function create(hello) {
  let itemContainer = document.getElementById("todoItemsContainer");

  let uniqueID = "todo" + Math.random();

  let itemList = document.createElement("li");
  itemList.id = "list" + Math.random();
  itemList.classList.add("list", "d-flex", "flex-row");
  itemContainer.appendChild(itemList);

  let itemInput = document.createElement("input");
  itemInput.type = "checkbox";
  itemInput.id = uniqueID;
  itemList.appendChild(itemInput);
  itemInput.classList.add("checkbox-input");
  itemInput.onclick = function () {
    checkValueLocalStorage(labelElement, itemList);
  };

  itemDiv = document.createElement("div");
  itemDiv.classList.add("label-container", "d-flex", "flex-row");
  itemList.appendChild(itemDiv);

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", uniqueID);
  labelElement.textContent = hello.text;
  labelElement.classList.add("checkbox-label");
  if (hello.isChecked === true) {
    labelElement.classList.add("checkvalue");
  }
  itemDiv.appendChild(labelElement);

  iconContainer = document.createElement("div");
  iconContainer.classList.add("delete-icon-container", "d-flex", "flex-row");
  itemList.appendChild(iconContainer);

  deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  iconContainer.appendChild(deleteIcon);

  //This function is used to delele the list when the delete icon is clicked and also in the localstorage!
  deleteIcon.onclick = function () {
    itemList.remove();

    let deleteElement = values.findIndex(function (eachItem) {
      console.log(eachItem);
      if (itemInput.id === eachItem) {
        return true;
      } else {
        return false;
      }
    });
    values.splice(deleteElement, 1);
  };
}

//This function is used to getitems from the localstorage and to display when the page reloaded...
function getItemList() {
  let getValue = localStorage.getItem("Tasks");
  let parsedValue = JSON.parse(getValue);
  if (getValue === null) {
    return [];
  } else {
    return parsedValue;
  }
}

//This function is used to store the value entered by the user..
let saveBtn = document.getElementById("saveButton");
saveBtn.onclick = function () {
  localStorage.setItem("Tasks", JSON.stringify(values));
};
