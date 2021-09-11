package com.tavi.tavi_mrs.service.chinh_sach_dieu_khoan;


import com.tavi.tavi_mrs.entities.chinh_sach_dieu_khoan.ChinhSach;

import java.util.List;
import java.util.Optional;

public interface ChinhSachService {

    boolean delete(Integer id);

    Optional<ChinhSach> save(ChinhSach chinhSach);

    Optional<ChinhSach> findById(int id);

    List<ChinhSach> findAll();
}
