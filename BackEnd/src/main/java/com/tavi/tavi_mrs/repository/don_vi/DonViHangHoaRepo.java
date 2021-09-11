package com.tavi.tavi_mrs.repository.don_vi;

import com.tavi.tavi_mrs.entities.don_vi.DonViHangHoa;
import jdk.nashorn.internal.runtime.options.Option;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DonViHangHoaRepo extends JpaRepository<DonViHangHoa,Integer> {

    List<DonViHangHoa> findAll();

    Optional<DonViHangHoa> findByIdAndXoa(int id, boolean xoa);

    @Query(value = "from DonViHangHoa dv where dv.hangHoa.id = ?1 and dv.xoa = false")
    Page<DonViHangHoa> findByHangHoaId(int id, Pageable pageable);

    @Query(value = "select distinct dv from DonViHangHoa  dv " +
            "where dv.tyLe = 1 " +
            "and dv.hangHoa.id = ?1 " +
            "and dv.xoa = false")
    Optional<DonViHangHoa> findDonViCoBanByHangHoaId(int hangHoaId);

    @Query(nativeQuery = true, value = "select  * from don_vi_hang_hoa dvhh where " +
            " dvhh.hang_hoa_id = :id limit 1")
    Optional<DonViHangHoa> findDistinctByHangHoaId(@Param("id")int hangHoaId);
}
