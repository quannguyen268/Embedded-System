package com.tavi.tavi_mrs.repository.hoa_don;


import com.tavi.tavi_mrs.entities.bieu_do.BieuDo;
import com.tavi.tavi_mrs.entities.hang_hoa.ChiNhanhHangHoa;
import com.tavi.tavi_mrs.entities.hoa_don.HoaDon;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface HoaDonRepo extends JpaRepository<HoaDon,Integer>{

    @Query("from HoaDon h where h.id = ?1 and h.xoa = false ")
    Optional<HoaDon> findById(int id , boolean xoa);

    @Query(value = " select h from HoaDon h where h.xoa = false order by h.id")
    Page<HoaDon> findAllToPage(Pageable pageable);

    @Query(value = "select h from HoaDon h where h.xoa = false order by h.id")
    List<HoaDon> findAll();

    @Query(value = "from HoaDon h" +
            " where "+
            "(?1 is null or h.ma like concat('%', ?1, '%')) " +
            "and (?2 is null or h.khachHang.tenKhachHang  like concat('%', ?2, '%')) " +
            "and (?3 is null or h.nguoiDung.hoVaTen like concat('%', ?3, '%'))" +
            "and (?4 is null or h.thoiGian >= ?4 ) and (?5 is null or h.thoiGian <= ?5)" +
            "and (?6 = -1 or h.trangThai = ?6 )  " +
            "and h.xoa = false " +
            "order by h.id asc ")
    Page<HoaDon> findByMaHoaDonAndThoiGianAndTrangThai(String maHoaDon,String tenKhachHang, String tenNhanVien, Date ngayDau, Date ngayCuoi, int trangThai, Pageable pageable);

    @Transactional
    @Modifying
    @Query("update HoaDon h set h.trangThai = ?2 where h.id = ?1")
    int setTrangThai(int id, int trangThai);


    @Query(value = "select h from HoaDon h " +
            "where h.xoa = false " +
            "and (0 = ?1 or h.chiNhanh.id = ?1) " +
            "and ( " +
            "(h.khachHang.tenKhachHang is not null and upper(h.khachHang.tenKhachHang) like concat('%', upper(?2) ,'%'))" +
            "or (h.nguoiDung.hoVaTen is not null and upper(h.nguoiDung.hoVaTen) like concat('%', upper(?2) ,'%') )" +
            "or (h.ma is not null and upper(h.ma) like concat('%', upper(?2) ,'%') )" +
            ")")
    Page<HoaDon> findByChiNhanhAndText(int chiNhanhId, String text, Pageable pageable);

    @Query(nativeQuery = true, value = "select count(*) from hoa_don hd " +
                    "where hd.thoi_gian >= ?1 and hd.thoi_gian <= ?2 " +
                    " and hd.xoa = false;\n")
    Integer countBillByTime(Date start, Date end);

    @Query(nativeQuery = true, value = "select sum(hd.tong_tien) from hoa_don hd " +
                    "where hd.thoi_gian >= ?1 and hd.thoi_gian <= ?2 " +
                    "and hd.xoa = false;")
    Integer sumBillByTime(Date start, Date end);

    @Query(nativeQuery = true)
    List<BieuDo> bieuDoDoanhThuTong(Date ngayDau, Date ngayCuoi, boolean xoa);

    @Query(nativeQuery = true)
    List<BieuDo> bieuDoDoanhThuTrongNam(int year, boolean xoa);

    @Query(nativeQuery = true)
    List<BieuDo> bieuDoDoanhThuTrongThang(int month,int year, boolean xoa);

    @Query(nativeQuery = true)
    List<BieuDo> bieuDoDoanhThuGioTrongThang(int month, int year, boolean xoa);

    @Query(nativeQuery = true)
    List<BieuDo> bieuDoDoanhThuByNV(Date ngayDau, Date ngayCuoi, int nguoiDungId, boolean xoa);

    @Query(nativeQuery = true)
    List<BieuDo> bieuDoDoanhThuTrongTuan(int week,int year, boolean xoa);

}
