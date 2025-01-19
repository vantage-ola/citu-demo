// Represents a user in the system
export interface User {
  id: number;
  username: string;
  email: string;
  is_speaker: boolean;
  bio: string | null;
  profile_picture: string | null;
  created_at: string;
}

// Represents a speaker profile
export interface SpeakerProfile {
  id: number;
  user: User;
  expertise: string;
  hourly_rate: number;
  location: string;
  available_online: boolean;
  availabilities: SpeakerAvailability[];
}

// Represents a speaker's availability
export interface SpeakerAvailability {
  id: number;
  speaker: number;
  date: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

// Represents a group
export interface Group {
  id: number;
  name: string;
  description: string;
  created_by: User;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  members: GroupMembership[];
}

// Represents a group membership
export interface GroupMembership {
  id: number;
  user: User;
  group: number;
  role: 'ADMIN' | 'MEMBER';
  joined_at: string;
  is_active: boolean;
}

// Represents an event
export interface Event {
  id: number;
  title: string;
  description: string;
  group: Group;
  speaker: SpeakerProfile;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  is_online: boolean;
  meeting_link: string | null;
  max_participants: number | null;
  status: 'DRAFT' | 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  created_by: User;
  created_at: string;
  updated_at: string;
  registrations: EventRegistration[];
}

// Represents an event registration
export interface EventRegistration {
  id: number;
  event: number;
  user: User;
  registered_at: string;
  attended: boolean;
}

// Represents a mock payment
export interface MockPayment {
  id: number;
  event: number;
  payer: number;
  recipient: number;
  amount: number;
  status: string;
  transaction_id: string;
  created_at: string;
  updated_at: string;
}