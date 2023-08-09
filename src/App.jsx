// App.js (komponen router induk)

// import Register from './Register';
// import Login from './Login';
// import Content from './Content';
import { useEffect, useState } from 'react';

import axios from 'axios';

const App = () => {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Pemanggilan API menggunakan Axios
    fetch.get('http://127.0.0.1:3333/')
      .then(response => {
        setNotes(response.notes);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      {notes}
      condet
    </div>
  );
}

export default App; 
