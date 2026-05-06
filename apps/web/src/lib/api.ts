export const API_BASE = 'https://lukaiai.onrender.com';

export async function subscribe(email: string): Promise<{ ok: boolean; existing?: boolean }> {
  const res = await fetch(`${API_BASE}/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error('bad response');
  return res.json();
}
