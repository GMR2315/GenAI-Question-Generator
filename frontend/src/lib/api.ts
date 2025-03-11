import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"; // ✅ Fallback to local

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Generate a question
export const generateQuestion = async (
  subject: string, 
  topic: string, 
  difficulty: string, 
  question_type: string, 
  custom_prompt?: string
) => {
  try {
    const response = await api.post('/generate-question', {
      subject,
      topic,
      difficulty,
      question_type,  // ✅ Fixed key name
      custom_prompt: custom_prompt || null, // ✅ Ensures optional support
    });
    return response.data;
  } catch (error) {
    console.error('Error generating question:', error);
    return null;
  }
};

// ✅ Fetch all saved questions
export const getSavedQuestions = async () => {
  try {
    const response = await api.get('/get-questions');
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
};

// ✅ Delete a question (with response handling)
export const deleteQuestion = async (id: string) => {
  try {
    await api.delete(`/delete-question/${id}`);
    return { success: true };
  } catch (error) {
    console.error('Error deleting question:', error);
    return { success: false, error };
  }
};

// ✅ Fetch total generated questions (for Home.tsx)
export const getStats = async () => {
  try {
    const response = await api.get('/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    return { totalQuestions: 0 }; // ✅ Fallback value
  }
};

export default api;
