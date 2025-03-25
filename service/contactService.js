import ErrorHelper from '../helper/errorHelper.js';
import EmailService from './emailService.js';

class ContactService {
    static async sendNewContactNotification(data) {
        try {
            const isSent = await EmailService.sendNewContactNotification(data);

            if (!isSent) {
                ErrorHelper.throwEmailError('Email nije poslat!');
            }
            
        } catch (error) {
            ErrorHelper.throwServerError(error);
        }
    }
}

export default ContactService;