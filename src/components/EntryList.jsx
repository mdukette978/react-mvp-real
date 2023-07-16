import EntryCard from './EntryCard';

const EntryList = ({ entries, setEntries, getData }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Severity</th>
                    <th>Location</th>
                    <th>Trigger</th>
                    <th>Treatment Method</th>
                    <th>Any Relief</th>
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
                    />
                ))}
            </tbody>
        </table>
    );
};

export default EntryList
