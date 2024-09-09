const fs = require('fs').promises;

const csvFilePath = 'C:/develop/Semester5/WEB/praktikum6/code/csv/population.csv';
const jsonOutputPath = 'C:/develop/Semester5/WEB/praktikum6/code/population.json';

const startTime = new Date();

async function readCSVFileAsync() {
    try {
        // Read the CSV file asynchronously
        const csvData = await fs.readFile(csvFilePath, 'utf8');

        // Get file stats
        const fileStats = await fs.stat(csvFilePath);

        // Calculate the time taken to read the file
        const endTime = new Date();
        const elapsedTimeReading = (endTime - startTime) / 1000; // in seconds

        // Measure the start of processing time
        const processingStartTime = new Date();

        // Split CSV into records (assuming records are newline-separated)
        const records = csvData.split('\n');
        const headers = records[0].split(',');

        // Calculate the number of records (excluding the header)
        const numRecords = records.length - 1; // Subtract 1 for the header row

        // Convert CSV data to JSON
        const jsonData = [];
        for (let i = 1; i < records.length; i++) {
            const record = records[i].split(',');
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = record[j];
            }
            jsonData.push(obj);
        }

        // Write JSON data to the output file
        await fs.writeFile(jsonOutputPath, JSON.stringify(jsonData, null, 2), { flag: 'wx' }, function (err) {
            if (err) throw err;
            console.log("It's saved!");
        });

        // Calculate the time taken for processing
        const processingEndTime = new Date();
        const elapsedTimeProcessing = (processingEndTime - processingStartTime) / 1000; // in seconds

        // Output information
        console.log('CSV File Information:');
        console.log(`File Size: ${fileStats.size} bytes`);
        console.log(`Last Modified: ${fileStats.mtime}`);
        console.log(`Number of Records: ${numRecords}`);
        console.log(`Time Taken to Read: ${elapsedTimeReading} seconds`);
        console.log(`Time Taken for Processing: ${elapsedTimeProcessing} seconds`);
        console.log(`JSON data written to ${jsonOutputPath}`);
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

readCSVFileAsync();