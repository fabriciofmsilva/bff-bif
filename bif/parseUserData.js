const getPhotoFromProfile = profile => {
  try {
    return profile.Photographs[0].URLS[0];
  } catch (err) {
    return '/images/placeholder.jpg'; // default to placeholder image
  }
};

const getFullNameFromProfile = profile => `${profile.Christian_Name} ${profile.Surname}`;

export default function parseUserData(authApiData, profileApiData, notificationsApiData) {
  const profile = profileApiData.Profiles[0];

  const result = {
    jwt: authApiData.jwt,
    id: authApiData.userId.toString(), // IDs should always be strings
    name: getFullNameFromProfile(profile),
    photoUrl: getPhotoFromProfile(profile),
    notifications: [], // notifications array should always exist, even if empty
  };

  Object.entries(notificationsApiData.data).forEach(([id, notification]) => {
    result.notifications.push({
      id,
      dateTime: new Date(Number(notification.timestamp) * 1000), // date from server was seconds since epoch, not milliseconds
      name: getFullNameFromProfile(notification.user),
      photoUrl: getPhotoFromProfile(notification.user),
      message: notification.message,
      premiumMember: notification.user.Enhanced === 'True', // honestly, who does this?
    })
  });

  return result;
}
