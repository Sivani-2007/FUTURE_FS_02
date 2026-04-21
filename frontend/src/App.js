import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Typography, Paper, TextField, Button, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, Chip,
  ThemeProvider, createTheme, IconButton, Dialog, DialogTitle, 
  DialogContent, DialogActions, Box, TextareaAutosize
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

const theme = createTheme();

function App() {
  const [leads, setLeads] = useState([]);
  const [newLead, setNewLead] = useState({ name: '', email: '', source: 'website' });
  const [loading, setLoading] = useState(true);
  const [noteDialog, setNoteDialog] = useState({ open: false, leadId: '', leadName: '' });
  const [newNote, setNewNote] = useState('');

  // Fetch leads
  const fetchLeads = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/leads');
      setLeads(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Add lead
  const addLead = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/leads', newLead);
      setNewLead({ name: '', email: '', source: 'website' });
      fetchLeads();
    } catch (err) {
      alert('Failed to add lead');
    }
  };

  // Update status
  const updateStatus = async (leadId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/leads/${leadId}`, { status: newStatus });
      fetchLeads();
    } catch (err) {
      alert('Status update failed');
    }
  };

  // Delete lead
  const deleteLead = async (leadId) => {
    try {
      await axios.delete(`http://localhost:5000/api/leads/${leadId}`);
      fetchLeads();
    } catch (err) {
      alert('Delete failed');
    }
  };

  // Add note
  const addNote = async () => {
    try {
      const lead = leads.find(l => l._id === noteDialog.leadId);
      const updatedNotes = [...(lead.notes || []), { text: newNote }];
      await axios.put(`http://localhost:5000/api/leads/${noteDialog.leadId}`, { 
        notes: updatedNotes 
      });
      setNewNote('');
      setNoteDialog({ open: false, leadId: '', leadName: '' });
      fetchLeads();
    } catch (err) {
      alert('Note failed to save');
    }
  };

  if (loading) return <div>Loading CRM...</div>;

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h2" gutterBottom color="primary">
          🚀 Mini CRM Dashboard
        </Typography>

        {/* Add New Lead */}
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>Add New Lead</Typography>
          <form onSubmit={addLead} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <TextField 
              label="Full Name *" 
              value={newLead.name}
              onChange={e => setNewLead({...newLead, name: e.target.value})}
              required
              sx={{ minWidth: 200 }}
            />
            <TextField 
              label="Email *" 
              type="email"
              value={newLead.email}
              onChange={e => setNewLead({...newLead, email: e.target.value})}
              required
              sx={{ minWidth: 250 }}
            />
            <Button type="submit" variant="contained" size="large">
              ➕ Add Lead
            </Button>
          </form>
        </Paper>

        {/* Leads Table */}
        <Paper elevation={3}>
          <Typography variant="h5" sx={{ p: 2, pb: 1 }}>
            📋 All Leads ({leads.length})
          </Typography>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Source</strong></TableCell>
                  <TableCell><strong>Status & Actions</strong></TableCell>
                  <TableCell><strong>Notes</strong></TableCell>
                  <TableCell><strong>Added</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leads.map(lead => (
                  <TableRow key={lead._id} hover>
                    <TableCell>{lead.name}</TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>{lead.source}</TableCell>
                    <TableCell sx={{ minWidth: 300 }}>
                      <Chip 
                        label={lead.status.toUpperCase()} 
                        color={lead.status === 'converted' ? 'success' : 
                               lead.status === 'contacted' ? 'warning' : 'default'}
                        sx={{ mr: 1 }}
                      />
                      {lead.status !== 'contacted' && (
                        <IconButton onClick={() => updateStatus(lead._id, 'contacted')} title="Contacted">
                          <PhoneIcon />
                        </IconButton>
                      )}
                      {lead.status !== 'converted' && (
                        <IconButton onClick={() => updateStatus(lead._id, 'converted')} title="Converted">
                          <CheckCircleIcon color="success" />
                        </IconButton>
                      )}
                      <IconButton 
                        onClick={() => {
                          if(window.confirm('Delete this lead?')) {
                            deleteLead(lead._id);
                          }
                        }}
                        title="Delete"
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton 
                        onClick={() => setNoteDialog({ open: true, leadId: lead._id, leadName: lead.name })}
                        title="Add Note"
                      >
                        <NoteAddIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell sx={{ maxWidth: 200 }}>
                      {lead.notes && lead.notes.length > 0 ? (
                        lead.notes.slice(-2).map((note, i) => (
                          <Typography key={i} variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                            {note.text.substring(0, 50)}...
                          </Typography>
                        ))
                      ) : (
                        <Typography variant="caption" color="text.secondary">No notes</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
                {leads.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <Typography>No leads yet. Add your first lead above! 🎯</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Notes Dialog */}
        <Dialog open={noteDialog.open} onClose={() => setNoteDialog({ ...noteDialog, open: false })}>
          <DialogTitle>Add Note for {noteDialog.leadName}</DialogTitle>
          <DialogContent>
            <TextareaAutosize
              minRows={3}
              style={{ width: 400 }}
              value={newNote}
              onChange={e => setNewNote(e.target.value)}
              placeholder="Enter note..."
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setNoteDialog({ ...noteDialog, open: false })}>Cancel</Button>
            <Button onClick={addNote} variant="contained" disabled={!newNote.trim()}>
              Save Note
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}

export default App;