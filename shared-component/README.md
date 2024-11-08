
## Components

### NoteList

The `NoteList` component displays a list of notes with options to edit and delete each note.

#### Props

- `notes`: An array of note objects.
- `onEdit`: Function to call when a note is edited.
- `onDelete`: Function to call when a note is deleted.
- `disabled`: Boolean to disable edit and delete buttons.

### NoteEditor

The `NoteEditor` component provides a form to create or edit a note.

#### Props

- `note`: The note object to edit.
- `onSave`: Function to call when the note is saved.
- `onCancel`: Function to call when editing is canceled.
- `disabled`: Boolean to disable the form.

### Layout

The `Layout` component provides a consistent layout for your application using `react-router-dom`'s `Outlet`.

## Usage
