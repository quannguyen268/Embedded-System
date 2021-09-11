package com.tavi.tavi_mrs.entities.ca_lam_viec;

import com.tavi.tavi_mrs.entities.khach_hang.KhachHang;
import com.tavi.tavi_mrs.entities.nguoi_dung.NguoiDung;
import com.tavi.tavi_mrs.entities.nguoi_dung.NguoiDungPhongBanId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@IdClass(value= NguoiDungCaLamViecId.class)
@Table(name = "Nguoi_Dung_Ca_Lam_Viec", schema = "dbo")
public class NguoiDungCaLamViec implements Serializable {

    @Id
    @JoinColumn(name = "nguoi_dung_id")
    @ManyToOne
    private NguoiDung nguoiDung;

    @Id
    @JoinColumn(name = "ca_lam_viec_id")
    @ManyToOne
    private CaLamViec caLamViec;

    @Column(name = "xoa")
    private Boolean xoa;
}
