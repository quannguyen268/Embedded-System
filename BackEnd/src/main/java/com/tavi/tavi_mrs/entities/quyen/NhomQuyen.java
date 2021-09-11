package com.tavi.tavi_mrs.entities.quyen;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "Nhom_Quyen", schema = "dbo")
public class NhomQuyen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "ten_nhom_quyen")
    private String tenNhomQuyen;


    @ManyToMany
    @JoinTable(name = "Nhom_Quyen_Co_Quyen",
            joinColumns = @JoinColumn(name = "nhom_quyen_id"),
            inverseJoinColumns = @JoinColumn(name = "quyen_id"))
    private List<Quyen> nhomQuyenCoQuyen;
}
