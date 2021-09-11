package com.tavi.tavi_mrs.repository.hang_hoa;


import com.tavi.tavi_mrs.entities.hang_hoa.ThuongHieu;
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
public interface ThuongHieuRepo extends JpaRepository<ThuongHieu,Integer> {

    List<ThuongHieu> findAll();


    Optional<ThuongHieu> findByIdAndXoa(int id, boolean xoa);

    @Query("select t from ThuongHieu t where t.id = ?1 and t.xoa = false ")
    Optional<ThuongHieu> findById(int id , boolean xoa);

    @Query("from ThuongHieu t where t.tenThuongHieu = ?1 and t.xoa = false")
    Optional<ThuongHieu> findByTenThuongHieu(String tenThuongHieu);

    @Modifying
    @Transactional
    @Query(value = "update ThuongHieu th set th.xoa = true where th.id = ?1")
    int deleted(Integer id);

    @Query(value = " select t from ThuongHieu t where t.xoa = false order by t.id")
    Page<ThuongHieu> findAllToPage(Pageable pageable);

    @Query(value = "from ThuongHieu th " +
            "where " +
            "th.tenThuongHieu like concat('%', ?1, '%') " +
            "and th.xoa = false " +
            "order by th.id")
    Page<ThuongHieu> findByTenThuongHieu(String tenThuongHieu,Pageable pageable);
}
