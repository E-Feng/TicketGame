const getFirebaseKey = async () => {
  if (import.meta.env.VITE_FIREBASE_KEY) {
    return import.meta.env.VITE_FIREBASE_KEY;
  }

  const url = 'https://bmowiw89bd.execute-api.us-east-1.amazonaws.com/';
  const res = await fetch(url);
  const data = await res.text();

  return data;
};

export const FIREBASE_CONFIG = {
  apiKey: await getFirebaseKey(),
  authDomain: 'ticketgame-ffc51.firebaseapp.com',
  databaseURL: 'https://ticketgame-ffc51-default-rtdb.firebaseio.com',
  projectId: 'ticketgame-ffc51',
  storageBucket: 'ticketgame-ffc51.appspot.com',
  messagingSenderId: '408380915939',
  appId: '1:408380915939:web:5858627260db04475445d6',
};