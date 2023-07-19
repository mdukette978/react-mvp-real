
const Analytics = ({ entries }) => {

    function calculateAverageSevereMigrainesPerMonth(entries) {
        const severeMigrainesPerMonth = {};
        const monthsPerSeverity = {};
      
        // Loop through the entries to calculate the number of severe migraines for each month
        entries.forEach((entry) => {
          const date = new Date(entry.date);
          const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
      
          if (entry.severity === 'Severe') {
            if (severeMigrainesPerMonth[monthYear]) {
              severeMigrainesPerMonth[monthYear]++;
            } else {
              severeMigrainesPerMonth[monthYear] = 1;
            }
          }
      
          if (monthsPerSeverity[monthYear]) {
            monthsPerSeverity[monthYear]++;
          } else {
            monthsPerSeverity[monthYear] = 1;
          }
        });
      
        const totalSevereMigraines = Object.values(severeMigrainesPerMonth).reduce(
          (acc, val) => acc + val,
          0
        );
        const totalMonths = Object.keys(monthsPerSeverity).length;
        const averageSevereMigrainesPerMonth = (totalSevereMigraines / totalMonths).toFixed(1);
      
        return averageSevereMigrainesPerMonth;
      }

      const deabilitation = calculateAverageSevereMigrainesPerMonth(entries);


      function calculateMostCommonTrigger(entries) {
        const triggerCount = {};

        entries.forEach((entry) => {
          const trigger = entry.trigger;
          if (triggerCount[trigger]) {
            triggerCount[trigger]++;
          } else {
            triggerCount[trigger] = 1;
          }
        });

        let mostCommonTrigger = '';
        let maxCount = 0;
        for (const trigger in triggerCount) {
          if (triggerCount[trigger] > maxCount) {
            mostCommonTrigger = trigger;
            maxCount = triggerCount[trigger];
          }
        }
      
        return mostCommonTrigger;
      }

      const trigger = calculateMostCommonTrigger(entries) 


      function calculateAverageMigrainesPerMonth(entries) {
        // Create an object to store the number of migraines for each month
        const migrainesPerMonth = {};
      
        // Loop through the entries to calculate the number of migraines for each month
        entries.forEach((entry) => {
          const date = new Date(entry.date);
          const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
      
          if (migrainesPerMonth[monthYear]) {
            migrainesPerMonth[monthYear]++;
          } else {
            migrainesPerMonth[monthYear] = 1;
          }
        });
      
        // Calculate the total number of migraines and the total number of months
        const totalMigraines = Object.values(migrainesPerMonth).reduce(
          (acc, val) => acc + val,
          0
        );
        const totalMonths = Object.keys(migrainesPerMonth).length;
        const averageMigrainesPerMonth = (totalMigraines / totalMonths).toFixed(1);
      
        return averageMigrainesPerMonth;
      }

      const avMigraines = calculateAverageMigrainesPerMonth(entries) 

    return (
        <>
            <div className="outerAnalytics">
                <div className="analytics">
                    <span style={{fontSize: '20px', fontWeight: "bold"}}>Average Occurrences</span><br></br>
                    <div style={{marginTop:'5px'}}>
                        <span style={{fontWeight: "bold", fontSize: '45px'}}>{avMigraines}</span> <br></br>
                        <span style={{fontSize: '16px'}}>Per Month</span>
                    </div>
                </div>
                <div className="analytics">
                    <span style={{fontSize: '20px', fontWeight: "bold"}}>Most Common Trigger</span><br></br>
                    <div style={{marginTop: '20px'}}>
                        <span style={{ fontSize: '30px', fontWeight: "bold"}}>{trigger}</span>
                    </div>
                </div>
                <div className="analytics">
                    <span style={{fontSize: '20px', fontWeight: "bold"}}>Debilitated Days</span><br></br>
                    <div style={{marginTop:'5px'}}>
                        <span style={{fontWeight: "bold", fontSize: '45px'}}>{deabilitation}</span> <br></br>
                        <span style={{fontSize: '16px'}}>Per Month</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Analytics