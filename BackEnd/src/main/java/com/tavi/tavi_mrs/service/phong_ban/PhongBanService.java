package com.tavi.tavi_mrs.service.phong_ban;

import com.tavi.tavi_mrs.entities.phong_ban.PhongBan;

import java.util.List;
import java.util.Optional;

public interface PhongBanService {

    List<PhongBan> findAll();

    Optional<PhongBan> findByIdAndXoa(int id, boolean xoa);
}
