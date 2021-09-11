package com.tavi.tavi_mrs.service.hoa_don;

import com.tavi.tavi_mrs.entities.bieu_do.BieuDo;
import com.tavi.tavi_mrs.entities.hoa_don.HoaDon;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface HoaDonService {

    List<HoaDon> findAll();

    Optional<HoaDon> findById(int id);

    Optional<HoaDon> findById(int id , boolean xoa);

    Page<HoaDon> findAllToPage(Pageable pageable);

    Optional<HoaDon> save(HoaDon hoaDon);

    boolean setTrangThai(int id, int trangThai);

    Page<HoaDon> findByMaHoaDonAndThoiGianAndTrangThai(String maHoaDon,String tenKhachHang, String tenNhanVien, Date ngayDau, Date ngayCuoi, int trangThai, Pageable pageable);

    Page<HoaDon> findByChiNhanhAndText(int chiNhanhId, String text, Pageable pageable);

    Integer countBillByTime(Date start, Date end);

    Integer sumBillByTime(Date start, Date end);

    List<BieuDo> bieuDoDoanhThuTong(Date ngayDau, Date ngayCuoi, boolean xoa);

     List<BieuDo> bieuDoDoanhThuTrongNam(int year, boolean xoa);

    List<BieuDo> bieuDoDoanhThuTrongThang(int month, int year, boolean xoa);

    List<BieuDo> bieuDoDoanhThuGioTrongThang(int month, int year, boolean xoa);


    List<BieuDo> bieuDoDoanhThuTrongTuan(int week, int year, boolean xoa);

    List<BieuDo> bieuDoDoanhThuByNV(Date ngayDau, Date ngayCuoi, int nguoiDungId, boolean xoa);
}
