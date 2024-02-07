// Import necessary modules and models
import express from 'express';
import User from '../models/user.js'; // Assuming you have a model named User

// Initialize router
const router = express.Router();

// Route to get the access token from the database
router.get('/getAccessToken', async (req, res) => {
  try {
    const { email } = req.query;
    // Fetch the user from the database based on some criteria (e.g., email)
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract the access token from the user object
    const accessToken = user.access_token;

    // Return the access token in the response
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error('Error fetching access token:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Export router
export default router;
