//Variables Inicializadas (camelCase)!
// variables for savenotes
const resetButton = document.querySelector("#reset");
const deleteNote = document.querySelector("#delete");
const updateNote = document.querySelector("#update");
const newNote = document.querySelector("#save");
const firstContainer = document.querySelector("#first-container");
const iconAdd = document.querySelector(".icon-add");
const addNewNote = document.querySelector("#add-note");
const principalTitle = document.querySelector(".principal_title");
const btnToPulse = document.querySelector("#btn-to-pulse");

let resultDate;
let notes = [];

//Functions saveNotes
const divShow = document.querySelector("#show-container");
const show = document.querySelector("#show");
const exitShow = document.querySelector("#exit-show");

const dateOfNotes = () => {
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let today = new Date();
  let hour = today.getHours();
  let minute = today.getMinutes();
  resultDate =
    `${MONTHS[today.getMonth()]} ${today.getDate()}, ` +
    (hour > 12 ? hour - 12 : hour);
  if (hour == 0) resultDate = "12";
  resultDate += (minute < 10 ? ":0" : ":") + minute;
  resultDate += hour >= 12 ? " p.m." : " a.m.";
};
const save = (array) => {
  localStorage.setItem("notes", JSON.stringify(array));
  location.reload();
};
const saveNote = () => {
  const TITLE_NOTE = document.getElementById("title").value;
  const NOTE = document.getElementById("textarea1").value;
  if (!(TITLE_NOTE && NOTE)) {
    if (firstContainer.classList.contains("first-container_fixed")) {
      M.toast({ html: "Click in Hi-Notes!", classes: "rounded" });
    } else {
      M.toast({ html: "Write in the two fields", classes: "rounded" });
      btnToPulse.classList.remove("blue");
      btnToPulse.classList.add("red");
    }
  } else {
    dateOfNotes();
    notes.push({ date: resultDate, title: TITLE_NOTE, note: NOTE });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Saved",
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
    save(notes);
    }, 1500);
  }
};
const showNotes = () => {
  const show = document.querySelector("#show");

  if (!localStorage.length) {
    notes = [];
  } else {
    const JSON_NOTE = localStorage.getItem("notes");
    notes = JSON.parse(JSON_NOTE);
  }
  if (!notes.length) {
    carousel.remove();
  } else {
    notes.forEach((e, i) => {
      carousel.insertAdjacentHTML(
        "afterbegin",
        `<div id="list-container" class="col s10 offset-s1 card-container_note z-depth-3 card-${
          i + 1
        }">
                <div class="row card-note">
                    <div class="col s12">
                        <div class="left-align">
                            <div>
                                <h6 class="truncate">${e.title}</h6>
                                <p class="truncate red-text">${e.note}</p>
                                <p class="date">${e.date}</p>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>`
      );
      const listContainer = document.getElementById("list-container");
      const toggleList = document.querySelector("#list-btn");
      const iconGrid = document.querySelector("#icon-grid");
      toggleList.addEventListener("click", function () {
        listContainer.classList.toggle("s10");
        listContainer.classList.toggle("s3");
        iconGrid.innerHTML = "view_list";
        if (
          !(
            listContainer.classList.contains("s10") ||
            listContainer.classList.contains("grid_mode")
          )
        ) {
          listContainer.classList.add("grid_mode");
        } else {
          listContainer.classList.remove("grid_mode");
          iconGrid.innerHTML = "view_module";
        }
      });
    });
  }
  if (show.classList.contains("show")) {
    show.classList.remove("show");
  }
};
//funciones interactivas

function cards() {
  const TITLE_SHOW = document.querySelector("#title-in-show-container");
  const NOTE_SHOW = document.querySelector("#note-in-show-container");
  const NUM_NOTE = document.querySelector("#number-note");

  //Select Card for See note's info.
  notes.forEach((e, i) => {
    const card = document.querySelector(`.card-${i + 1}`);
    card.addEventListener("click", function () {
      show.classList.remove("scale-out");
      show.classList.add("show");
      divShow.classList.remove("hidden");
      divShow.classList.add("show-container");
      TITLE_SHOW.innerHTML = e.title;
      NOTE_SHOW.innerHTML = e.note;
      NUM_NOTE.innerHTML = i + 1;
    });
  });

  //Boton exit
  exitShow.addEventListener("click", function () {
    show.classList.add("scale-out");
    setTimeout(() => {
      divShow.classList.add("hidden");
    }, 350);
  });
}

//prueba del toggle en show

const prueba = document.querySelector("#prueba");

prueba.addEventListener("click", function () {
  if (show.classList.toggle("scale-out")) {
    setTimeout(() => {
      divShow.classList.toggle("hidden");
    }, 500);
  }
});

function deleteOne() {
  const NUM_NOTE = document.querySelector("#number-note").innerHTML;
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
      buttonsStyling: false,
    },
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ujum!",
      cancelButtonText: "No",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        show.classList.add("scale-out");
        if (show.classList.contains("scale-out")) {
          divShow.classList.remove("show-container");
        }
        setTimeout(() => {
          notes.splice(NUM_NOTE - 1, 1);
          save(notes);
        }, 1400);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your file has been deleted.",
          showConfirmButton: false,
          timer: 1300,
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          "Cancelled",
          "Your Hi note is safe 🦔",
          "error"
        );
      }
    });
}

function updateOne() {
  const NUM_NOTE = document.querySelector("#number-note").innerHTML;
  const TITLE_NOTE = document.querySelector(
    "#title-in-show-container"
  ).innerHTML;
  document.querySelector("#update").innerHTML =
    '<a class="btn transparent z-depth-0 save-note white-text">SAVE</a>';
  const NOTE = document.querySelector("#note-in-show-container");
  const textOfNote = NOTE.innerHTML;
  const textArea = document.querySelector("#textarea-update");

  NOTE.classList.add("hidden");
  textArea.classList.remove("hidden");
  textArea.innerHTML = textOfNote;

  document.querySelector(".save-note").addEventListener("click", function () {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      confirmButtonText: `Save`,
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Saved",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          dateOfNotes();
          notes.splice(NUM_NOTE - 1, 1, {
            date: `${resultDate} edited`,
            title: TITLE_NOTE,
            note: textArea.value,
          });
          save(notes);
        }, 1300);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  });
}
// Event listeners for savenotes
resetButton.addEventListener("click", () => {
  if (!notes.length) {
    M.toast({ html: "The storage is empty", classes: "rounded" });
  } else {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete All!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "All files have been deleted.",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          localStorage.clear(), location.reload();
        }, 1300);
      }
    });
  }
});

//Event listener for menu
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".fixed-action-btn");
  var instances = M.FloatingActionButton.init(elems);
});

deleteNote.addEventListener("click", deleteOne);
updateNote.addEventListener("click", updateOne);
newNote.addEventListener("click", saveNote);
showNotes();
cards();

firstContainer.classList.add("first-container_fixed");
principalTitle.classList.add("without-first_container");

addNewNote.addEventListener("click", function () {
  iconAdd.innerHTML = "check";
  btnToPulse.classList.add("pulse", "blue");
  firstContainer.classList.toggle("scale-out");
  btnToPulse.classList.remove("disabled");
  firstContainer.classList.remove("first-container_fixed");
  principalTitle.classList.remove("without-first_container");

  if ((iconAdd.innerHTML = "check")) {
    if (firstContainer.classList.contains("scale-out")) {
      iconAdd.innerHTML = "add";
      setTimeout(() => {
        firstContainer.classList.add("first-container_fixed");
      }, 100);
      principalTitle.classList.add("without-first_container");
      btnToPulse.classList.remove("pulse");
    }
  }
});
