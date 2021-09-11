package com.tavi.tavi_mrs.repository.phieu_nhap_hang;

import com.tavi.tavi_mrs.entities.phieu_nhap_hang.PhieuNhapHang;
import com.tavi.tavi_mrs.entities.phieu_nhap_hang.PhieuNhapHangChiTiet;
import com.tavi.tavi_mrs.entities.phieu_tra_hang_nhap.PhieuTraHangNhap;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.Optional;

@Repository
public interface PhieuNhapHangRepo extends JpaRepository<PhieuNhapHang,Integer> {
    @Query("select p from PhieuNhapHang p where p.id = ?1 and p.xoa = false ")
    Optional<PhieuNhapHang> findById(int id);

    @Query("select p from PhieuNhapHang p where p.id = ?1 and p.xoa = false ")
    Page<PhieuNhapHang> fingAll(Pageable pageable);


    @Query(value = "from PhieuNhapHang p" +
            " where "+
            "p.maPhieu like concat('%', ?1, '%') " +
            "and (?2 is null or p.thoiGian >= ?2 ) and (?3 is null or p.thoiGian <= ?3)" +
            "and (0 = ?4 or p.nhaCungCap.id = ?4 )  " +
            "and p.xoa = false " +
            "order by p.id asc ")
    Page<PhieuNhapHang> findByNhaCungCapAndThoiGianAndMaPhieu(String maPhieu, Date ngayDau, Date ngayCuoi, int nhaCungCapId, Pageable pageable);

    @Transactional
    @Modifying
    @Query(value = "update PhieuNhapHang p set p.xoa=true where p.id = ?1")
    int deleted(int id);
}