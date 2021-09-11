package com.tavi.tavi_mrs.repository.ca_lam_viec;

import com.tavi.tavi_mrs.entities.ca_lam_viec.CaLamViec;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface CaLamViecRepo extends JpaRepository<CaLamViec,Integer>{

    @Query(value = "from CaLamViec clv where clv.xoa=false ")
    List<CaLamViec> findAll();


    Optional<CaLamViec> findByIdAndXoa(int id, boolean xoa);

    @Modifying
    @Transactional
    @Query(value = "update CaLamViec clv set clv.xoa = true where clv.id = ?1")
    int deleted(Integer id);


}
