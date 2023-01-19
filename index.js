

const clearAll = document.querySelector("#clear-btn");
let addDailyTask = document.getElementById("addDailyTask");

// ======== Event Listener to add the Daily task in Daily task box ===========

addDailyTask.addEventListener("click", function (e) {
  let WriteYourTask = document.getElementById("WriteYourTask");
  let notes = localStorage.getItem("pendingTask");
  if (notes == null) {
    notesObjPending = [];
  } else {
    notesObjPending = JSON.parse(notes);
  }
  let myObj = {
    title: addtitle.value,
    text: WriteYourTask.value,
  };

  notesObjPending.push(myObj);
  localStorage.setItem("pendingTask", JSON.stringify(notesObjPending));
  WriteYourTask.value = "";
  showDailyTask();
});



// ========== Function to show the Daily Task visible in the Daily Task box ==========

function showDailyTask() {
  let notes = localStorage.getItem("pendingTask");
  if (notes == null) {
    notesObjPending = [];
  } else {
    notesObjPending = JSON.parse(notes);
  }
  let html = "";
  notesObjPending.forEach(function (element, index) {
    html += `<div class="noteCard my-2 mx-3 card" style="width: 15rem;justify-content:center;">
                      <div class="card-body">
                          <h5 class="box-title"> ${
                            index + 1 + ") " + element.title
                          }</h5>
                          <p class="card-text"> ${element.text}</p>
                          <button id="${index}" onclick="deletePendingTask(this.id)" class="btn btn-danger">Delete</button>
                          <button id="${index}" onclick="CompleteTask(this.id)" class="btn btn-success">Completed</button>
                      </div>
                  </div>`;
  });
  let notesElm = document.getElementById("pendingTask");
  if (notesObjPending.length != 0) {
    notesElm.innerHTML = html;
  }
  else {
    notesElm.innerHTML = `Write Your Daily task and add it to shown here.`;
  }
}



// ======== Send the Task to Completed Task Box after its completion ===========

function CompleteTask(index){
  let notes = localStorage.getItem("pendingTask");
  let notesObj = JSON.parse(notes);
  console.log(notesObj);
  localStorage.setItem("pendingTask",JSON.stringify(notesObj));
  if(notesObj[index].text.length != 0){
     document.getElementById("completedTask").innerHTML += `<div class="noteCard my-2 mx-3 card" style="width: 15rem;justify-content:center;">
     <div class="card-body">
         <h5 class="box-title"> ${
          notesObj[index].title
         }</h5>
         <p class="card-text"> ${notesObj[index].text}</p>
     </div>
 </div>`
  }
  if(notesobj == null){
    document.getElementById("completedTask").innerHTML = `No task is completed till.`
  }
}



// ======= Delete the Pending Task  =======

function deletePendingTask(index) {
  let notes = localStorage.getItem("pendingTask");
  if (notes == null) {
    notesObjPending = [];
  } else {
    notesObjPending = JSON.parse(notes);
  }

  notesObjPending.splice(index, 1);
  localStorage.setItem("pendingTask", JSON.stringify(notesObjPending));
  showDailyTask();
}



// ====== Clear all the Completed Task =========

clearAll.addEventListener("click", () => {
  document.getElementById("completedTask").innerHTML = "";
});
