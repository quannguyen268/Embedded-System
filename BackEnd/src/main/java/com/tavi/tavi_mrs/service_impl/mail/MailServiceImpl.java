package com.tavi.tavi_mrs.service_impl.mail;

import com.tavi.tavi_mrs.service.mail.MailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.util.List;
import java.util.logging.Level;


@Service
public class MailServiceImpl implements MailService {

    private static final Logger LOGGER = LoggerFactory.getLogger(MailServiceImpl.class);

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    String emailSender;

    @Value("${spring.upload.folder-upload}")
    String folderUpload;

    @Override
    public boolean sendMail(String[] userMail, String header, String content) {
        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setTo(userMail);
            mail.setFrom(emailSender);
            mail.setSubject(header);
            mail.setText(content);
            javaMailSender.send(mail);
            return true;
        } catch (MailException ex) {
            LOGGER.error("sendMail error", ex);
            ex.printStackTrace();
        }
        return false;
    }

    @Override
    public boolean sendHtmlMail(String[] userMail, String header, String content) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mail = new MimeMessageHelper(mimeMessage, "utf-8");
            mail.setTo(userMail);
            mail.setFrom(emailSender);
            mail.setSubject(header);
            mail.setText(content, true);
            javaMailSender.send(mimeMessage);
            return true;
        } catch (MailException | MessagingException ex) {
            LOGGER.error("sendMailHTML error", ex);
        }
        return false;
    }

    @Override
    public boolean sendMailWithAttachment(String[] listMail, String header, String content, List<String> attachFile) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true);
        try {
            helper.setTo(listMail);
            helper.setText(content, true);
            helper.setSubject(header);
            //file co san trong thu muc cua may
            if (attachFile != null) {
                for(String string : attachFile ) {
                    FileSystemResource file  = new FileSystemResource(new File(folderUpload+string));
                    helper.addAttachment(file.getFilename(), file);
                }
            }

        } catch (MessagingException e) {

            e.printStackTrace();
            return false;
        }
        javaMailSender.send(message);
        return true;
    }


    @Override
    public boolean sendHtmlMailPassWord(String userMail, String header, String content) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mail = new MimeMessageHelper(mimeMessage, "utf-8");
            mail.setTo(userMail);
            mail.setFrom(emailSender);
            mail.setSubject(header);
            mail.setText(content, true);
            javaMailSender.send(mimeMessage);
            return true;
        } catch (MailException | MessagingException ex) {
            LOGGER.error("sendHtmlMailPassWord error", ex);
        }
        return false;
    }

    @Override
    public boolean sendHtmlMail(String userMail, String header, String content) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mail = new MimeMessageHelper(mimeMessage, "utf-8");
            mail.setTo(userMail);
            mail.setFrom(emailSender);
            mail.setSubject(header);
            mail.setText(content, true);
            javaMailSender.send(mimeMessage);
            return true;
        } catch (MailException | MessagingException ex) {
            LOGGER.error("send-mail-error : {0}", ex.getMessage());
        }
        return false;
    }

}
