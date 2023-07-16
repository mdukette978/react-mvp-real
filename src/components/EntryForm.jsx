import { useRef } from 'react';


const EntryForm = ({ postData, closeForm, getData }) => {
    
    const formRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);

        const formDataObj = {};
        formData.forEach((value, key) => {
            formDataObj[key] = value;
    });
            console.log(formDataObj);
            
        try {
            const response = await fetch('http://localhost:3000/entries', {
            method: 'POST',
            body: JSON.stringify(formDataObj),
            headers: {'Content-Type': 'application/json'},
    });
            console.log('Entry successfully submitted');
            closeForm();
            e.target.reset();
            await getData();
            
        } catch (error) {
            console.error('Error occurred during submission:', error);
        }
    };


    const handleClose = () => {
            closeForm();
    }
    

    return (
        <div>
            {/* <button onClick={handleClick}>New</button> */}
            <form ref={formRef} className="form" onSubmit={handleSubmit}>
                {/* <div className="close-button-container"> */}
                    <button type="button" className="close-button" onClick={handleClose}>X</button>
                {/* </div> */}
                <label htmlFor="date" style={{ paddingTop: 15 }}>Date</label>
                <input id="date" type="text" name="date" />
                <label htmlFor="severity">Severity</label>
                <input id="severity" type="text" name="severity" />
                <label htmlFor="location">Location</label>
                <input id="location" type="text" name="location" />
                <label htmlFor="trigger">Trigger</label>
                <input id="trigger" type="text" name="trigger" />
                <label htmlFor="treatment">Treatment Method</label>
                <input id="treatment" type="text" name="treatment_method" />
                <label htmlFor="relief">Any Relief?</label>
                <input id="relief" type="text" name="relief" />
                
                <div style={{ paddingTop: 10, display: "flex", justifyContent: "center" }}>
                    <button id="submitBtn" className="submit-button" type="submit">Submit</button>
                    <button style={{ display: "none" }} id="saveChangesBtn" className="save-button" type="submit">
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EntryForm
