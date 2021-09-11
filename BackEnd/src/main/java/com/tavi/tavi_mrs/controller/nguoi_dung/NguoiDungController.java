package com.tavi.tavi_mrs.controller.nguoi_dung;

import com.tavi.tavi_mrs.entities.json.JsonResult;
import com.tavi.tavi_mrs.entities.nguoi_dung.MaXacNhan;
import com.tavi.tavi_mrs.entities.nguoi_dung.NguoiDung;
import com.tavi.tavi_mrs.payload.user.ForgetPasswordForm;
import com.tavi.tavi_mrs.payload.user.LoginForm;
import com.tavi.tavi_mrs.payload.user.RegisterForm;

import com.tavi.tavi_mrs.service.mail.MailService;
import com.tavi.tavi_mrs.service.nguoi_dung.MaXacNhanService;
import com.tavi.tavi_mrs.service.nguoi_dung.NguoiDungService;

import com.tavi.tavi_mrs.service_impl.nguoi_dung.*;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.tavi.tavi_mrs.security.SecurityConstants;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import static com.tavi.tavi_mrs.utils.EncodeUtils.getSHA256;

import java.util.Date;
import java.util.Optional;

@Controller
@RequestMapping("/api/v1/public/user")
public class
NguoiDungController {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private NguoiDungService nguoiDungService;

    @Autowired
    private MailService sendMailService;

    @Autowired
    private MaXacNhanService maXacNhanService;

    private  String randomCode= RandomStringUtils.random(6,String.valueOf(System.currentTimeMillis()));



    @PostMapping("/dang-ky")
    public ResponseEntity<JsonResult> dangKy(@RequestBody RegisterForm registerForm) {
        if ((registerForm.getEmail() != null && registerForm.getUserName() != null && registerForm.getPassWord() != null)) {
            long countTaiKhoan = nguoiDungService.countByTaiKhoanAndXoa(registerForm.getUserName(), false);
            long countEmail = nguoiDungService.countByEmailAndXoa(registerForm.getEmail(), false);
            String text = "";
            if (countTaiKhoan > 0 || countEmail > 0) {
                if (countTaiKhoan > 0) text += "taiKhoan existed";
                if (countEmail > 0) text += " email existed";
                return ResponseEntity.ok(JsonResult.build("register fail", text));
            }
            NguoiDung newNguoiDung = nguoiDungService.register(registerForm);
            if (newNguoiDung != null) {
                newNguoiDung.setMatKhau(null);
                return ResponseEntity.ok(JsonResult.build("register success", newNguoiDung));
            }
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.badRequest().build();
    }


    @PostMapping("/login")
    public ResponseEntity<JsonResult> login(@RequestBody LoginForm loginForm, HttpServletRequest request) {
        if (loginForm.getUsername() != null && loginForm.getPassword() != null ) {
            NguoiDung nguoiDung = nguoiDungService.findByTaiKhoanAndMatKhauAndXoa(loginForm.getUsername(), loginForm.getPassword(), false);
            if (nguoiDung != null) {
                HttpSession session=request.getSession();
                session.setAttribute("id",nguoiDung.getId());
                return ResponseEntity.ok(JsonResult.build("login success", jwtService.generateToken(nguoiDung.getTaiKhoan(), SecurityConstants.EXPIRATION_TIME)));
            }
            return ResponseEntity.ok(JsonResult.build("login fail", "username or password is not correct"));
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/find-nguoi-dung-by-email")
    public ResponseEntity<JsonResult> findByEmail(@RequestParam("email") String email) {
        return nguoiDungService.findByEmail(email)
                .map(JsonResult::found)
                .orElse(JsonResult.idNotFound());
    }

    @GetMapping("/find-nguoi-dung-by-tai-khoan")
    public ResponseEntity<JsonResult> findByTaiKhoan(@RequestParam("tai-khoan") String taiKhoan) {
        return nguoiDungService.findByTK(taiKhoan)
                .map(JsonResult::found)
                .orElse(JsonResult.idNotFound());
    }

    @GetMapping("/find-by-id")
    public ResponseEntity<JsonResult> findById(@RequestParam("id") int id){
        return nguoiDungService.findById(id,false)
                .map(JsonResult::found)
                .orElse(JsonResult.idNotFound());
    }

    @GetMapping("/tim-tai-khoan")
    public ResponseEntity<JsonResult> codeSercurity(@RequestParam("ma-bao-mat") String maBaoMat,@RequestParam ("nguoi-dung-id") int nguoiDungId){
        System.out.println(randomCode);
        Date date = new Date();
        long thoiGianSuDung = date.getTime();
        Optional<MaXacNhan> maXacNhan = maXacNhanService.findByNguoiDungAndMaToken(nguoiDungId,maBaoMat);
        long thoiGianSong = 6000000; //1 tieng
        long thoiGianLuu = maXacNhan.get().getThoiGian();
        String maToken = maXacNhan.get().getMaToken();
        if ( maBaoMat.equals(maToken)) {
            //send mail here
            if ((thoiGianLuu + thoiGianSong) - thoiGianSuDung > 0){
                return ResponseEntity.ok(JsonResult.build("success", "true"));
            }
            return ResponseEntity.badRequest().body(JsonResult.build("send error 1", "Thoi gian qua han"));
        }
        return ResponseEntity.badRequest().body(JsonResult.build("send error 2", "Can not send code"));
    }

    @PutMapping("/tim-tai-khoan")
    public ResponseEntity<JsonResult> forget(@RequestParam("email") String email){
        if (email != null ){
            Date date = new Date();
            long thoiGian = date.getTime();
            MaXacNhan maXacNhan = new MaXacNhan();
            maXacNhan.setNguoiDung(nguoiDungService.findNguoiDungByEmail(email));
            maXacNhan.setMaToken(randomCode);
            maXacNhan.setThoiGian(thoiGian);
            maXacNhanService.save(maXacNhan)
                    .map(JsonResult::uploaded)
                    .orElse(JsonResult.saveError("Internal Server Error"));
            //send mail here
            boolean result = sendMailService.sendHtmlMail(email
                    ,"ma xac nhan lay lai mat khau  "
                    ,"code security <strong>"+randomCode+"</strong>.");
            if (result)
                return ResponseEntity.ok(JsonResult.build("success","Check mail please"));
            return ResponseEntity.badRequest().body(JsonResult.build("send error", "Can not send email"));
        }
        return ResponseEntity.badRequest().body(JsonResult.build("access denied!","Username or password is not correcr"));
    }

//    @GetMapping("/find-by-ids")
//    public ResponseEntity<JsonResult> findByIds(@RequestParam("listIds") List<Integer> listIds,
//                                                @RequestParam("integer")Integer integer){
//        if(integer==1999) {
//            List<NguoiDung> nguoiDungList = new ArrayList<>();
//
//            listIds.forEach(id -> {
//                Optional<NguoiDung> nguoiDung = nguoiDungService.findById(id, false);
//                if (nguoiDung != null)
//                    nguoiDungList.add(nguoiDung);
//            });
//            return Optional.ofNullable(nguoiDungList)
//                    .map(users -> {
//                        for (NguoiDung user:users
//                        ) {
//                            user.setMatKhau(null);
//                        }
//                        return JsonResult.found(users);
//                    })
//                    .orElse(JsonResult.notFound("User"));
//        }
//        return JsonResult.notFound("Not Found");
//    }



    @PostMapping("/doi-mat-khau")
    public ResponseEntity<JsonResult> update(@RequestBody ForgetPasswordForm forgetPasswordForm) {
        String matKhau = forgetPasswordForm.getMatKhau();
        String email = forgetPasswordForm.getEmail();
        System.out.println("pass" + matKhau+email);
        NguoiDung nguoiDung = nguoiDungService.findNguoiDungByEmail(email);
        System.out.println(nguoiDung.toString());
        if (nguoiDung != null) {
            nguoiDung.setMatKhau(getSHA256(matKhau));
        }
        return nguoiDungService.save(nguoiDung)
                .map(JsonResult::updated)
                .orElse(JsonResult.saveError("NguoiDung"));
    }
}