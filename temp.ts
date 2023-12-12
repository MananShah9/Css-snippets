import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import xlsx from 'xlsx';
import { Pool } from 'pg';
import fs from 'fs';

const app = express();
const port = 3000;

// Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// PostgreSQL database setup
const pool = new Pool({
  user: 'your_db_user',
  host: 'your_db_host',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432,
});

function isValidData(data: any[]): boolean {
  // Your validation logic goes here
  // This is a basic example; you may need to customize it based on your specific data format and requirements
  return Array.isArray(data) && data.length > 0 && data[0].date && data[0].amount;
}

// API endpoint for file upload and processing
app.post('/upload', upload.single('excelFile'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Step 1: Save the received Excel file
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Save the file for future reference in the 'backups' folder
    const backupFolderPath = 'backups';
    if (!fs.existsSync(backupFolderPath)) {
      fs.mkdirSync(backupFolderPath);
    }

    const backupFilePath = `${backupFolderPath}/${file.originalname}`;
    fs.writeFileSync(backupFilePath, file.buffer);

    console.log(`File Size: ${file.size} bytes`);
    console.log(`File Name: ${file.originalname}`);
    console.log(`File saved at: ${backupFilePath}`);

    // Step 2: Open the Excel file and filter data based on provided month and year
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const filteredData = sheet.filter((row: any) => {
      // Assuming 'date' is the column name in the Excel sheet
      const date = new Date(row.date);
      return date.getMonth() === req.body.month && date.getFullYear() === req.body.year;
    });

    // Your logic to filter and transform data goes here
    // For simplicity, we'll multiply any value in the 'amount' column by 100
    const transformedData = filteredData.map((row: any) => {
      // Assuming 'amount' is the column name in the Excel sheet
      if (row.amount) {
        row.amount *= 100;
      }
      return row;
    });

    if (!isValidData(transformedData)) {
      return res.status(400).json({ error: 'Invalid data format or missing required fields' });
    }

    

    // Step 3: Check if data for the given month and year already exists in PostgreSQL table
    const tableName = req.body.tableName;
    const checkQuery = `SELECT COUNT(*) FROM ${tableName} WHERE EXTRACT(MONTH FROM date_column) = $1 AND EXTRACT(YEAR FROM date_column) = $2`;
    const checkResult = await pool.query(checkQuery, [req.body.month, req.body.year]);

    const dataExists = checkResult.rows[0].count > 0;

    // Step 4: Insert or update data based on existence
    if (dataExists) {
      // Your update logic goes here
      // Update 'amount' column based on your transformedData
      const updateQuery = `UPDATE ${tableName} SET amount = $1 WHERE EXTRACT(MONTH FROM date_column) = $2 AND EXTRACT(YEAR FROM date_column) = $3`;
      await pool.query(updateQuery, [transformedData[0].amount, req.body.month, req.body.year]);

      res.status(200).json({ message: 'Data already exists, updated records accordingly' });
    } else {
      // Your insert logic goes here
      // Insert data into the PostgreSQL table
      const insertQuery = `INSERT INTO ${tableName} (date_column, amount) VALUES ($1, $2)`;
      await pool.query(insertQuery, [transformedData[0].date, transformedData[0].amount]);

      res.status(200).json({ message: 'Data inserted successfully' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
