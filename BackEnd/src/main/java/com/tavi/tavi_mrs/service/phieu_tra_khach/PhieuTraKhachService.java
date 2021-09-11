package com.tavi.tavi_mrs.service.phieu_tra_khach;

import com.tavi.tavi_mrs.entities.phieu_tra_khach.PhieuTraKhach;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.Optional;

public interface PhieuTraKhachService {

    Page<PhieuTraKhach> findAll(Pageable pageable);

    Optional<PhieuTraKhach> findByIdAndXoa(int id, boolean xoa);

    Page<PhieuTraKhach> findByNguoiDung(int nguoiDungId, Pageable pageable);

    Page<PhieuTraKhach> findByThoiGianAndTrangThai(Date ngayDau, Date ngayCuoi,int trangThai, Pageable pageable);

    Boolean deleted(Integer id);

    Boolean setTrangThai(int id, int trangThai);

    Optional<PhieuTraKhach> save(PhieuTraKhach phieuTraKhach);
}
