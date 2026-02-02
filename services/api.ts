
/**
 * API Service for Christ Life Bweyogerere
 * Connects to the Python FastAPI Backend
 */

const API_BASE_URL = 'http://localhost:3001/api';

export const CLB_API = {
  /**
   * Fetch current announcements/highlights
   */
  getAnnouncements: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/announcements`);
      const data = await response.json();
      return { status: 'success', data };
    } catch (error) {
      console.error('Python API Error:', error);
      return { status: 'error', data: [] };
    }
  },

  /**
   * Initiate a payment via the Python backend
   */
  initiatePayment: async (paymentData: {
    amount: string;
    phone: string;
    provider: string;
    purpose: string;
  }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });
      return await response.json();
    } catch (error) {
      console.error('Payment API Error:', error);
      throw error;
    }
  },

  /**
   * Fetch the remote control state from the Admin Python server
   */
  getControlState: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/control`);
      return await response.json();
    } catch (error) {
      return { is_live: false, global_alert: null, force_view: null };
    }
  }
};
