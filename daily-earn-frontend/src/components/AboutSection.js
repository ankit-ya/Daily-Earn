import React from 'react';
import './AboutSection.css'; // Import your CSS file for styling

const AboutSection = () => {
    return (
        <div className="about-section">
            <h1>About Daily Earn</h1>
            <p>Daily Earn is a task completion and earning platform that allows users to earn rewards by completing various tasks. Whether it's data entry, surveys, content writing, or reading stories, there's something for everyone!</p>

            <h2>How to Play:</h2>
            <ol>
                <li><strong>Create an Account:</strong> Sign up by providing your username, email, and password. Verify your email to activate your account.</li>
                <li><strong>Browse Tasks:</strong> Explore the available tasks in different categories. Choose tasks that interest you or align with your skills.</li>
                <li><strong>Complete Tasks:</strong> Follow the instructions provided for each task. Ensure you complete the tasks accurately to earn rewards.</li>
                <li><strong>Earn Coins:</strong> Upon successful completion, you will earn coins. Coins can be converted into real money.</li>
                <li><strong>Withdraw Earnings:</strong> Once you've accumulated enough earnings, you can request a withdrawal. Follow the guidelines for the minimum withdrawal amount.</li>
            </ol>

            <h2>Step-by-Step Instructions for Performing Tasks:</h2>
            <ol>
                <li>Log in to your Daily Earn account.</li>
                <li>Navigate to the "Tasks" section.</li>
                <li>Select a task from the list.</li>
                <li>Read the task description carefully.</li>
                <li>Complete the task according to the instructions.</li>
                <li>Submit your completed task for review.</li>
                <li>Check your withdraw to see your newly earned coins.</li>
            </ol>

            <h2>Rewards and Bonuses:</h2>
            <p>Daily Earn rewards users with coins for every completed task. Additional bonuses are available for completing a certain number of tasks in a week.</p>

            <h2>Support:</h2>
            <p>If you have any questions or issues, feel free to reach out to our support team at <a href="mailto:dailyearn@gmail.com">Contact us </a>
            dailyearn@gmail.com .</p>

            <h2>Additional Details:</h2>
            <ul>
                <li>Daily Earn values your time and effort.</li>
                <li>We aim to provide a user-friendly experience for all our users.</li>
                <li>Your feedback is essential for improving the platform.</li>
            </ul>
        </div>
    );
};

export default AboutSection;
