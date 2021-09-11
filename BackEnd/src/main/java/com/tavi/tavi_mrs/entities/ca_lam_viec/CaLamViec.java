package com.tavi.tavi_mrs.entities.ca_lam_viec;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "Ca_Lam_Viec", schema = "dbo")
public class CaLamViec implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    @Column(name = "thoi_gian_lam_viec")
    private String thoiGianLamViec;

    @NotNull
    @Column(name = "so_nhan_vien_toi_da")
    private Integer soLuongNhanVienToiDa;

    @Column(name = "xoa")
    private Boolean xoa;
}
