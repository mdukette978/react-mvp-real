
import EntryList from './components/EntryList';
import EntryForm from './components/EntryForm';
import logo from "./imgs/copy-brain-4x4.png";
import { useState, useEffect } from 'react'
import './styles.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [formOpen, setFormOpen] = useState(false);

  const getData = async () => { 
    try {
      const response = await fetch('http://localhost:3000/entries');
      const results = await response.json();
      console.log(results);
      setEntries(results);
    } catch (error) {
      console.error('Error occurred during data fetch:', error);
    }
  };

  const handleOpen = () => {
    favDialog.showModal();
  }


  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div style={{ margin: '20px' }}>
        <button onClick={() => setFormOpen(true)}>New</button>
      </div>
      {/* <h1>Headache Diary</h1> */}
      <img style={{ paddingBottom: '20px' }}src={logo} alt="Image"/>

      <button onClick={handleOpen}>Open Button</button>
      <dialog id="favDialog">
        <p>Greetings, one and all!</p>
        <form method="dialog">
          <button>OK</button>
        </form>
      </dialog >

        <EntryList 
        entries={entries}
        setEntries={setEntries}
        getData={getData}
        />
        {formOpen && (
        <EntryForm 
        closeForm={() => setFormOpen(false)}
        getData={getData}
        />
        // <EditForm />
        )}
    </div>
  )
};

export default App
