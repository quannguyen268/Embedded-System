package com.tavi.tavi_mrs.repository.don_vi;

import com.tavi.tavi_mrs.entities.don_vi.DonVi;
import io.swagger.models.auth.In;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface DonViRepo extends JpaRepository<DonVi, Integer> {

    @Query(value = "from DonVi  d where " +
            "d.xoa = false ")
    Page<DonVi> findAll(Pageable pageable);

    @Query(value = "from DonVi d where " +
            "d.id = ?1 " +
            "and " +
            "d.xoa = ?2")
    Optional<DonVi> findByIdAndXoa(int id, boolean xoa);

    @Query(value = "from DonVi dv where " +
            "dv.tenDonVi = ?1 and dv.xoa = false ")
    Optional<DonVi> findByTenDonVi(String tenDonVi);

    @Query(value = "from DonVi d where " +
            "d.tenDonVi like concat('%', ?1, '%') " +
            "and d.xoa = false")
    Page<DonVi> search(String tenDonVi, Pageable pageable);

    @Transactional
    @Modifying
    @Query(value = "update DonVi d set d.xoa=true where d.id = ?1")
    int deleted(int id);
}
