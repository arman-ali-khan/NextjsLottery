import mysql from 'mysql2/promise';

// Database connection configuration
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'bangladesh_lottery',
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Helper function to execute SQL queries
export async function query(sql: string, params: any[] = []) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Database schema setup (to be run once when setting up the application)
export async function setupDatabase() {
  try {
    // Create users table
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create tickets table
    await query(`
      CREATE TABLE IF NOT EXISTS tickets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ticket_number VARCHAR(20) NOT NULL UNIQUE,
        user_id INT,
        draw_id INT,
        purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status ENUM('active', 'drawn', 'won', 'expired') DEFAULT 'active',
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Create draws table
    await query(`
      CREATE TABLE IF NOT EXISTS draws (
        id INT AUTO_INCREMENT PRIMARY KEY,
        draw_name VARCHAR(255) NOT NULL,
        draw_date TIMESTAMP NOT NULL,
        draw_type ENUM('weekly', 'monthly', 'special') DEFAULT 'weekly',
        jackpot_amount DECIMAL(15, 2) NOT NULL,
        winning_numbers VARCHAR(100),
        status ENUM('upcoming', 'completed') DEFAULT 'upcoming',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create winners table
    await query(`
      CREATE TABLE IF NOT EXISTS winners (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        ticket_id INT,
        draw_id INT,
        prize_amount DECIMAL(15, 2) NOT NULL,
        prize_tier VARCHAR(50),
        claimed BOOLEAN DEFAULT FALSE,
        claim_date TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (ticket_id) REFERENCES tickets(id),
        FOREIGN KEY (draw_id) REFERENCES draws(id)
      )
    `);

    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Database setup error:', error);
    throw error;
  }
}

// Sample data insertion for demonstration
export async function insertSampleData() {
  try {
    // Insert sample draws
    await query(`
      INSERT IGNORE INTO draws (draw_name, draw_date, draw_type, jackpot_amount, winning_numbers, status)
      VALUES 
        ('Weekly Draw - June 2025', '2025-06-10 19:00:00', 'weekly', 25000000, '7,14,23,31,42,56', 'completed'),
        ('Monthly Special - May 2025', '2025-05-30 19:00:00', 'monthly', 50000000, '3,17,22,36,41,49', 'completed'),
        ('Eid-ul-Fitr Bumper Draw', '2025-04-15 19:00:00', 'special', 100000000, '5,13,27,34,45,58', 'completed'),
        ('Weekly Draw - June 2025', '2025-06-17 19:00:00', 'weekly', 30000000, NULL, 'upcoming')
    `);

    console.log('Sample data inserted successfully');
  } catch (error) {
    console.error('Sample data insertion error:', error);
    throw error;
  }
}