//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

var taskInput = document.getElementById("new-task");
var addButton = document.querySelector(".button");
var incompleteTaskHolder = document.querySelector(".incomplete-tasks");
var completedTasksHolder = document.querySelector(".completed-tasks");
console.log("Не судите строго) примеры комитов только потом увидел, но мои не сильно отличаются. Мы тут все учимся, а не гасим плохими оценками) Удачи!");

var createNewTaskElement = function(taskString) {

  var listItem = document.createElement("li");
  listItem.className = "task";
  var checkBox = document.createElement("input");
  checkBox.className = "task__checkbox";
  checkBox.type = "checkbox";
  
  var label = document.createElement("label");
  label.innerText = taskString;
  label.classList.add("task__label", "default-width");

  var editInput = document.createElement("input");
  editInput.type = "text";
  editInput.classList.add("task__input_text", "default-width");

  var editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.classList.add("button", "button_edit");

  var deleteButton = document.createElement("button");
  deleteButton.classList.add("button", "button_delete");

  var deleteButtonImg = document.createElement("img");
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "delete button";
  deleteButtonImg.className = "button__img";
  
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

var addTask = function() {

  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

var editTask = function() {

  console.log("Edit Task...");
  console.log("Change \"edit\" to \"save\"");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector(".task__input_text");
  var label = listItem.querySelector(".task__label");
  var editBtn = listItem.querySelector(".button_edit");
  var containsClass = listItem.classList.contains("task_edit-mode");
  //If class of the parent is .editmode
  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  listItem.classList.toggle("task_edit-mode");
};

var deleteTask = function() {

  console.log("Delete Task...");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

var taskCompleted = function() {

  console.log("Complete Task...");
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function() {

  console.log("Incomplete Task...");
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var ajaxRequest = function() {
  console.log("AJAX Request");
}

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {

  console.log("bind list item events");

  var checkBox = taskListItem.querySelector(".task__checkbox");
  var editButton = taskListItem.querySelector(".button_edit");
  var deleteButton = taskListItem.querySelector(".button_delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don"t get seen until they are in front of a human tester.
//prevent creation of empty tasks.
//Change edit to save when you are in edit mode.