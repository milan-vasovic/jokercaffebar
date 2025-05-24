import { validationResult } from 'express-validator';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import fetch from 'node-fetch';
import fs from "fs";
import sanitizeHtml from 'sanitize-html';
import PostService from '../service/postService.js';
import ServiceService from '../service/servicesService.js';
import ContactService from '../service/contactService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getHomePage(req, res, next) {
    try {
        const posts = await PostService.findSomePosts();
        const services = await ServiceService.findServices();

        const sheetId = "1k2RhvL3Pwc5Zid3sARQ54zjQrm-fJfH2ag_jF6EAJQ4";
        const sheetName = "Igraci";
        const pageUrl = req.protocol + '://' + req.get('host') + req.originalUrl
        const response = await fetch(`https://opensheet.elk.sh/${sheetId}/${sheetName}`);
        const players = await response.json();

        return res.status(200).render('leanding/leanding-page', {
            path: "/",
            pageTitle: 'Početna',
            pageDescription: 'Početna stranica Joker Caffe Bara, kratak pregled ponude i usluga.',
            pageKeyWords: 'Početna, Joker, Caffe, Bar, ponuda, usluge, biljar, pikado, teambuilding, proslave, eventi, zabava, druženje, kafić, kafa, piće, alkohol, kokteli, Novi Sad, Srbija',
            pageUrl: pageUrl,
            pageImage: pageUrl + '/image/joker_caffe_bar.jpg',
            posts,
            services,
            players
        });
    } catch (error) {
        next(error);
    }
}

async function getBlogPage(req, res, next) {
    try {
        const posts = await PostService.findPosts();
        return res.status(200).render('public/blog', {
            path: "/blog",
            pageTitle: 'Blog',
            pageDescription: 'Blog Joker Caffe Bara, najnovije vesti i dešavanja.',
            pageKeyWords: 'Blog, Joker, Caffe, Bar, vesti, dešavanja, novosti, događaji, slike, video, Novi Sad, Srbija',
            pageUrl: req.protocol + '://' + req.get('host') + req.originalUrl,
            pageImage: req.protocol + '://' + req.get('host') + req.originalUrl + '/image/joker_caffe_bar.jpg',
            posts
        });
    } catch (error) {
        next(error);
    }
}

async function getPostPage(req, res, next){
    try {
        const title = req.params.title;
        const post = await PostService.findPostByTitle(title);

        return res.status(200).render('public/post-details', {
            path: "/blog",
            pageTitle: post.title,
            pageDescription: post.shortDescription,
            pageKeyWords: post.keyWords,
            pageUrl: req.protocol + '://' + req.get('host') + req.originalUrl,
            pageImage: req.protocol + '://' + req.get('host') + req.originalUrl + '/image/joker_caffe_bar.jpg',
            post
        });
    } catch (error) {
        next(error);
    }
}

async function getServicesPage(req, res, next) {
    try {
        const services = await ServiceService.findServices();
        return res.status(200).render('public/services', {
            path: "/usluge",
            pageTitle: 'Usluge',
            pageDescription: 'Usluge Joker Caffe Bara, pogledajte šta sve nudimo.',
            pageKeyWords: 'Usluge, Joker, Caffe, Bar, usluge, biljar, pikado, teambuilding, proslave, eventi, zabava, druženje, kafić, kafa, piće, alkohol, kokteli, Novi Sad, Srbija',
            pageUrl: req.protocol + '://' + req.get('host') + req.originalUrl,
            pageImage: req.protocol + '://' + req.get('host') + req.originalUrl + '/image/joker_caffe_bar.jpg',
            services
        });
    } catch (error) {
        next(error);
    }
}

async function getServicePage(req, res, next){
    try {
        const title = req.params.title;
        const service = await ServiceService.findServiceByTitle(title);

        return res.status(200).render('public/service-details', {
            path: "/usluge",
            pageTitle: service.title,
            pageDescription: service.shortDescription,
            pageKeyWords: service.keyWords,
            pageUrl: req.protocol + '://' + req.get('host') + req.originalUrl,
            pageImage: req.protocol + '://' + req.get('host') + req.originalUrl + '/image/joker_caffe_bar.jpg',
            service
        });
    } catch (error) {
        next(error);
    }
}
async function getAboutPage(req, res, next) {
    try {
        return res.status(200).render('public/aboutus', {
            path: "/o-nama",
            pageTitle: 'O Nama',
            pageDescription: 'Joker Caffe Bara, upoznajte nas, saznajte gde se nalazomo i šta sve nudimo.',
            pageKeyWords: 'O Nama, Joker, Caffe, Bar, usluge, biljar, pikado, teambuilding, proslave, eventi, zabava, druženje, kafić, kafa, piće, alkohol, kokteli, Novi Sad, Srbija',
            pageUrl: req.protocol + '://' + req.get('host') + req.originalUrl,
            pageImage: req.protocol + '://' + req.get('host') + req.originalUrl + '/image/joker_caffe_bar.jpg',
        });
    } catch (error) {
        next(error);
    }
}

async function getPrivacyPage(req, res, next) {
    try {
        return res.render("public/privacy-policy", {
            path: "/politika-privatnosti",
            pageTitle: "Politika Privatnosti",
            pageDescription: "Naša politika privatnosti, sve na jednom mestu, sve potrebne informacije šta i kako prikupljamo, u koju svrhu i vaša prava",
            pageKeyWords: "Politika Privatnosti, Informacije, Prava",
            pageUrl: req.protocol + '://' + req.get('host') + req.originalUrl,
            pageImage: req.protocol + '://' + req.get('host') + req.originalUrl + '/image/joker_caffe_bar.jpg',
        })
    } catch (error) {
        next(error);
    }
}

async function getTermsPage(req, res, next) {
    try {
        return res.render("public/tearms-conditions", {
            path: "/uslovi-koriscenja",
            pageTitle: "Uslovi Koriscenja",
            pageDescription: "Naši uslovi korišćenja, pravila, odgovornost, prihvatnaje, saglasnost, mere i ostale inforamcije.",
            pageKeyWords: "Uslovi Korišćenja, Pravila, Informacije, Mere, Obaveze",
            pageUrl: req.protocol + '://' + req.get('host') + req.originalUrl,
            pageImage: req.protocol + '://' + req.get('host') + req.originalUrl + '/image/joker_caffe_bar.jpg',
        });
    } catch (error) {
        next(error);
    }
}

async function getServicesToDownload(req, res, next) {
    try {
      const filePath = join(__dirname, '..', 'data', 'pdf', 'Team-Building-Kao-Nikada-Do-Sada.pdf');
  
      if (!fs.existsSync(filePath)) {
        return res.status(404).send('Fajl nije pronađen.');
      }
  
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="Team-Building-Kao-Nikada-Do-Sada.pdf"');
  
      const fileStream = fs.createReadStream(filePath);
  
      fileStream.on('error', (err) => {
        console.error('Greška pri čitanju PDF-a:', err);
        return next(err);
      });
  
      fileStream.pipe(res);
    } catch (error) {
      next(error);
    }
}

async function getContactPage(req, res, next) {
    try {
        return res.render("public/contact", {
            path: "/kontakt",
            pageTitle: "Kontaktirajte Nas",
            pageDescription: "Kontaktirajte nas brzo i lako putem forme ili telefona.",
            pageKeyWords: "Kontakt, Pitanja, Kontaktirajte Nas, Pozovite",
            errorMessage: "",
            existingData: {},
            pageUrl: req.protocol + '://' + req.get('host') + req.originalUrl,
            pageImage: req.protocol + '://' + req.get('host') + req.originalUrl + '/image/joker_caffe_bar.jpg',
        });
    } catch (error) {
        next(error);
    }
}

async function postContact(req, res, next) {
    try {
        const { name, email, title, phone, message } = req.body;
        const sanitizedName = sanitizeHtml(name);
        const sanitizedEmail = sanitizeHtml(email);
        const sanitizedTitle = sanitizeHtml(title);
        const sanitizedPhone = sanitizeHtml(phone);
        const sanitizedMessage = sanitizeHtml(message);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).render("public/contact", {
                path: "/kontakt",
                pageTitle: "Kontaktirajte Nas",
                pageDescription: "Kontaktirajte nas brzo i lako putem forme ili telefona.",
                pageKeyWords: "Kontakt, Pitanja, Kontaktirajte Nas, Pozovite",
                errorMessage: errors.array()[0].msg,
                existingData: {
                    name: sanitizedName,
                    email: sanitizedEmail,
                    title: sanitizedTitle,
                    phone: sanitizedPhone,
                    message: sanitizedMessage,
                },
                pageUrl: req.protocol + '://' + req.get('host') + req.originalUrl,
                pageImage: req.protocol + '://' + req.get('host') + req.originalUrl + '/image/joker_caffe_bar.jpg',
            });
        }

        await ContactService.sendNewContactNotification({
            name: sanitizedName,
            email: sanitizedEmail,
            title: sanitizedTitle,
            phone: sanitizedPhone,
            message: sanitizedMessage,
        });

        return res.status(200).render("public/success", {
            path: '/uspeh',
            pageTitle: 'Uspešno Ste Poslali Poruku',
            pageDescription: 'Uspešno Ste Poslali Poruku, hvala Vam što ste nas kontaktirali.',
            pageKeyWords: 'Uspešno Ste Poslali Poruku, Hvala Vam, Kontakt, Poruka, Joker, Caffe, Bar, Novi Sad, Srbija',
            message: "Uspešno ste poslali poruku, hvala Vam što ste nas kontaktirali.",
            pageUrl: req.protocol + '://' + req.get('host') + req.originalUrl,
            pageImage: req.protocol + '://' + req.get('host') + req.originalUrl + '/image/joker_caffe_bar.jpg',
        });
    } catch (error) {
        next(error);
    }
}

export default {
    getHomePage,
    getBlogPage,
    getPostPage,
    getServicesPage,
    getServicePage,
    getAboutPage,
    getPrivacyPage,
    getTermsPage,
    getContactPage,
    getServicesToDownload,
    postContact
}