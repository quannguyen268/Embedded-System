package com.tavi.tavi_mrs.repository.chinh_sach_dieu_khoan;

import com.tavi.tavi_mrs.entities.chinh_sach_dieu_khoan.ChinhSach;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChinhSachRepo extends JpaRepository<ChinhSach, Integer> {

    @Query("select c from ChinhSach c where c.xoa = false ")
    List<ChinhSach> findAll();

    @Transactional
    @Modifying
    @Query("update ChinhSach c set c.xoa = true where c.id = ?1")
    int delete(int id);

    @Query(value = "from ChinhSach c where c.id = ?1 and c.xoa = false")
    Optional<ChinhSach> findById(int id);

}
