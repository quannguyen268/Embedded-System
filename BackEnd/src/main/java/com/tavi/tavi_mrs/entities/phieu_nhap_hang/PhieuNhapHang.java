package com.tavi.tavi_mrs.entities.phieu_nhap_hang;

import com.tavi.tavi_mrs.entities.hang_hoa.HangHoa;
import com.tavi.tavi_mrs.entities.khach_hang.KhachHang;
import com.tavi.tavi_mrs.entities.nguoi_dung.NguoiDung;
import com.tavi.tavi_mrs.entities.nha_cung_cap.NhaCungCap;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "Phieu_Nhap_Hang", schema = "dbo")
public class PhieuNhapHang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "ma_phieu")
    private String maPhieu;

    @Column(name = "thoi_gian")
    private Date thoiGian;

    @NotNull
    @Column(name = "tong_tien")
    private Float tongTien;

    @NotNull
    @Column(name = "tien_da_tra")
    private Float tienDaTra;

    @Column(name = "tien_phai_tra")
    private Double tienPhaiTra;

    @Column(name = "ghi_chu")
    private String ghiChu;

    @Column(name = "trang_thai")
    private Integer trangThai;

    @ManyToOne
    @JoinColumn(name = "nha_cung_cap_id")
    private NhaCungCap nhaCungCap;

    @ManyToOne
    @JoinColumn(name = "nguoi_dung_id")
    private NguoiDung nguoiDung;


    @Column(name = "xoa")
    private Boolean xoa;

}
