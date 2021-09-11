package com.tavi.tavi_mrs.service.phieu_tra_khach;

import com.tavi.tavi_mrs.entities.json.JsonResult;
import com.tavi.tavi_mrs.entities.json.PhieuTraKhachForm;
import com.tavi.tavi_mrs.entities.phieu_tra_khach.PhieuTraKhachChiTiet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

public interface PhieuTraKhachChiTietService {

    Page<PhieuTraKhachChiTiet> findAllToPage(Pageable pageable);

    Page<PhieuTraKhachChiTiet> findAllByPhieuTraKhachId(int phieuTraKhachId, Pageable pageable);

    Optional<PhieuTraKhachChiTiet> findById(int id);

    Optional<PhieuTraKhachChiTiet> save(PhieuTraKhachChiTiet phieuTraKhachChiTiet);

    Page<PhieuTraKhachChiTiet> findByChiNhanhAndText(int chiNhanhId, String text, Pageable pageable);

    ResponseEntity<JsonResult> uploadByForm(PhieuTraKhachForm phieuTraKhachForm);

}
