package com.tavi.tavi_mrs.service_impl.nguoi_dung;

import com.tavi.tavi_mrs.entities.nguoi_dung.NguoiDung;
import com.tavi.tavi_mrs.payload.user.RegisterForm;
import com.tavi.tavi_mrs.repository.nguoi_dung.NguoiDungRepo;
import com.tavi.tavi_mrs.service.nguoi_dung.NguoiDungService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import static com.tavi.tavi_mrs.utils.EncodeUtils.getSHA256;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class NguoiDungServiceImpl implements NguoiDungService {

    @Autowired
    NguoiDungRepo nguoiDungRepo;

    private static final Logger LOGGER = Logger.getLogger(NguoiDungServiceImpl.class.getName());

    @Override
    public Optional<NguoiDung> findById(int id , boolean xoa) {
        try {
            return nguoiDungRepo.findById(id , xoa);
        } catch (Exception ex) {
            LOGGER.log(Level.SEVERE, "find-by-id-error: {0}", ex.getMessage());
            return null;
        }
    }

    @Override
    public Optional<NguoiDung> findByEmail(String email) {
        try {
            return nguoiDungRepo.findByEmail(email);
        } catch (Exception ex){
            LOGGER.log(Level.SEVERE, "find-email-error: {0}", ex.getMessage());
            return null;
        }
    }

    @Override
    public NguoiDung findNguoiDungByEmail(String email) {
        try {
            return nguoiDungRepo.findNguoiDungByEmail(email);
        } catch (Exception ex){
            LOGGER.log(Level.SEVERE, "find-email-error: {0}", ex.getMessage());
            return null;
        }
    }

    @Override
    public NguoiDung updateNguoiDung(NguoiDung nguoiDung) {
        try {
            System.out.println("gọi update");
            return nguoiDungRepo.save(nguoiDung);
        } catch (Exception ex){
            LOGGER.log(Level.SEVERE, "update-nguoi-dung-error: {0}", ex.getMessage());
            return null;
        }
    }

    @Override
    public NguoiDung findByTaiKhoan(String taiKhoan) {
        try {
            return nguoiDungRepo.findByTaiKhoan(taiKhoan);
        } catch (Exception ex){
            LOGGER.log(Level.SEVERE, "find-tai-khoan-error: {0}", ex.getMessage());
            return null;
        }
    }

    @Override
    public NguoiDung findBySoDienThoai(String soDienThoai) {
        try {
            return nguoiDungRepo.findBySoDienThoai(soDienThoai);
        } catch (Exception ex){
            LOGGER.log(Level.SEVERE, "find-so-dien-thoai-error: {0}", ex.getMessage());
            return null;
        }
    }

    @Override
    public NguoiDung register(RegisterForm registerForm) {
        try {
            NguoiDung nguoiDung=new NguoiDung();
            nguoiDung.setTaiKhoan(registerForm.getUserName());
            nguoiDung.setMatKhau(registerForm.getPassWord());
            nguoiDung.setMatKhau(getSHA256(registerForm.getPassWord()));
            nguoiDung.setEmail(registerForm.getEmail());
            nguoiDung.setXoa(false);
            System.out.println(nguoiDung.getId()+" "+nguoiDung.getTaiKhoan()+" "+nguoiDung.getMatKhau());
            return nguoiDungRepo.save(nguoiDung);
        } catch (Exception ex) {
            LOGGER.log(Level.SEVERE, "register error: {0}", ex.getMessage());
            return null;
        }
    }


    @Override
    public NguoiDung register(NguoiDung nguoiDung) {
        try {
            nguoiDung.setId(null);
            nguoiDung.setXoa(false);
            return nguoiDungRepo.save(nguoiDung);
        } catch (Exception ex) {
            LOGGER.log(Level.SEVERE, "register error: {0}", ex.getMessage());
            return null;
        }
    }

    @Override
    public NguoiDung findByTaiKhoanAndMatKhauAndXoa(String taiKhoan, String matKhau, boolean xoa) {
        try {
            return nguoiDungRepo.findByTaiKhoanAndMatKhauAndXoa(taiKhoan, getSHA256(matKhau), xoa);
        } catch (Exception ex) {
            LOGGER.log(Level.SEVERE, "find-by-username-and-password-and-deleted error: {0}", ex.getMessage());
            return null;
        }
    }

    @Override
    public Integer findIdByTaiKhoan(String taiKhoan) {
        try{
            System.out.println("gọi id by name");
            return nguoiDungRepo.findIdByTaiKhoan(taiKhoan);
        }catch (Exception ex){
            LOGGER.log(Level.SEVERE, "find-tai-khoan-id: {0}", ex.getMessage());
            return null;
        }
    }

    @Override
    public Page<NguoiDung> findAll(Boolean xoa, Pageable pageable) {
        try {
            return nguoiDungRepo.findAll(xoa, pageable);
        } catch (Exception ex) {
            LOGGER.log(Level.SEVERE, "find-all-pageable error: {0}", ex.getMessage());
            return null;
        }
    }

    @Override
    public Optional<NguoiDung> findByTK(String taiKhoan) {
        try {
            return nguoiDungRepo.findByTK(taiKhoan);
        } catch (Exception ex){
            LOGGER.log(Level.SEVERE, "find-tai-khoan-error: {0}", ex.getMessage());
            return null;
        }
    }

    @Override
    public Optional<NguoiDung> save(NguoiDung nguoiDung) {
        try{
            return Optional.ofNullable(nguoiDungRepo.save(nguoiDung));
        }catch (Exception ex){
            return Optional.empty();
        }
    }


    @Override
    public long countByTaiKhoanAndXoa(String taiKhoan, boolean xoa) {
        try {
            return nguoiDungRepo.countByTaiKhoanAndXoa(taiKhoan, xoa);
        } catch (Exception ex) {
            LOGGER.log(Level.SEVERE, "count-by-tai-khoan-and-deleted error: {0}", ex.getMessage());
            return 0;
        }
    }

    @Override
    public long countTaiKhoanAndXoa(boolean xoa) {
        try {
            return nguoiDungRepo.countTaiKhoanAndXoa( xoa);
        } catch (Exception ex) {
            LOGGER.log(Level.SEVERE, "count-tai-khoan-and-deleted error: {0}", ex.getMessage());
            return 0;
        }
    }

    @Override
    public long countByEmailAndXoa(String email, boolean xoa) {
        try {
            return nguoiDungRepo.countByEmailAndXoa(email, xoa);
        } catch (Exception ex) {
            LOGGER.log(Level.SEVERE, "count-by-email-and-deleted error: {0}", ex.getMessage());
            return 0;
        }
    }

    @Override
    public long countBySoDienThoaiAndXoa(String soDienThoai, boolean xoa) {
        try {
            return nguoiDungRepo.countBySoDienThoaiAndXoa(soDienThoai, xoa);
        } catch (Exception ex) {
            LOGGER.log(Level.SEVERE, "count-by-so-dien-thoai-and-deleted error: {0}", ex.getMessage());
            return 0;
        }
    }

    @Override
    public boolean setTrangThai(int trangThai, int id) {
        try {
            return nguoiDungRepo.setTrangThai(trangThai, id) > 0;
        } catch (Exception ex) {
            ex.printStackTrace();
            LOGGER.log(Level.SEVERE, "setMatKhau error: {0}", ex.getMessage());
            return false;
        }
    }


    @Override
    public boolean delete(int id) {
        try {
            return nguoiDungRepo.delete(id) > 0;
        } catch (Exception ex) {
            ex.printStackTrace();
            LOGGER.log(Level.SEVERE, "register error: {0}", ex.getMessage());
            return false;
        }
    }
}