package com.tavi.tavi_mrs.service_impl.phieu_nhap_hang;

import com.tavi.tavi_mrs.entities.phieu_nhap_hang.PhieuNhapHang;
import com.tavi.tavi_mrs.entities.phieu_nhap_hang.PhieuNhapHangChiTiet;
import com.tavi.tavi_mrs.repository.phieu_nhap_hang.PhieuNhapHangChiTietRepo;
import com.tavi.tavi_mrs.repository.phieu_nhap_hang.PhieuNhapHangRepo;
import com.tavi.tavi_mrs.service.phieu_nhap_hang.PhieuNhapHangService;
import com.tavi.tavi_mrs.service_impl.hang_hoa.HangHoaServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;
import java.util.logging.Level;

@Service
public class PhieuNhapHangServiceImpl implements PhieuNhapHangService {
    private static final Logger LOGGER = LoggerFactory.getLogger(PhieuNhapHangServiceImpl.class);


    @Autowired
    private PhieuNhapHangRepo phieuNhapHangRepo;

    @Override
    public Optional<PhieuNhapHang> findById(int id) {
        try {
            return phieuNhapHangRepo.findById(id);
        }catch (Exception ex) {
            LOGGER.error("find by id error : " + ex);
            return Optional.empty();
        }
    }

    @Override
    public Page<PhieuNhapHang> fingAll(Pageable pageable) {
        try {
            return phieuNhapHangRepo.fingAll(pageable);
        }catch (Exception ex){
            LOGGER.error("find all phieu nhap hang error : " + ex);
            return null;
        }
    }

    @Override
    public Optional<PhieuNhapHang> save(PhieuNhapHang phieuNhapHang) {
        try{
            return Optional.ofNullable(phieuNhapHangRepo.save(phieuNhapHang));
        }catch (Exception ex){
            LOGGER.error("save phieu nhap hang error : " + ex);
            return Optional.empty();
        }
    }

    @Override
    public Page<PhieuNhapHang> findByNhaCungCapAndThoiGianAndMaPhieu(String maPhieu, Date ngayDau, Date ngayCuoi, int nhaCungCapId, Pageable pageable) {
        try {
            return phieuNhapHangRepo.findByNhaCungCapAndThoiGianAndMaPhieu(maPhieu, ngayDau, ngayCuoi, nhaCungCapId, pageable);
        } catch (Exception ex) {
            LOGGER.error("findByNhaCungCapAndThoiGianAndMaPhieu error : " + ex);
            ex.printStackTrace();
            return null;
        }
    }

//    @Override
//    public Page<PhieuNhapHang> findByChiNhanhAndText(int chiNhanhId, String text, Pageable pageable) {
//        try{
//            return phieuNhapHangRepo.findByChiNhanhAndText(chiNhanhId,text, pageable);
//        }catch (Exception ex){
//            LOGGER.error("findByChiNhanhAndText error : " + ex);
//            return null;
//        }
//    }

    @Override
    public Boolean deleted(int id) {
        try{
            return phieuNhapHangRepo.deleted(id) > 0 ? true : false;
        }catch (Exception ex){
            LOGGER.error("delete-phieu-nhap-hang-error : " + ex);
            return false;
        }
    }
}
