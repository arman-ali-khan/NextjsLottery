const { setupDatabase, insertSampleData } = require('../lib/db');

async function main() {
  try {
    console.log('Setting up database...');
    await setupDatabase();
    
    console.log('Inserting sample data...');
    await insertSampleData();
    
    console.log('Database setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

main();