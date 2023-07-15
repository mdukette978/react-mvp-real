
import EntryList from './components/EntryList';
// import Container from './components/Container';

import { useState, useEffect } from 'react'
import './styles.css';

function App() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('http://localhost:3000/entries');
      const results = await response.json();
      console.log(results);
      setEntries(results);
    }
    getData();
  }, []);

  // useEffect(() => {
  //   const deleteData = async () => {
  //     const trailId = deleteBtn.dataset.trail_id;
  //     const response = await fetch (`http://localhost:3000/entries/trails/${entryId}`)
  //       method: 'DELETE'
  //   };
  //   deleteData();
  //   console.log(`entry was deleted.`);
  // }, []);


  return (
    <div>
      <h1>Headache Diary</h1>
      <button>New</button>
      <table>
        <tr>
          <th>Date</th>
          <th>Severity</th>
          <th>Location</th>
          <th>Trigger</th>
          <th>Treatment Method</th>
          <th>Any Relief</th>
        </tr>
      </table>
      <EntryList entries={entries}/>
    </div>
  )
}

export default App
