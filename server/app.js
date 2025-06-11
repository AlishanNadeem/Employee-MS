const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Admin = require('./routes/Admin.route');
const Employee = require('./routes/Employee.route');
const Login = require('./routes/Login.route');

const app = express();

// Docker-compatible MongoDB connection with fallback
const mongoURI = process.env.MONGO_URI || 
    process.env.NODE_ENV === 'production' 
        ? 'mongodb://mongo-container:27017/EMS'  // Docker container name
        : 'mongodb+srv://alishan:admin@cluster0.8ic8r.mongodb.net/EMS';  // Your cloud DB for development

console.log('Connecting to MongoDB:', mongoURI.includes('mongo-container') ? 'Docker MongoDB' : 'Cloud MongoDB');

mongoose.connect(mongoURI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
})
.then(() => {
    console.log("Connected to Database successfully");
    console.log("Environment:", process.env.NODE_ENV || 'development');
})
.catch(err => {
    console.error("Could not connect to Database", err);
    console.error("Connection URI type:", mongoURI.includes('mongo-container') ? 'Docker' : 'Cloud');
    // Don't exit in development mode for debugging
    if (process.env.NODE_ENV === 'production') {
        process.exit(1);
    }
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_URL || ['http://localhost:3000', 'http://frontend-container:3000'],
    credentials: true
}));

// Routes
app.use('/', Login);
app.use('/admin', Admin);
app.use('/employee', Employee);

// Health check endpoint (already added - good!)
app.get('/health', (req, res) => {
    const healthCheck = {
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        service: 'EMS Backend API',
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        environment: process.env.NODE_ENV || 'development'
    };
    
    try {
        res.status(200).json(healthCheck);
    } catch (error) {
        healthCheck.status = 'ERROR';
        healthCheck.error = error.message;
        res.status(503).json(healthCheck);
    }
});

// Root endpoint for testing
app.get('/', (req, res) => {
    res.json({
        message: 'EMS Backend API is running',
        version: '1.0.0',
        endpoints: [
            '/health - Health check',
            '/admin - Admin routes',
            '/employee - Employee routes',
            '/ - Login routes'
        ]
    });
});

const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {  // Listen on all interfaces for Docker
    console.log(`EMS App is running on port ${port}...`);
    console.log(`Health check available at: http://localhost:${port}/health`);
});