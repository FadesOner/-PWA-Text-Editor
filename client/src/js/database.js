import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  export const putDb = async (content) => {
    const jateDb = await openDB('jate', 1);
    console.log(jateDb);
    const jx = jateDb.transaction('jate', 'readwrite');
    const store = jx.objectStore('jate');
    const request = store.put({ jate: content });
    const result = await request;
    console.log('data saved to the database', result);
  }
  
  export const getDb = async () => {
    const jateDb = await openDB('jate', 1);
    console.log(jateDb);
    const jx = jateDb.transaction('jate', 'readonly');
    const store = jx.objectStore('jate');
    const request = store.getAll();
    const result = await request;
    console.log('result.value', result);
    return result;
  };
  
  initdb();