package com.tavi.tavi_mrs.service.chi_nhanh;

import com.tavi.tavi_mrs.entities.chi_nhanh.ChiNhanh;

import java.util.List;
import java.util.Optional;

public interface ChiNhanhService {

    List<ChiNhanh> findAll();

    Optional<ChiNhanh> findByIdAndXoa(int id, boolean xoa);

    List<ChiNhanh> findByTongCty(Integer idTongCty);

    Optional<ChiNhanh> save(ChiNhanh chiNhanh);

//    ChiNhanh save(ChiNhanh  chiNhanh);

    Boolean deleted(Integer chiNhanhId);

    List<ChiNhanh> findAll(Integer doanhNghiepId);

//    ChiNhanh findById(Integer chiNhanhId);

    List<ChiNhanh> timKiemTuDo(String text);
}
