package com.tavi.tavi_mrs.controller.mail;

import com.tavi.tavi_mrs.entities.json.EmailForm;
import com.tavi.tavi_mrs.entities.json.JsonResult;
import com.tavi.tavi_mrs.service.mail.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;

@RestController
@RequestMapping("api/v1/admin/send-mail")
public class MailController {

    @Autowired
    private MailService mailService;

    @PostMapping("mail")
    public ResponseEntity<JsonResult> sendMail(@RequestParam("email") String[] email,
                                               @RequestBody EmailForm emailForm) {

        boolean result = mailService.sendMail(email, emailForm.getHeader(), emailForm.getContent());
        if (result)
            return JsonResult.success("Mail");
        else
            return JsonResult.serverError("Mail ");
    }

//    @PostMapping("mail-with-attachment")
//    public ResponseEntity<JsonResult> sendMailWithAttachment(@RequestParam("email") String[] email,
//                                               @RequestBody EmailForm emailForm) throws MessagingException {
//
//        boolean result = mailService.sendMailWithAttachment(email, emailForm.getHeader(), emailForm.getContent(), emailForm.getUrlAttachment());
//        if (result)
//            return JsonResult.success("Mail");
//        else
//            return JsonResult.serverError("Mail ");
//    }



}
