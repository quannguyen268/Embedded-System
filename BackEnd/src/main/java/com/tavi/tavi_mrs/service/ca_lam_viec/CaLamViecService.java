package com.tavi.tavi_mrs.service.ca_lam_viec;

import com.tavi.tavi_mrs.entities.ca_lam_viec.CaLamViec;
import jdk.nashorn.internal.runtime.options.Option;

import java.util.List;
import java.util.Optional;

public interface CaLamViecService {

    List<CaLamViec> findAll();

    Optional<CaLamViec> findByIdAndXoa(int id, boolean xoa);

    Boolean deleted(Integer id);

    Optional<CaLamViec> save(CaLamViec caLamViec);
}
