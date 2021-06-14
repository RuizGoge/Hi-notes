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

// change notes image

function rand(n) {
  // creamos un numero al azar entre 1 y 10 (o cual sea la cantidad de imágenes)
  console.log(Math.floor(Math.random() * n + 1));

  return Math.floor(Math.random() * n + 1);
}
//guardas imagenes en el array
const changeImg = [
  "img0.gif",
  "img1.gif",
  "img2.gif",
  "img3.gif",
  "img4.gif",
];
function change() {
  document.getElementById("change").src = changeImg[rand(5) - 1];
}

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
  const flower = document.querySelector("#flower");
  if (!localStorage.length) {
    notes = [];
  } else {
    const JSON_NOTE = localStorage.getItem("notes");
    notes = JSON.parse(JSON_NOTE);
  }
  if (!notes.length) {
    flower.classList.remove("hidden");
    // carousel.remove();
  } else {
    notes.forEach((e, i) => {
      carousel.insertAdjacentHTML(
        "afterbegin",
        `<div id="list-container" class="col s10 offset-s1 card-container_note z-depth-3 card-${
          i + 1
        }">
      <div class="row card-note">
          <div class="col s12 container-content_card">
              <div class="content-card">
                  <div class="truncate">
                      <h6 class="truncate">${e.title}</h6>
                      <p class="truncate">${e.note}</p>
                      <i class="date">${e.date}</i>
                  </div> 
                  <div class="icons-options">
                      <i class="material-icons tiny">open_in_new</i>
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
        iconGrid.innerHTML = "view_module";
        if (
          !(
            listContainer.classList.contains("s10") ||
            listContainer.classList.contains("grid_mode")
          )
        ) {
          listContainer.classList.add("grid_mode");
        } else {
          listContainer.classList.remove("grid_mode");
          iconGrid.innerHTML = "view_headline";
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
  const TITLE_SHOW_TWO = document.querySelector("#title-in-show-container_two");
  const NOTE_SHOW = document.querySelector("#note-in-show-container");
  const NUM_NOTE = document.querySelector("#number-note");


  //Select Card for See note's info.
  notes.forEach((e, i) => {
    const card = document.querySelector(`.card-${i + 1}`);
    card.addEventListener("click", function () {
      divShow.classList.remove("hidden");
      setTimeout(() => {
      divShow.classList.add("show-container");
      show.classList.remove("scale-out");
      show.classList.add("show");
      }, 100);
      TITLE_SHOW.innerHTML =
        e.title + '<i class="material-icons right">more_vert</i>';
      NOTE_SHOW.innerHTML = e.note;
      NUM_NOTE.innerHTML = i + 1; //para identificar la posicion en el array
      TITLE_SHOW_TWO.innerHTML =
        e.title + '<i class="material-icons right">close</i>';
    });

  });

  // Boton exit
  exitShow.addEventListener("click", function () {
    show.classList.add("scale-out");
    setTimeout(() => {
      divShow.classList.add("hidden");
      divShow.classList.remove("show-container");
    }, 350);
  });

}

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

  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems);
});

// event for Headers, letter effect

const typed = new Typed(".typed", {
  strings: [
    "<i class='font-animated'>write</i>",
    "<i class='font-animated'>a new</i>",
    "<i class='font-animated'>note</i>",
  ],
  typeSpeed: 75, // Velocidad en mlisegundos para poner una letra,
  startDelay: 150, // Tiempo de retraso en iniciar la animacion. Aplica tambien cuando termina y vuelve a iniciar,
  backSpeed: 75, // Velocidad en milisegundos para borrrar una letra,
  smartBackspace: true, // Eliminar solamente las palabras que sean nuevas en una cadena de texto.
  shuffle: false, // Alterar el orden en el que escribe las palabras.
  backDelay: 1500, // Tiempo de espera despues de que termina de escribir una palabra.
  loop: true, // Repetir el array de strings
  loopCount: false, // Cantidad de veces a repetir el array.  false = infinite
  showCursor: true, // Mostrar cursor palpitanto
  cursorChar: "🗒", // Caracter para el cursor
  contentType: "html", // 'html' o 'null' para texto sin formato
});

// deleteNote.addEventListener("click", deleteOne);
// updateNote.addEventListener("click", updateOne);
newNote.addEventListener("click", saveNote);
showNotes();
cards();

firstContainer.classList.add("first-container_fixed");
principalTitle.classList.add("without-first_container");

addNewNote.addEventListener("click", function () {
  iconAdd.innerHTML = "save";
  btnToPulse.classList.add("pulse", "white");
  firstContainer.classList.toggle("scale-out");
  btnToPulse.classList.remove("disabled");
  firstContainer.classList.remove("first-container_fixed");
  principalTitle.classList.remove("without-first_container");

  if ((iconAdd.innerHTML = "save")) {
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

change();

