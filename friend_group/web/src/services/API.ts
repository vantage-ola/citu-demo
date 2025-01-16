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

  async signup(username: string, email: string, password: string) {
    const response = await this.axios.post('/users/', { username, email, password });
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

  // Groups endpoints
  async getGroups() {
    const response = await this.axios.get<Group[]>('/groups/');
    return response.data;
  }

  async createGroup(data: Partial<Group>) {
    const response = await this.axios.post<Group>('/groups/', data);
    return response.data;
  }

  async getGroup(id: number) {
    const response = await this.axios.get<Group>(`/groups/${id}/`);
    return response.data;
  }

  // Events endpoints
  async getEvents() {
    const response = await this.axios.get<Event[]>('/events/');
    return response.data;
  }

  async createEvent(data: Partial<Event>) {
    const response = await this.axios.post<Event>('/events/', data);
    return response.data;
  }

  async getEvent(id: number) {
    const response = await this.axios.get<Event>(`/events/${id}/`);
    return response.data;
  }

  // Event registrations endpoints
  async registerForEvent(eventId: number) {
    const response = await this.axios.post<EventRegistration>('/event-registrations/', {
      event: eventId,
    });
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