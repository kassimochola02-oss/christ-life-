/**
 * API Service for Christ Life Bweyogerere
 * This service handles communication with the backend.
 */

const API_BASE_URL = 'http://localhost:3001/api'; // Update with your actual backend URL in production

export const CLB_API = {
  /**
   * Fetch current announcements/highlights
   */
  getAnnouncements: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/announcements`);
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      return { status: 'error', data: [] };
    }
  },

  /**
   * Submit a donation record
   */
  submitDonation: async (donationData: {
    amount: number;
    phone: string;
    type: string;
    donorName?: string;
  }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/donations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donationData),
      });
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  /**
   * Fetch live stream status
   */
  getStreamStatus: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/stream/status`);
      return await response.json();
    } catch (error) {
      return { isLive: false };
    }
  }
};
