package com.tavi.tavi_mrs.repository.ca_lam_viec;

import com.tavi.tavi_mrs.entities.ca_lam_viec.NguoiDungCaLamViec;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface NguoiDungCaLamViecRepo extends JpaRepository<NguoiDungCaLamViec, Integer> {


}
