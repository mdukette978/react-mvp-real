function EntryCard({ entry }) {
    return (
        <div className="card">
            <table className="table">
                <tr>
                    <td>{entry.date}</td>
                    <td>{entry.severity}</td>
                    <td>{entry.location}</td>
                    <td>{entry.trigger}</td>
                    <td>{entry.treatment_method}</td>
                    <td>{entry.relief}</td>
                    <td><button onClick={() => handleEdit(entry.id)}>Edit</button></td>
                    <td><button onClick={() => handleDelete(entry.id)}>Delete</button></td>
                </tr>
            </table>
        </div>
    )
}

export default EntryCard
