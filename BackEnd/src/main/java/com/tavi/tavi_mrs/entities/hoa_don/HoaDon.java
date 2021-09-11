
package com.tavi.tavi_mrs.entities.hoa_don;

import com.tavi.tavi_mrs.entities.bieu_do.BieuDo;
import com.tavi.tavi_mrs.entities.chi_nhanh.ChiNhanh;
import com.tavi.tavi_mrs.entities.khach_hang.KhachHang;
import com.tavi.tavi_mrs.entities.nguoi_dung.NguoiDung;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;


@NamedNativeQueries(
    {
            @NamedNativeQuery(name = "HoaDon.bieuDoDoanhThuTong",
                query = "select date(hd.thoi_gian) x, sum(hd.tong_tien) y " +
                        " from hoa_don hd where hd.xoa = ?3" +
                        " group by x " +
                        " having x >= ?1 and x <= ?2 " +
                        " order by x ",
                resultSetMapping = "DoanhThuMapping"),
            @NamedNativeQuery(name = "HoaDon.bieuDoDoanhThuTrongThang",
                    query = "select date(hd.thoi_gian) x, sum(hd.tong_tien) y " +
                            " from hoa_don hd where hd.xoa = ?3" +
                            " group by x " +
                            " having month(x) = ?1 && year(x) = ?2" +
                            " order by x ",
                    resultSetMapping = "DoanhThuMapping"),
            @NamedNativeQuery(name = "HoaDon.bieuDoDoanhThuByNV",
                query = "select date(hd.thoi_gian) x, sum(hd.tong_tien) y " +
                        " from hoa_don hd where hd.xoa = ?4 and hd.nguoi_dung_id = ?3" +
                        " group by x " +
                        " having x >= ?1 and x <= ?2 " +
                        " order by x ",
                resultSetMapping = "DoanhThuMapping"),
            @NamedNativeQuery(name = "HoaDon.bieuDoDoanhThuTrongNam",
                    query = "select month(hd.thoi_gian) x, " +
                            "sum(hd.tong_tien) y, " +
                            " hd.thoi_gian tg " +
                            " from hoa_don hd where hd.xoa = ?2 " +
                            " group by x" +
                            " having year(tg) = ?1" +
                            " order by x;" ,
                    resultSetMapping = "DoanhThuMapping"),
            @NamedNativeQuery(name = "HoaDon.bieuDoDoanhThuTrongTuan",
                    query = "select sum(hd.tong_tien) y, dayname(hd.thoi_gian) x, " +
                            " hd.thoi_gian tg "  +
                            " from hoa_don hd " +
                            " where hd.xoa = ?3 " +
                            " group by day(tg) " +
                            " having week(tg) = ?1 and year(tg) = ?2 " +
                            " order by tg",
                    resultSetMapping = "DoanhThuMapping"),
            @NamedNativeQuery(name = "HoaDon.bieuDoDoanhThuGioTrongNgay",
                    query = "select hour(hd.thoi_gian) x, " +
                            "sum(hd.tong_tien) y, " +
                            " hd.thoi_gian tg " +
                            " from hoa_don hd where hd.xoa = ?2 " +
                            " group by x " +
                            " having date(tg) = ?1 " +
                            " order by x;" ,
                    resultSetMapping = "DoanhThuMapping"),
            @NamedNativeQuery(name = "HoaDon.bieuDoDoanhThuGioTrongTuan",
                    query = "select hour(hd.thoi_gian) x, " +
                            "sum(hd.tong_tien) y, " +
                            " hd.thoi_gian tg " +
                            " from hoa_don hd where hd.xoa = ?3 " +
                            " group by x " +
                            " having week(tg) = ?1 and year(tg) = ?2" +
                            " order by x;" ,
                    resultSetMapping = "DoanhThuMapping"),
            @NamedNativeQuery(name = "HoaDon.bieuDoDoanhThuGioTrongThang",
                    query = "select hour(hd.thoi_gian) x, " +
                            "sum(hd.tong_tien) y, " +
                            " hd.thoi_gian tg " +
                            " from hoa_don hd where hd.xoa = ?3 " +
                            " group by x " +
                            " having month(tg) = ?1 and year(tg) = ?2 " +
                            " order by x;" ,
                    resultSetMapping = "DoanhThuMapping"),
            @NamedNativeQuery(name = "HoaDon.tongDoanhThuNgay",
                    query = "select sum(hd.tong_tien) y, date(hd.thoi_gian) x " +
                            "from hoa_don hd " +
                            "where hd.xoa = ?2 " +
                            "group by x " +
                            "having x = ?1",
                    resultSetMapping = "DoanhThuMapping"),
            @NamedNativeQuery(name = "HoaDon.tongDoanhThuThang",
                    query = "select sum(hd.tong_tien) y, month(hd.thoi_gian) x " +
                            "from hoa_don hd " +
                            "where hd.xoa = ?2 " +
                            "group by x " +
                            "having x = ?1",
                    resultSetMapping = "DoanhThuMapping"),
            @NamedNativeQuery(name = "HoaDon.tongDoanhThuNam",
                    query = "select sum(hd.tong_tien) y, year(hd.thoi_gian) x " +
                            "from hoa_don hd " +
                            "where hd.xoa = ?2 " +
                            "group by x " +
                            "having x = ?1",
                    resultSetMapping = "DoanhThuMapping")

    }
)

@SqlResultSetMapping(
        name = "DoanhThuMapping",
        classes = {@ConstructorResult(
                targetClass = BieuDo.class,
                columns = { @ColumnResult(name = "x"), @ColumnResult(name = "y") })}
)


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "Hoa_Don", schema = "dbo")
public class HoaDon  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NotNull
    @Column(name = "thoi_gian")
    @Temporal(TemporalType.TIMESTAMP)
    private Date thoiGian;


    @NotNull
    @Column(name = "ma")
    private String ma;

    @NotNull
    @Column(name = "tong_tien")
    private Float tongTien;

    @NotNull
    @Column(name = "tien_khach_tra")
    private Float tienKhachTra;

    @Column(name = "tien_tra_lai_khach")
    private Float tienTraLaiKhach;

    @Column(name = "ghi_chu")
    private String ghiChu;

    @Column(name = "trang_thai")
    private Integer trangThai;

    @ManyToOne
    @JoinColumn(name = "khach_hang_id")
    private KhachHang khachHang;
    
    @ManyToOne
    @JoinColumn(name = "nguoi_dung_id")
    private NguoiDung nguoiDung;

    @ManyToOne
    @JoinColumn(name = "chi_nhanh_id")
    private ChiNhanh chiNhanh;

    @Column(name = "xoa")
    private Boolean xoa;
}
