package com.tavi.tavi_mrs.repository.chi_nhanh;

import com.tavi.tavi_mrs.entities.chi_nhanh.ChiNhanh;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChiNhanhRepo extends JpaRepository<ChiNhanh, Integer> {

    @Query(value = "from ChiNhanh c where c.xoa=false " +
            "order by c.id" )
    List<ChiNhanh> findAll();

    Optional<ChiNhanh> findByIdAndXoa(int id, boolean xoa);

    @Query(value = "from ChiNhanh where id = ?1 and xoa = false")
    Optional<ChiNhanh> findById(Integer id);

    @Query(value = "from ChiNhanh where (0=?1 or tongCongTy.id = ?1) and xoa = false")
    List<ChiNhanh> findByTongCty(Integer idTongCty);

    @Modifying
    @Transactional
    @Query("update ChiNhanh as cn set cn.xoa=true where cn.id=?1")
    int deleted(Integer id);

    @Query("select cn from ChiNhanh as cn where (cn.xoa=?2 or ?2 is null) and cn.id=?1")
    ChiNhanh findByIdAndXoa(Integer chiNhanhId,Boolean xoa);

    @Query("select cn from ChiNhanh as cn where cn.xoa=false and (cn.tongCongTy.id=?1 or ?1 is null)")
    List<ChiNhanh> findAllByDoanhNghiep(Integer doanhNghiepId);

    @Query(value = "SELECT org.* FROM Chi_Nhanh as org \n" +
            "INNER JOIN \n" +
            "FREETEXTTABLE(Chi_Nhanh ,(*),?1,LANGUAGE 'vietnamese',50) \n" +
            "as keytb on org.id=keytb.[key] where xoa=0 \n", nativeQuery = true)
    List<ChiNhanh> timKiemTuDo(String text);

}
