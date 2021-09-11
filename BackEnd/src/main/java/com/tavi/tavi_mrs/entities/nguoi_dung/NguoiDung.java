package com.tavi.tavi_mrs.entities.nguoi_dung;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "Nguoi_Dung", schema = "dbo")
public class NguoiDung implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "ma_tai_khoan")
    private String maTaiKhoan;

    @Column(name = "ho_va_ten")
    private String hoVaTen;


    @Column(name = "tai_khoan")
    private String taiKhoan;

    @Column(name = "mat_khau")
    private String matKhau;

    @Column(name = "email")
    private String email;

    @Column(name = "so_dien_thoai")
    private String soDienThoai;

    @Column(name = "dia_chi")
    private String diaChi;

    @Column(name = "ngay_sinh")
    @Temporal(TemporalType.DATE)
    private Date  ngaySinh;

    @Column(name = "gioi_tinh")
    private Byte gioiTinh;

    @Column(name = "thoi_gian_khoi_tao")
    @Temporal(TemporalType.DATE)
    private Date thoiGianKhoiTao;

    @Column(name = "thoi_gian_kich_hoat")
    @Temporal(TemporalType.DATE)
    private Date thoiGianKichHoat;

    @Column(name = "thoi_gian_het_han")
    @Temporal(TemporalType.DATE)
    private Date thoiGianHetHan;

    @Column(name = "trang_thai")
    private Integer trangThai;

    @Column(name = "facebook")
    private String facebook;

    @Column(name = "bat_dau_lam_viec")
    @Temporal(TemporalType.DATE)
    private Date batDauLamViec;

    @Column(name = "thoi_gian_hop_dong")
    private String thoiGianHopDong;

    @Column(name = "muc_luong")
    private Float mucLuong;

    @Column(name = "url_anh_dai_dien")
    private String  urlAnhDaiDien;

    @ManyToMany
    @JoinTable(name = "Nguoi_Dung_Co_Nhom_Quyen",
            joinColumns = @JoinColumn(name = "nguoi_dung_id"),
            inverseJoinColumns = @JoinColumn(name = "nhom_quyen_id"))
    private List<NguoiDung> nguoiDungCoNhomQuyen;

    @Override
    public String toString() {
        return "NguoiDung{" +
                "id=" + id +
                ", maTaiKhoan='" + maTaiKhoan + '\'' +
                ", email='" + email + '\'' +
                ", soDienThoai='" + soDienThoai + '\'' +
                ", taiKhoan='" + taiKhoan + '\'' +
                ", matKhau='" + matKhau + '\'' +
                ", hoVaTen='" + hoVaTen + '\'' +
                ", diaChi='" + diaChi + '\'' +
                '}';
    }

    @Column(name = "xoa")
    private Boolean xoa;

    public Set<GrantedAuthority> grantedAuthorities(){
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        grantedAuthorities.add(new SimpleGrantedAuthority("ADMIN"));
        return grantedAuthorities;
    }


}
