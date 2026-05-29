export const API_BASE = (import.meta.env.VITE_API_BASE as string | undefined) || 'https://lukaiai.onrender.com';

export async function subscribe(email: string) {
  const res = await fetch(API_BASE + '/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error('Subscribe failed');
  return res.json();
}

export async function signup(email: string, password: string) {
  const res = await fetch(API_BASE + '/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Signup failed');
  return data;
}

export async function login(email: string, password: string) {
  const res = await fetch(API_BASE + '/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  return data;
}

export async function logout() {
  const res = await fetch(API_BASE + '/logout', {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Logout failed');
  return res.json();
}

export async function getMe() {
  const res = await fetch(API_BASE + '/me', {
    credentials: 'include',
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.user ?? null;
}

export async function fetchModuleLessons(moduleNumber: string) {
  const res = await fetch(`${API_BASE}/modules/${moduleNumber}/lessons`, { credentials: 'include' });
  return res.json();
}

export async function fetchModules() {
  const res = await fetch(`${API_BASE}/modules`, { credentials: 'include' });
  return res.json();
}

export async function markLessonComplete(lessonId: string) {
  const res = await fetch(`${API_BASE}/lessons/${lessonId}/complete`, {
    method: 'POST',
    credentials: 'include'
  });
  return res.json();
}

export async function fetchChecklistState(lessonId: string) {
  const res = await fetch(`${API_BASE}/lessons/${lessonId}/checklist-state`, {
    credentials: 'include',
  });
  return res.json();
}

export async function toggleChecklistItem(
  lessonId: string,
  blockId: string,
  itemId: string,
  completed: boolean,
) {
  const res = await fetch(`${API_BASE}/lessons/${lessonId}/checklist-toggle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ blockId, itemId, completed }),
  });
  return res.json();
}

export interface SubmitProjectInput {
  projectName: string;
  projectUrl: string;
  projectDescription: string;
  builderDisplayName?: string;
  moduleCompleted?: number;
  isProjectPublic?: boolean;
}

export interface Project {
  projectName: string;
  projectUrl: string;
  projectDescription: string;
  builderDisplayName: string;
  moduleCompleted: number | null;
  submittedAt: string;
}

export async function submitProject(data: SubmitProjectInput) {
  const res = await fetch(`${API_BASE}/me/project`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body.error || 'Project submit failed');
  return body;
}

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${API_BASE}/projects`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  const body = await res.json();
  return (body.projects ?? []) as Project[];
}
