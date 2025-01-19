import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/API';
import { Group, User } from '../../utils/Types';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Button,
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AuthContext } from '../../context/AuthContext';

const GroupDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [group, setGroup] = useState<Group | null>(null);
  const [members, setMembers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMember, setIsMember] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const groupData = await api.getGroup(Number(id));
        setGroup(groupData);
        const membersData = groupData.members.map((member: { user: User }) => member.user);
        setMembers(membersData);
        setIsMember(membersData.some((member: User) => member.id === user?.id));
      } catch (error) {
        console.error('Error fetching group details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroupDetails();
  }, [id, user]);

  const joinGroup = async () => {
    try {
      await api.joinGroup(Number(id));
      const groupData = await api.getGroup(Number(id));
      setGroup(groupData);
      const membersData = groupData.members.map((member: { user: User }) => member.user);
      setMembers(membersData);
      setIsMember(true);
    } catch (error) {
      console.error('Error joining group:', error);
    }
  };

  if (isLoading) {
    return (
      <Container sx={{ mt: 'calc(var(--template-frame-height, 0px) + 28px)', textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 1 }}>
          Loading group details...
        </Typography>
      </Container>
    );
  }

  if (!group) {
    return (
      <Container sx={{ mt: 'calc(var(--template-frame-height, 0px) + 28px)', textAlign: 'center' }}>
        <Typography variant="h6">Group not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 'calc(var(--template-frame-height, 0px) + 28px)', p: 2 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/groups')}
        variant="text"
        color="primary"
        sx={{ mb: 2 }}
      >
        Back to Groups
      </Button>

      <Card elevation={2} sx={{ mt: 2 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <GroupIcon color="primary" sx={{ fontSize: '2.5rem' }} />
            <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
              {group.name}
            </Typography>
          </Box>

          <Typography variant="body1" color="textSecondary" paragraph>
            {group.description}
          </Typography>
          <Box display="flex" gap={4}>
            <Box>
              <Typography color="textSecondary">Created</Typography>
              <Typography>{new Date(group.created_at).toLocaleDateString()}</Typography>
            </Box>
            <Box>
              <Typography color="textSecondary">Total Members</Typography>
              <Typography>{members.length}</Typography>
            </Box>
          </Box>
          {!isMember ? (
            <Button
              onClick={joinGroup}
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Join Group
            </Button>
          ) : (
            <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
              You are a member of this group
            </Typography>
          )}
        </CardContent>
      </Card>

      <Paper elevation={3} sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, mt: 2 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Group Members ({members.length})
        </Typography>

        <List>
          {members.map((member) => (
            <ListItem key={member.id}>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${member.username}`}
                secondary={member.email}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default GroupDetailPage;
