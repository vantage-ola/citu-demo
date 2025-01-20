import axios from 'axios';
import { Event, EventRegistration, Group, MockPayment, SpeakerAvailability, SpeakerProfile, User } from '../utils/Types';

const BASE_URL = 'http://localhost:8000/api';


class Api {
  private token: string | null = null;
  private axios = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  setToken(token: string) {
    this.token = token;
    this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Auth endpoints
  // Logs in a user with the provided username and password
  async login(username: string, password: string) {
    const response = await this.axios.post('/token/', { username, password });
    return response.data;
  }

  // Signs up a new user with the provided username, email, password, and speaker status
  async signup(username: string, email: string, password: string, is_speaker: boolean) {
    const response = await this.axios.post('/users/', { username, email, password, is_speaker });
    return response.data;
  }

  // Refreshes the authentication token using the provided refresh token
  async refreshToken(refreshToken: string) {
    const response = await this.axios.post('/token/refresh/', { refresh: refreshToken });
    return response.data;
  }

  // Users endpoints
  // Retrieves a list of all users
  async getUsers() {
    const response = await this.axios.get<User[]>('/users/');
    return response.data;
  }

  // Retrieves a specific user by their ID
  async getUser(id: number) {
    const response = await this.axios.get<User>(`/users/${id}/`);
    return response.data;
  }

  // Speakers endpoints
  // Retrieves a list of all speakers
  async getSpeakers() {
    const response = await this.axios.get<SpeakerProfile[]>('/speakers/');
    return response.data;
  }

  // Retrieves a specific speaker by their ID
  async getSpeaker(id: number) {
    const response = await this.axios.get<SpeakerProfile>(`/speakers/${id}/`);
    return response.data;
  }

  // Creates a new speaker profile with the provided expertise, hourly rate, and location
  async createSpeakerProfile( expertise: string, hourly_rate: number, location: string) {
   const response = await this.axios.post<SpeakerProfile>('/speakers/', { expertise, hourly_rate, location, available_online: true});
   return response.data;
  }
  // Speakers Availability

  // Create/set the speaker availability
  async CreateSpeakerAvailabilty(date: string, start_time: string, end_time: string, is_available: boolean, speaker: number) {
    const response = await this.axios.post('/speaker-availability/', {
      date,
      start_time,
      end_time,
      is_available,
      speaker
    });
    return response.data;
  }

  async GetSpeakerAvailability(){
    const response = await this.axios.get<SpeakerAvailability[]>('/speaker-availability/')
    return response;
  }

  async EditSpeakerAvailability(id: number, date: string, start_time: string, end_time: string, is_available: boolean, speaker: number){
    const response = await this.axios.put<SpeakerAvailability>(`/speaker-availability/${id}/`,
      {
        date,
        start_time,
        end_time,
        is_available,
        speaker
      }
    )
    return response.data;
  }

  // Groups endpoints
  // Retrieves a list of all groups
  async getGroups() {
    const response = await this.axios.get<Group[]>('/groups/');
    return response.data;
  }

  // Creates a new group with the provided name, description, and creator ID
  async createGroup(name: string, description: string, created_by: number) {
    const response = await this.axios.post<Group>('/groups/', { name, description, created_by });
    return response.data;
  }

  // Retrieves a specific group by its ID
  async getGroup(id: number) {
    const response = await this.axios.get<Group>(`/groups/${id}/`);
    return response.data;
  }

  // Joins a group with the provided group ID
  async joinGroup(group: number) {
    const response = await this.axios.post('/group-memberships/', { group, role: "MEMBER" });
    return response.data
  }

  // Events endpoints
  // Retrieves a list of all events
  async getEvents() {
    const response = await this.axios.get<Event[]>('/events/');
    return response.data;
  }

  // Creates a new event with the provided title, description, group ID, date, start time, end time, location, and creator ID
  async createEvent(
      title: string,
      description: string,
      group: number,
      date: string,
      start_time: string,
      end_time: string,
      location: string,
      created_by: number

  ) {
    const response = await this.axios.post<Event>('/events/', {title, description, group, date, start_time, end_time, location, created_by});
    return response.data;
  }

  // Retrieves a specific event by its ID
  async getEvent(id: number) {
    const response = await this.axios.get<Event>(`/events/${id}/`);
    return response.data;
  }

  // Event registrations endpoints
  // Registers a user for an event with the provided user ID and event ID
  async registerForEvent(user_id: number, event_id: number) {
    const response = await this.axios.post<EventRegistration>('/event-registrations/', {
      user: user_id, event: event_id
    });
    return response.data;
  }

  // Retrieves a list of all event registrations
  async getEventRegistrations() {
    const response = await this.axios.get<EventRegistration[]>('/event-registrations/');
    return response.data;
  }

  // Payments endpoints
  // Creates a new payment with the provided payment data
  async createPayment(data: Partial<MockPayment>) {
    const response = await this.axios.post<MockPayment>('/payments/', data);
    return response.data;
  }

  // Retrieves a list of all payments
  async getPayments() {
    const response = await this.axios.get<MockPayment[]>('/payments/');
    return response.data;
  }
}

export const api = new Api();