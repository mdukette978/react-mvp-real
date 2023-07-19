import { useState } from 'react';
import EntryCard from './EntryCard';

const EntryList = ({ entries, setEntries, getData }) => {
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [currentEntryId, setCurrentEntryId] = useState('');
    const [formData, setFormData] = useState({
        date: '',
        severity: '',
        location: '',
        trigger: '',
        treatment_method: '',
        relief: ''
      });


    const handleEdit = (entryId) => {        
        setCurrentEntryId(entryId);
        setShowEditPopup(true);

        const selectedEntry = entries.find((entry) => entry.entry_id === entryId);
            const dateWithoutTime = selectedEntry.date.split('T')[0];
        setFormData({...selectedEntry, date: dateWithoutTime});
    };

    const handleEditSubmit = async (updatedData) => {
        try {    
            console.log(updatedData);
            const response = await fetch(`http://localhost:3000/entries/${currentEntryId}`, {
                method: 'PUT',
                body: JSON.stringify(updatedData),
                headers: { 'Content-Type': 'application/json' }
            });
            console.log('Entry successfully edited');
            setShowEditPopup(false);
            getData();
        } catch (error) {
            console.error('Error occurred during edit:', error);
        }
      };

    
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Severity Level</th>
                        <th>Pain Location</th>
                        <th>Primary Trigger</th>
                        <th>Treatment Method</th>
                        <th>Any Relief?</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry) => (
                        <EntryCard 
                        entry={entry} 
                        key={entry.entry_id} 
                        setEntries={setEntries}
                        getData={getData}
                        handleEdit={() => handleEdit(entry.entry_id)}        
                        />
                    ))}
                </tbody>
            </table>

        {showEditPopup && (
        <div className="overlay">
        <dialog className='dialog-form' open>
            <form className="edit-form"method="dialog" onSubmit={(e) => {
            e.preventDefault();
                
            const formData = new FormData(e.target);
            const updatedData = Object.fromEntries(formData.entries());
            handleEditSubmit(updatedData);
          }}>
                <h2>Edit</h2>
                <label htmlFor="date">Date</label>
                <input id="date" type="text" name="date" value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}/>
                <label htmlFor="severity">Severity Level</label>
                {/* <input id="severity" type="text" name="severity" value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value })}/> */}
                <select name="severity" id="severity" value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value })}>
                    <option value=""></option>
                    <option value ='Light'>Light</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Severe">Severe</option>
                </select>
                <label htmlFor="location">Pain Location</label>
                <input id="location" type="text" name="location" value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}/>
                <label htmlFor="trigger">Primary Trigger</label>
                {/* <input id="trigger" type="text" name="trigger" value={formData.trigger}
                onChange={(e) => setFormData({ ...formData, trigger: e.target.value })}/> */}
                <select name="trigger" id="trigger" value={formData.trigger}
                onChange={(e) => setFormData({ ...formData, trigger: e.target.value })}>
                    <option value =""></option>
                    <option value ="Stress/Anxiety">Stress/Anxiety</option>
                    <option value="Lack of sleep">Lack of sleep</option>
                    <option value="Hunger/Dehydration">Hunger/Dehydration</option>
                    <option value="Injury/Strain">Injury/Strain</option>
                    <option value="Alcohol use">Alcohol use</option>
                    <option value="Illness/Allergies">Illness/Allergies</option>
                    <option value="Medication changes">Medication changes</option>
                    <option value="Hormonal changes">Hormonal changes</option>
                    <option value="Strong odor">Strong odor</option>
                    <option value="Bright light">Bright light</option>
                    <option value="Sound">Sound</option>
                    <option value="Travel">Travel</option>
                    <option value="Unsure">Unsure</option>
                </select>

                <label htmlFor="treatment">Treatment Method</label>
                {/* <input id="treatment" type="text" name="treatment_method" value={formData.treatment_method}
                onChange={(e) => setFormData({ ...formData, treatment_method: e.target.value })}/> */}
                <select name="treatment_method" id="treatment" value={formData.treatment_method}
                onChange={(e) => setFormData({ ...formData, treatment_method: e.target.value })}>
                    <option value =""></option>
                    <option value="None">None</option>
                    <option value="Rest/Sleep">Rest/Sleep</option>
                    <option value="Medication">Medication</option>
                    <option value="Food/Hydration">Food/Hydration</option>
                    <option value="Hot/Cold compresses">Hot/Cold Compresses</option>
                    <option value="Caffeine">Caffeine</option>
                    <option value="Shower">Shower</option>
                    <option value="Exercise">Exercise</option>
                </select>
                <label htmlFor="relief">Any Relief?</label>
                {/* <input id="relief" type="text" name="relief" value={formData.relief}
                onChange={(e) => setFormData({ ...formData, relief: e.target.value })}/> */}
                <select name="relief" id="relief" value={formData.relief}
                onChange={(e) => setFormData({ ...formData, relief: e.target.value })}>
                    <option value =""></option>
                    <option value ='Yes'>Yes</option>
                    <option value="No">No</option>
                </select>
                <div className="editFormBtns">
                <button id="edit-btn" type="submit">Save</button>
                <button id="cancel-btn" onClick={() => setShowEditPopup(false)}>Cancel</button>
                </div>
          </form>
        </dialog>
        </div>
      )}

        </>
    );
};


export default EntryList
