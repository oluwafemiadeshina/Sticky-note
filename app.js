const noteContainer = document.getElementById('app');
const addNoteButton = noteContainer.querySelector('.add-note');

addNoteButton.addEventListener('click', () =>{
// addNoteButton.addEventListener('click', addNote);
    addNote();
});

getNotes().forEach((note) => {
    const noteElement = createNoteElement(note.id, note.content);

    noteContainer.insertBefore(noteElement, addNoteButton);
});

function getNotes(){
    return JSON.parse(localStorage.getItem('sticknotes') || '[]');
}


function saveNotes(notes){
    localStorage.setItem('sticknotes', JSON.stringify(notes));
}

function createNoteElement(id, content){
    const element = document.createElement('textarea');

    element.classList.add('note');
    element.value = content;
    element.placeholder = 'Empty Stick Note';

    element.addEventListener('change', ()=>{
        updateNote(id, element.value);
    })
    element.addEventListener('dblclick', ()=>{
        const doDelete = confirm('Are you sure you want to delete the note');
        if(doDelete){
            deleteNote(id, element);
        }
    })

    return element;
}

function addNote(){
    const notes = getNotes();
    const noteObject = {
        id:Math.floor(Math.random()*100000),
        content: ''
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    noteContainer.insertBefore(noteElement, addNoteButton);

    notes.push(noteObject);
    saveNotes(notes);
}

function updateNote(id, newContent){
    const notes = getNotes();
    const targetNotes = notes.filter(note => note.id ==id)[0];

    targetNotes.content = newContent;
    saveNotes(notes);
}

function deleteNote(id, element){
    const notes = getNotes().filter(notes => notes.id !=id);
 
        saveNotes(notes);
        noteContainer.removeChild(element);

}