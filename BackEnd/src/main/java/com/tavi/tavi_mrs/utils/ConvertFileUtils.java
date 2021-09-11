package com.tavi.tavi_mrs.utils;

//import fr.opensagres.poi.xwpf.converter.pdf.PdfConverter;
//import fr.opensagres.poi.xwpf.converter.pdf.PdfOptions;
//import org.apache.poi.xwpf.usermodel.XWPFDocument;

import java.io.*;
import java.util.List;

public class ConvertFileUtils {

    public static String convertDocToPDF(String docPath, String pdfFileName) {
        try {
            String pdfPath = "D:\\files\\" + pdfFileName + ".pdf";

//            InputStream in = new FileInputStream(new File(docPath));
//            XWPFDocument document = new XWPFDocument(in);
//            PdfOptions options = PdfOptions.create();
//            OutputStream out = new FileOutputStream(new File(pdfPath));
//            PdfConverter.getInstance().convert(document, out, options);
//            document.close();
//            out.close();

            return pdfPath;
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }
}
