package com.tavi.tavi_mrs.repository.phieu_tra_hang_nhap;

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
public interface PhieuTraHangNhapRepo extends JpaRepository<PhieuTraHangNhap,Integer> {


    @Query(value = "from PhieuTraHangNhap  pt " +
            "where pt.xoa = false and pt.trangThai = 1")
    Page<PhieuTraHangNhap> findAl(Pageable pageable);

    @Query(value = "from PhieuTraHangNhap pt " +
            "where pt.id = ?1 and " +
            "pt.xoa = ?2 and pt.trangThai = 1")
    Optional<PhieuTraHangNhap> findByIdAndXoa(int id, boolean xoa);

    @Query(value = "from PhieuTraHangNhap pt " +
            "where " +
            "(?1 is null or pt.nhaCungCap.ten like concat('%', ?1, '%')) " +
            "and (?2 is null or pt.thoiGian >= ?2) and (?3 is null or pt.thoiGian <= ?3) " +
            "and pt.trangThai = ?4 " +
            "and pt.xoa = false " +
            "order by pt.id")
    Page<PhieuTraHangNhap> findByNhaCungCapAndThoiGianAndTrangThai(String tenNhaCungCap, Date ngayDau, Date ngayCuoi,int trangThai, Pageable pageable);


    @Modifying
    @Transactional
    @Query(value = "update PhieuTraHangNhap pt set pt.xoa = true where pt.id = ?1")
    int deleted(Integer id);

    @Transactional
    @Modifying
    @Query("update PhieuTraHangNhap pt set pt.trangThai = ?2 where pt.id = ?1")
    int setTrangThai(int id, int trangThai);

}
