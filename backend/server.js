const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

// Middleware for authentication (JWT)
const { authenticateJWT } = require('./middleware/authMiddleware');

app.use('/api/auth', authRoutes);
app.use('/api/tasks', authenticateJWT, taskRoutes);

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.log(err));


connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
