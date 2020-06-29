import {saveAs} from 'file-saver'

export function downloadPatientAsJsonData(data : any) {
    let fileName = `patient-${data?.uid}.json`;
    let fileToSave = new Blob([JSON.stringify(data,undefined,2)], {
        type: 'application/json',
        name: fileName
    });
    
    // Save the file
    saveAs(fileToSave, fileName);
}