package com.tavi.tavi_mrs.repository.phong_ban;

import com.tavi.tavi_mrs.entities.phong_ban.PhongBan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PhongBanRepo extends JpaRepository<PhongBan,Integer> {

    List<PhongBan> findAll();

    Optional<PhongBan> findByIdAndXoa(int id, boolean xoa);
}
