import { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import * as api from '../api';
import { Note, User } from '../types';
import { NoteCard } from '../components/NoteCard';
import { SearchBar } from '../components/SearchBar';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ConfirmModal } from '../components/ConfirmModal';
import { ToastType } from '../components/Toast';

interface NotesProps {
  user: User;
  showToast: (message: string, type: ToastType) => void;
}

export function Notes({ user, showToast }: NotesProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteNoteId, setDeleteNoteId] = useState<string | null>(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const data = await api.getNotes(user.token);
      setNotes(data);
    } catch (err) {
      setError('Failed to load notes');
      showToast('Failed to load notes', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      const note = await api.createNote(user.token, newNote);
      setNotes([note, ...notes]);
      setNewNote('');
      showToast('Note created successfully', 'success');
    } catch (err) {
      showToast('Failed to create note', 'error');
    }
  };

  const handleUpdateNote = async (id: string, content: string) => {
    try {
      const updatedNote = await api.updateNote(user.token, id, content);
      setNotes(notes.map(note => note.id === id ? updatedNote : note));
      showToast('Note updated successfully', 'success');
    } catch (err) {
      showToast('Failed to update note', 'error');
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await api.deleteNote(user.token, id);
      setNotes(notes.filter(note => note.id !== id));
      showToast('Note deleted successfully', 'success');
    } catch (err) {
      showToast('Failed to delete note', 'error');
    }
  };

  const filteredNotes = notes.filter(note =>
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" className="text-purple-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleCreateNote} className="mb-8">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write a new note..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent min-h-[120px]"
            rows={3}
          />
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              disabled={!newNote.trim()}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <PlusCircle className="h-5 w-5" />
              Add Note
            </button>
          </div>
        </div>
      </form>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <div className="grid gap-4">
        {filteredNotes.map(note => (
          <NoteCard
            key={note.id}
            note={note}
            onUpdate={handleUpdateNote}
            onDelete={(id) => setDeleteNoteId(id)}
          />
        ))}
        
        {filteredNotes.length === 0 && (
          <div className="text-center text-gray-600 py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <p className="text-lg font-medium">
              {searchQuery
                ? 'No notes found matching your search.'
                : 'No notes yet. Create your first note above!'}
            </p>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={!!deleteNoteId}
        onClose={() => setDeleteNoteId(null)}
        onConfirm={() => {
          if (deleteNoteId) {
            handleDeleteNote(deleteNoteId);
            setDeleteNoteId(null);
          }
        }}
        title="Delete Note"
        message="Are you sure you want to delete this note? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}