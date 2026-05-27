import { toast } from './toast';

/**
 * Opens the official Marbitech Properties & Investment Ltd. Corporate Profile
 * hosted securely on Google Drive in a new browser window.
 */
export const generateCompanyProfilePDF = (): void => {
  try {
    const driveUrl = "https://drive.google.com/file/d/1PcIKseJ_0WZB5OcnKfIvOkxQ_aZUMQtV/view?usp=drivesdk";
    
    // Create a temporary anchor element to open the PDF safely in a new tab
    const anchor = document.createElement('a');
    anchor.href = driveUrl;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    toast.success('Opening Marbitech Corporate Profile on Google Drive...');
  } catch (error) {
    console.error('Error launching corporate profile file link:', error);
    toast.error('Failed to open Google Drive Corporate Profile.');
  }
};
