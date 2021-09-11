package com.tavi.tavi_mrs.service.phieu_nhap_hang;

import com.tavi.tavi_mrs.entities.phieu_nhap_hang.PhieuNhapHang;
import com.tavi.tavi_mrs.entities.phieu_nhap_hang.PhieuNhapHangChiTiet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.Optional;

public interface PhieuNhapHangService {
    Optional<PhieuNhapHang> findById(int id);

    Page<PhieuNhapHang> fingAll(Pageable pageable);

    Optional<PhieuNhapHang> save(PhieuNhapHang phieuNhapHang);

    Page<PhieuNhapHang> findByNhaCungCapAndThoiGianAndMaPhieu(String maPhieu, Date ngayDau, Date ngayCuoi, int nhaCungCapId, Pageable pageable);

//    Page<PhieuNhapHang> findByChiNhanhAndText(int chiNhanhId, String text, Pageable pageable);

    Boolean deleted(int id);
}
