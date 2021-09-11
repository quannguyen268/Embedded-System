package com.tavi.tavi_mrs.service.chuc_vu_vai_tro;

import com.tavi.tavi_mrs.entities.chuc_vu_vai_tro.ChucVu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ChucVuService {

    List<ChucVu> findAll();

    Optional<ChucVu> findByIdAndXoa(int id, boolean xoa);

    Optional<ChucVu> save(ChucVu chucVu);

    Page<ChucVu> findByTenChucVu(String tenChucVu, Pageable pageable);

    Page<ChucVu> findAllToPage(Pageable pageable);

    Boolean deleted(Integer id);
}
