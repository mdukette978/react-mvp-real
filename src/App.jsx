import Analytics from './components/Analytics';
import EntryList from './components/EntryList';
import EntryForm from './components/EntryForm';

import logo from "./imgs/5brainresize.png";
import { useState, useEffect } from 'react'
import './styles.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [formOpen, setFormOpen] = useState(false);

  const getData = async () => { 
    try {
      const response = await fetch('http://localhost:3000/entries');
      const results = await response.json();

      const entriesDateOnly = results.map(entry => {
        // Extract the date part (YYYY-MM-DD) from the full date-time string
        const dateWithoutTime = entry.date.split('T')[0];
        // Return a new entry object with only the date part in the date property
        return { ...entry, date: dateWithoutTime };
      });

      setEntries(entriesDateOnly);
      console.log(results);
      // const dateWithoutTime = results.date.split('T')[0];
      // setEntries({...results, date: dateWithoutTime});
    } catch (error) {
      console.error('Error occurred during data fetch:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  return (
    <div>
      <header className="sticky-header" style={{ margin: '20px'}}>
        <button style={{fontWeight: 'bold' }} onClick={() => setFormOpen(true)}>New</button>
      </header>


  
      {formOpen && (
        <EntryForm 
        closeForm={() => setFormOpen(false)}
        getData={getData}
        />

        )}

        <div>
      <img style={{ paddingBottom: '20px', position: 'relative' }}src={logo} alt="Image"/>
      </div>

        <EntryList 
        entries={entries}
        setEntries={setEntries}
        getData={getData}
        />

        <Analytics         
        entries={entries}
        />

        <footer className='footer'>
          <p>Copyright 2023 MigraineBrain, Inc</p>
        </footer>

    </div>
  )
};

export default App
