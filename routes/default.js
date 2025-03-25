import { Router } from "express";
import { body } from 'express-validator';

import DefaultController from '../controller/defaultController.js';

const router = Router();

router.get("/", DefaultController.getHomePage);

router.get("/o-nama", DefaultController.getAboutPage);

router.get("/blog", DefaultController.getBlogPage);

router.get("/blog/:title", DefaultController.getPostPage);

router.get("/usluge", DefaultController.getServicesPage);

router.get("/usluge/:title", DefaultController.getServicePage);

router.get("/kontakt", DefaultController.getContactPage);

router.get('/uslovi-koriscenja', DefaultController.getTermsPage);

router.get("/politika-privatnosti", DefaultController.getPrivacyPage);

// router.get("/404", DefaultController.get404Page);

router.get("/preuzmite-usluge", DefaultController.getServicesToDownload);

router.post("/kontakt", [
    body('name').isLength({ min: 3 }).withMessage('Ime mora imati najmanje 3 karaktera!'),
    body('email').isEmail().withMessage('Unesite ispravnu email adresu!'),
    body('title').isIn(["Informacije", "Pitanje", "Partnerstvo"]).withMessage("Neispravan naslov."),
    body('message').isLength({ min: 10 }).withMessage('Poruka mora imati najmanje 10 karaktera!'),
    body('acceptance')
        .custom((value) => {
        if (!value) {
            throw new Error('Morate prihvatiti uslove.');
        }
        return true;
    }),
    body("honeypot")
    .custom((value) => {
    if (value) {
        throw new Error("Spam detektovan.");
    }
    return true;
    })
], DefaultController.postContact);

export default router;