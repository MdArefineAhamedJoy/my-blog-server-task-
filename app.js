const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/user');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use('/api', blogRoutes);
app.use('/api', userRoutes);


const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
