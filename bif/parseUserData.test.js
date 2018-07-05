import parseUserData from './parseUserData';

it('should parse the data', () => {
  const authApiData = {
    userId: 1234,
    jwt: 'the jwt',
  };
  
  const profileApiData = {
    Profiles: [
      {
        id: 1234,
        Christian_Name: 'David',
        Surname: 'Gilbertson',
        Photographs: [
          {
            Size: 'Medium',
            URLS: [
              '/images/david.png',
            ],
          },
        ],
        Last_Login: '2018-01-01'
      },
    ],
  };
  
  const notificationsApiData = {
    data: {
      'msg-1234': {
        timestamp: '1529739612',
        user: {
          Christian_Name: 'Alice',
          Surname: 'Guthbertson',
          Enhanced: 'True',
          Photographs: [
            {
              Size: 'Medium',
              URLS: [
                '/images/alice.png'
              ]
            }
          ]
        },
        message_summary: 'Hey I like your hair, it re',
        message: 'Hey I like your hair, it really goes nice with your eyes'
      },
      'msg-5678': {
        timestamp: '1529731234',
        user: {
          Christian_Name: 'Bob',
          Surname: 'Smelthsen',
        },
        message_summary: 'I\'m launching my own cryptocu',
        message: 'I\'m launching my own cryptocurrency soon and many thanks for you to look at and talk about'
      },
    },
  };

  const parsedData = parseUserData(authApiData, profileApiData, notificationsApiData);

  expect(parsedData).toEqual({
    jwt: 'the jwt',
    id: '1234',
    name: 'David Gilbertson',
    photoUrl: '/images/david.png',
    notifications: [
      {
        id: 'msg-1234',
        dateTime: expect.any(Date),
        name: 'Alice Guthbertson',
        premiumMember: true,
        photoUrl: '/images/alice.png',
        message: 'Hey I like your hair, it really goes nice with your eyes'
      },
      {
        id: 'msg-5678',
        dateTime: expect.any(Date),
        name: 'Bob Smelthsen',
        premiumMember: false,
        photoUrl: '/images/placeholder.jpg',
        message: 'I\'m launching my own cryptocurrency soon and many thanks for you to look at and talk about'
      },
    ],
  });
});
