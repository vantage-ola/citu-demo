import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/API';
import { Group } from '../../utils/Types';
import {
  Container,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Box,
  Paper,
  Divider,
  Modal,
  IconButton,
  Alert,
  ListItemSecondaryAction,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { AuthContext } from '../../context/AuthContext';

const GroupManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleOpen = () => {
    setOpen(true);
    setError('');
    setName('');
    setDescription('');
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
  };

  useEffect(() => {
    const fetchGroups = async () => {
      const data = await api.getGroups();
      setGroups(data);
    };
    fetchGroups();
  }, []);

  const handleGroupClick = (groupId: number) => {
    navigate(`/groups/${groupId}`);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !description.trim()) {
      setError('Group name and Description are required.');
      return;
    }
    setError('');

    try {
      await api.createGroup(name, description, Number(user?.id));
      handleClose();
      location.reload();
    } catch (error) {
      console.error('Group creation failed:', error);
      setError('Group creation failed. Please try again.');
    }
  };

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(groupName.toLowerCase())
  );

  return (
    <Container maxWidth="md" sx={{ mt: 'calc(var(--template-frame-height, 0px) + 28px)', p: 2 }}>
      <Paper elevation={3} sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, textAlign: 'center', color: 'primary.main' }}>
          Manage Groups
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <TextField
            fullWidth
            margin="normal"
            autoFocus
            placeholder="search groups by name"
            id="standard-basic"
            label="Search Groups"
            variant="standard"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}/>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            startIcon={<AddCircleOutlineIcon />}
            size="large"
            sx={{ textTransform: 'none' }}
          >
            Create Group
          </Button>
        </Box>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h5" component="h2">
                Create New Group
              </Typography>
              <IconButton onClick={handleClose} size="small">
                <CloseIcon />
              </IconButton>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              label="Group Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
              variant="standard"
              placeholder="Enter group name"
              required
            />

            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
              variant="standard"
              multiline
              rows={4}
              placeholder="Enter group description"
              required
            />

            <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                onClick={handleClose}
                color="inherit"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                color="primary"
              >
                Create Group
              </Button>
            </Box>
          </Box>
        </Modal>
        {groups.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
              Existing Groups
            </Typography>
            <List>
              {filteredGroups.map((group) => (
                <ListItem
                  key={group.id}
                  onClick={() => handleGroupClick(group.id)}
                  sx={{
                    bgcolor: 'background.paper',
                    mb: 1,
                    borderRadius: 2,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      bgcolor: 'action.hover',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <ListItemText
                    primary={group.name}
                    secondary={group.description}
                    primaryTypographyProps={{ fontSize: '1.1rem' }}
                  />
                  <ListItemSecondaryAction>
                    <ChevronRightIcon color="action" />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default GroupManagementPage;
