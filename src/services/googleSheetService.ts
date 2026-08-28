export interface SheetInquiryPayload {
  inquiryId: string;
  projectName: string;
  projectArea: string;
  fullName: string;
  phone: string;
  email: string;
  preferredDate: string;
  message: string;
  timestamp: string;
}

const STORAGE_KEY = 'starpath_google_sheet_webhook_url';
export const DEFAULT_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwFIzqMzszsSgB7aYUfqoBKMqy4_eLw-VDZChwhXeTChVUvmgI7zpLJBsm4dijnUNIj/exec';

export const getGoogleSheetWebhookUrl = (): string => {
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_WEBHOOK_URL;
};

export const setGoogleSheetWebhookUrl = (url: string): void => {
  localStorage.setItem(STORAGE_KEY, url.trim());
};


export const submitInquiryToGoogleSheet = async (payload: SheetInquiryPayload): Promise<{ success: boolean; message: string }> => {
  const webhookUrl = getGoogleSheetWebhookUrl();

  if (!webhookUrl) {
    console.log('Google Sheet Webhook is not configured yet. (Stored locally in app).');
    return { success: true, message: 'Saved to local admin CRM (Google Sheet URL optional).' };
  }

  try {
    // Standard Google Apps Script Webhook payload
    const formData = new URLSearchParams();
    formData.append('inquiryId', payload.inquiryId);
    formData.append('timestamp', payload.timestamp || new Date().toLocaleString());
    formData.append('projectName', payload.projectName);
    formData.append('projectArea', payload.projectArea);
    formData.append('fullName', payload.fullName);
    formData.append('phone', payload.phone);
    formData.append('email', payload.email || 'N/A');
    formData.append('preferredDate', payload.preferredDate || 'N/A');
    formData.append('message', payload.message || 'N/A');

    // Send with no-cors or standard fetch
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
    });

    return { success: true, message: 'Successfully sent to Google Sheets!' };
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return { success: false, message: 'Network error submitting to Google Sheets.' };
  }
};
