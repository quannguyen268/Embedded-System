package com.tavi.tavi_mrs.service_impl.hang_hoa;

import com.tavi.tavi_mrs.entities.hang_hoa.HangHoa;
import com.tavi.tavi_mrs.repository.hang_hoa.HangHoaRepo;
import com.tavi.tavi_mrs.service.hang_hoa.HangHoaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class HangHoaServiceImpl implements HangHoaService {

    private static final Logger LOGGER = LoggerFactory.getLogger(HangHoaServiceImpl.class);

    @Autowired
    private HangHoaRepo hangHoaRepo;


    @Override
    public Optional<HangHoa> findById(int id, boolean xoa) {
        try {
            return hangHoaRepo.findById(id, xoa);
        } catch (Exception ex) {
            LOGGER.error("findById error", ex);
            ex.printStackTrace();
            return Optional.empty();
        }
    }

    @Override
    public Page<HangHoa> findAllToPage(Pageable pageable) {
        try {
            return hangHoaRepo.findAllToPage(pageable);
        } catch (Exception ex) {
            LOGGER.error("findAllToPage error", ex);
            ex.printStackTrace();
            return null;
        }
    }


    @Override

    public Optional<HangHoa> save(HangHoa hangHoa) {
        try{
            return Optional.ofNullable(hangHoaRepo.save(hangHoa));
        }catch (Exception ex){
            LOGGER.error("save hang hoa error", ex);
            return Optional.empty();
        }
    }

    public Page<HangHoa> findByTenHangHoaAndNhomHangAndThuongHieu(String tenHangHoa, int nhomHangId, int thuongHieuId, Pageable pageable) {
        try {
            return hangHoaRepo.findByTenHangHoaAndNhomHangAndThuongHieu(tenHangHoa, nhomHangId, thuongHieuId, pageable);
        } catch (Exception ex) {
            LOGGER.error("findByTenHangHoaAndNhomHangAndThuongHieu error", ex);
            ex.printStackTrace();
            return null;
        }
    }

    @Override
    public Page<HangHoa> search(String text, Pageable pageable) {
        try {
            return hangHoaRepo.search(text, pageable);
        } catch (Exception ex) {
            LOGGER.error("findByTenHangHoaAndNhomHangAndThuongHieu error", ex);
            ex.printStackTrace();
            return null;
        }
    }

    @Override
    public Boolean deleted(Integer id) {
        try{
            return hangHoaRepo.deleted(id) > 0 ? true : false;
        }catch (Exception ex){
            LOGGER.error("detete-hang-hoa-error : " + ex);
            return false;
        }
    }

}
