
const EntryCard = ({ entry, getData }) => {

    const handleDelete = async (e) => {
        console.log(e.target.id);
        const entryId = e.target.id;
        try {
            const response = await fetch(`http://localhost:3000/entries/${entryId}`, {
              method: 'DELETE',
            });
            console.log('Entry successfully deleted')
            await getData();
        } catch (error) {
            console.error('Error occurred during delete:', error);
        }
    };

    const handleEdit = async (e) => {
        console.log(e.target.id);
        const entryId = e.target.id;
        try {
            const response = await fetch(`http://localhost:3000/entries/${entryId}`, {
              method: 'PUT',
            });
            console.log('Entry successfully edited')
            await getData();
        } catch (error) {
            console.error('Error occurred during edit:', error);
        }
    };
    

    return (
        <tr>
            <td>{entry.date}</td>
            <td>{entry.severity}</td>
            <td>{entry.location}</td>
            <td>{entry.trigger}</td>
            <td>{entry.treatment_method}</td>
            <td>{entry.relief}</td>
            <td><button onClick={handleEdit} id={entry.entry_id}>Edit</button></td>
            <td><button onClick={handleDelete} id={entry.entry_id}>Delete</button></td>
        </tr>
    )
}

export default EntryCard
