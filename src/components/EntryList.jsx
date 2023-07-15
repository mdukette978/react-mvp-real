import EntryCard from './EntryCard';

const EntryList = ({ entries }) => {
    return entries.map((entry) => (
        <EntryCard entry={entry} key={entry.id} />
    ));
    
};

export default EntryList
