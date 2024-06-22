import PDFDocument from "pdfkit";
import pdfModel from "../module/document.js";
import path from 'path';  
import fs from 'fs';


class PDFController {
    static async createPDF(req, res) {
        try {
            const Data = {...req.body};

            const agentData = await pdfModel.getAgentData(Data.IdA);

            let documentData;
            let documentTitle;
            if (Data.type === 'medicament') {
                documentData = await pdfModel.getMedicamentData(Data.IdV);
                documentTitle = 'Médicaments';
            } else if (Data.type === 'examenRadio') {
                documentData = await pdfModel.getExamenRadioData(Data.IdV);
                documentTitle = 'Examens Radiologiques';
            } else if (Data.type === 'examenBiologie') {
                documentData = await pdfModel.getExamenBiologieData(Data.IdV);
                documentTitle = 'Examens Biologiques';
            } else {
                throw new Error('Type de document non valide');
            }

            const doc = new PDFDocument();
            let filename = `${documentTitle.toLowerCase()}.pdf`;
            filename = encodeURIComponent(filename);
            res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
            res.setHeader('Content-type', 'application/pdf');

            doc.on('data', (chunk) => res.write(chunk));
            doc.on('end', () => res.end());

            
            const currentDir = new URL('.', import.meta.url).pathname;
            const logoPath = path.resolve(currentDir, 'C:\Users\DELL\Desktop\PfeSonatrach\control\Logo_sonatrach.png');
            if (fs.existsSync(logoPath)) {
                doc.image(logoPath, 50, 50, { width: 100 });
            } else {
                console.error('path probleme', logoPath);
            }
            // Ajouter les informations générales
           
            doc.fontSize(12).text('Activité Exploration Production');
            doc.fontSize(12).text(' Division Laboratoires ');
            doc.fontSize(12).text(' Centre de Médecine du Travail ');
            doc.fontSize(12).text('Avenue de 1er Novembre -35000');
            doc.moveDown().text(`Boumerdes le ${new Date().toLocaleDateString()}`, { align: 'right' });

            doc.moveDown().fontSize(12).text(`NOM: ${agentData.Nom}`);
            doc.moveDown().fontSize(12).text(`PRÉNOM: ${agentData.Prenom}`);
            doc.moveDown().fontSize(12).text(`ÂGE: ${calculateAge(agentData.DateN)}`);

            // Ajouter les informations spécifiques au document
            doc.fontSize(25).text('Ordonnance ', { align: 'center' });
            documentData.forEach((item) => {
                doc.moveDown().fontSize(12).text(`- ${item.nom || item.LiberMd}`);
            });

            doc.end();
        } catch (error) {
            console.error('Erreur lors de la création du PDF:', error);
            res.status(500).json({ error: 'Erreur lors de la création du PDF' });
        }
    }}
    function calculateAge(dateOfBirth) {
        const birthDate = new Date(dateOfBirth);
        const difference = Date.now() - birthDate.getTime();
        const ageDate = new Date(difference);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    export default PDFController;