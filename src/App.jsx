// App.js (komponen router induk)

// import Register from './Register';
// import Login from './Login';
// import Content from './Content';
import { useEffect, useState } from 'react';

import axios from 'axios';

const App = () => {

  const tableStyle = {
    border: "solid black 1px"
  }

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Pemanggilan API menggunakan Axios
    axios.get('http://127.0.0.1:3333/')
      .then(response => {
        setNotes(response.data.data.notes);
        console.log(response);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <table style={tableStyle} >
        <tr style={tableStyle}>
          <th style={tableStyle}>id</th>

          <th style={tableStyle}>title</th>
          <th style={tableStyle}>content</th>

        </tr>

        {notes && notes.map((notes, index) => {
          return (
            <tr key={index} style={tableStyle}>


              <td style={tableStyle}>{notes.id}</td>
              <td style={tableStyle}>{notes.title}</td>
              <td style={tableStyle}>{notes.content}</td>

            </tr>
          );

        })}



      </table>

    </>

  );
}

export default App; 
