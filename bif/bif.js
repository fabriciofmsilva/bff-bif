import parseUserData from './parseUserData';
import fetchJson from './fetchJson';

export const getUser = async () => {
  const auth = await fetchJson('/auth');

  const [ profile, notifications ] = await Promise.all([
    fetchJson(`/profile/${auth.userId}`, auth.jwt),
    fetchJson(`/notifications/${auth.userId}`, auth.jwt),
  ]);

  return parseUserData(auth, profile, notifications);
};
