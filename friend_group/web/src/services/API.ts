import axios from 'axios';
import { Event, EventRegistration, Group, MockPayment, SpeakerProfile, User } from '../utils/Types';

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
  async login(username: string, password: string) {
    const response = await this.axios.post('/token/', { username, password });
    return response.data;
  }

  async signup(username: string, email: string, password: string, is_speaker: boolean) {
    const response = await this.axios.post('/users/', { username, email, password, is_speaker });
    return response.data;
  }

  async refreshToken(refreshToken: string) {
    const response = await this.axios.post('/token/refresh/', { refresh: refreshToken });
    return response.data;
  }

  // Users endpoints
  async getUsers() {
    const response = await this.axios.get<User[]>('/users/');
    return response.data;
  }

  async getUser(id: number) {
    const response = await this.axios.get<User>(`/users/${id}/`);
    return response.data;
  }

  // Speakers endpoints
  async getSpeakers() {
    const response = await this.axios.get<SpeakerProfile[]>('/speakers/');
    return response.data;
  }

  async getSpeaker(id: number) {
    const response = await this.axios.get<SpeakerProfile>(`/speakers/${id}/`);
    return response.data;
  }

  async createSpeakerProfile( expertise: string, hourly_rate: number, location: string) {
   const response = await this.axios.post<SpeakerProfile>('/speakers/', { expertise, hourly_rate, location, available_online: true});
   return response.data;
  }

  // Groups endpoints
  async getGroups() {
    const response = await this.axios.get<Group[]>('/groups/');
    return response.data;
  }

  async createGroup(name: string, description: string, created_by: number) {
    const response = await this.axios.post<Group>('/groups/', { name, description, created_by });
    return response.data;
  }

  async getGroup(id: number) {
    const response = await this.axios.get<Group>(`/groups/${id}/`);
    return response.data;
  }


  async joinGroup(group: number) {
    const response = await this.axios.post('/group-memberships/', { group, role: "MEMBER" });
    return response.data
  }
  // Events endpoints
  async getEvents() {
    const response = await this.axios.get<Event[]>('/events/');
    return response.data;
  }

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

  async getEvent(id: number) {
    const response = await this.axios.get<Event>(`/events/${id}/`);
    return response.data;
  }

  // Event registrations endpoints
  async registerForEvent(user_id: number, event_id: number) {
    const response = await this.axios.post<EventRegistration>('/event-registrations/', {
      user: user_id, event: event_id
    });
    return response.data;
  }

  async getEventRegistrations() {
    const response = await this.axios.get<EventRegistration[]>('/event-registrations/');
    return response.data;
  }

  // Payments endpoints
  async createPayment(data: Partial<MockPayment>) {
    const response = await this.axios.post<MockPayment>('/payments/', data);
    return response.data;
  }

  async getPayments() {
    const response = await this.axios.get<MockPayment[]>('/payments/');
    return response.data;
  }
}

export const api = new Api();