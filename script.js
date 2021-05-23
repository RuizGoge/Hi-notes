//Variables Inicializadas (camelCase)!
// variables for savenotes
const resetButton = document.querySelector('#reset');
const deleteNote = document.querySelector('#delete');
const updateNote = document.querySelector('#update');
const newNote = document.querySelector('#save');
let resultDate;
let notes = [];

// variables for mp3

// Song titles
const songs = ['summer'];
// Keep track of song
let songIndex = 0;
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const audio = document.getElementById('audio');

//Functions saveNotes
const divShow = document.querySelector('#show-container');
const show = document.querySelector('#show');
const exitShow = document.querySelector('#exit-show');

const dateOfNotes = () => {
    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let today = new Date();
    let hour = today.getHours();
    let minute = today.getMinutes();
    resultDate = `${MONTHS[today.getMonth()]} ${today.getDate()}, ` + ((hour > 12) ? hour - 12 : hour);
    if (hour == 0) resultDate = '12';
    resultDate += ((minute < 10) ? ':0' : ':') + minute;
    resultDate += (hour >= 12) ? ' p.m.' : ' a.m.';
}
const save = array => {
    localStorage.setItem('notes', JSON.stringify(array));
    location.reload();
}
const saveNote = () => {
    const TITLE_NOTE = document.getElementById('title').value;
    const NOTE = document.getElementById('textarea1').value;
    if (!(TITLE_NOTE && NOTE)) {
        M.toast({ html: 'Write in the two fields', classes: 'rounded' });
    } else {
        dateOfNotes();
        notes.push({ date: resultDate, title: TITLE_NOTE, note: NOTE });
        save(notes);
    }
}
const showNotes = () => {
        const carousel = document.querySelector('#carousel');
        const show = document.querySelector('#show');
        if (!localStorage.length) {
            notes = [];
        } else {
            const JSON_NOTE = localStorage.getItem('notes');
            notes = JSON.parse(JSON_NOTE);
        }
        if (!notes.length) {
            carousel.remove();
        } else {
            notes.forEach((e, i) => {
                carousel.insertAdjacentHTML('beforeend', `<a id="carousel-item" class="carousel-item card-rousel card-${i + 1} hoverable z-depth-2"><p class="center">${e.title}</p><div class="container-note-in-card"><i class="center">${e.note}</i></div><div class="container-date-in-card"><i class="center">${e.date}</i></div></a>`);
            });
        }
        if (show.classList.contains('show')) {
            show.classList.remove('show');
        }
    }
    //funciones interactivas

function cards() {
    const TITLE_SHOW = document.querySelector('#title-in-show-container')
    const NOTE_SHOW = document.querySelector('#note-in-show-container')
    const NUM_NOTE = document.querySelector('#number-note')

    //Boton exit of show-container
    exitShow.addEventListener('click', function() {
            show.classList.add('scale-out');
            if (show.classList.contains('scale-out')) {
                divShow.classList.remove('show-container')
                save(notes);
            }
        })
        //Select Card for See note's info.
    notes.forEach((e, i) => {
        const card = document.querySelector(`.card-${i + 1}`);
        card.addEventListener('click', function() {
            divShow.classList.remove('hidden');
            if (card.classList.contains('active')) {
                divShow.classList.toggle('show-container')
                if (divShow.classList.contains('show-container')) {
                    show.classList.remove('scale-out')
                    show.classList.add('show')
                    TITLE_SHOW.innerHTML = e.title;
                    NOTE_SHOW.innerHTML = e.note;
                    NUM_NOTE.innerHTML = i + 1;
                } else {
                    show.classList.remove('show')
                }
            }
        })
    });
}

function deleteOne() {
    const NUM_NOTE = document.querySelector('#number-note').innerHTML;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger',
            buttonsStyling: false
        },
    })
    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            show.classList.add('scale-out');
            if (show.classList.contains('scale-out')) {
                divShow.classList.remove('show-container')
            }
            setTimeout(() => {
                notes.splice(NUM_NOTE - 1, 1);
                save(notes);
            }, 1400);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your file has been deleted.',
                showConfirmButton: false,
                timer: 1300
            })
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your Hi note is safe 🦔',
                'error'
            )
        }
    })
}

function updateOne() {
    const NUM_NOTE = document.querySelector('#number-note').innerHTML;
    const TITLE_NOTE = document.querySelector('#title-in-show-container').innerHTML;
    const BTN_UPDATE = document.querySelector('#update').innerHTML = '<a class="btn transparent z-depth-0 save-note white-text">SAVE</a>';
    const NOTE = document.querySelector('#note-in-show-container');
    const textOfNote = NOTE.innerHTML;
    const textArea = document.querySelector('#textarea-update');

    NOTE.classList.add('hidden');
    textArea.classList.remove('hidden');
    textArea.innerHTML = textOfNote;

    document.querySelector('.save-note').addEventListener('click', function() {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            confirmButtonText: `Save`,
            denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Saved',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(() => {
                    dateOfNotes();
                    notes.splice(NUM_NOTE - 1, 1, { date: `${resultDate} edited`, title: TITLE_NOTE, note: textArea.value });
                    save(notes);
                }, 1300);
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })

    })
}

//FUNCTIONS FOR MP3

// Update song details

const loadSong = song => {
        audio.src = `music/${song}.mp3`;
    }
    // Play song
const playSong = () => {
        musicContainer.classList.add('play');
        playBtn.querySelector('i.fas').classList.remove('fa-play');
        playBtn.querySelector('i.fas').classList.add('fa-pause');

        audio.play();
    }
    // Pause song
const pauseSong = () => {
        musicContainer.classList.remove('play');
        playBtn.querySelector('i.fas').classList.add('fa-play');
        playBtn.querySelector('i.fas').classList.remove('fa-pause');

        audio.pause();
    }
    // Event listeners for savenotes
resetButton.addEventListener('click', () => {
    if (!notes.length) {
        M.toast({ html: 'The storage is empty', classes: 'rounded' });
    } else {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete All!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'All files have been deleted.',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(() => {
                    localStorage.clear(), location.reload();
                }, 1300);
            }
        })
    }

});
// Event listeners for button mp3
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});
// Initially load song details into DOM
loadSong(songs[songIndex]);
//Event listener for carousel
document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.carousel');
    let instances = M.Carousel.init(elems, {
        duration: 300,
        indicators: true,
        shift: 20,
        numVisible: 7
    });
})


deleteNote.addEventListener('click', deleteOne);
updateNote.addEventListener('click', updateOne);
newNote.addEventListener('click', saveNote);
showNotes();
cards();