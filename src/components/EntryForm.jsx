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
        <div className='overlayNew'>
            {/* <button onClick={handleClick}>New</button> */}
            <form ref={formRef} className="form" onSubmit={handleSubmit}>
                {/* <div className="close-button-container"> */}
                    <button type="button" className="close-button" onClick={handleClose}>X</button>
                {/* </div> */}
                <label htmlFor="date" style={{ paddingTop: 15 }}>Date</label>
                <input id="date" type="date" name="date" />
                <label htmlFor="severity">Severity Level</label>
                <select name="severity" id="severity">
                    <option value=""></option>
                    <option value ='Light'>Light</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Severe">Severe</option>
                </select>
                <label htmlFor="location">Pain Location</label>
                <input id="location" type="text" name="location" placeholder='Front, top or back; Left or right-sided' />
                <label htmlFor="trigger">Primary Trigger</label>
                <select name="trigger" id="trigger">
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
                <select name="treatment_method" id="treatment">
                    <option value=""></option>
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
                <select name="relief" id="relief">
                    <option value=""></option>
                    <option value ='Yes'>Yes</option>
                    <option value="No">No</option>
                </select>
                <div style={{ paddingTop: 10, display: "flex", justifyContent: "center" }}>
                    <button style={{fontWeight: 'bold'}} id="submitBtn" className="submit-button" type="submit">Submit</button>
                    <button style={{ display: "none" }} id="saveChangesBtn" className="save-button" type="submit">
                        Save
                    </button>
                </div>
            </form>
        </div>
        
    )
}

export default EntryForm
