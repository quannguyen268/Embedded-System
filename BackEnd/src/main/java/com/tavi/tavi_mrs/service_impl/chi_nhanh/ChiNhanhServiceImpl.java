package com.tavi.tavi_mrs.service_impl.chi_nhanh;

import com.tavi.tavi_mrs.entities.chi_nhanh.ChiNhanh;
import com.tavi.tavi_mrs.repository.chi_nhanh.ChiNhanhRepo;
import com.tavi.tavi_mrs.service.chi_nhanh.ChiNhanhService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.logging.Level;

@Service
public class ChiNhanhServiceImpl implements ChiNhanhService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ChiNhanhServiceImpl.class);


    @Autowired
    private ChiNhanhRepo chiNhanhRepo;

    @Override
    public List<ChiNhanh> findAll() {
        try {
            return chiNhanhRepo.findAll();
        }catch (Exception ex){
            LOGGER.error("find-all-chi-nhanh-error : " + ex);
            return null;
        }
    }

    @Override
    public Optional<ChiNhanh> findByIdAndXoa(int id, boolean xoa) {
        try{
            return chiNhanhRepo.findByIdAndXoa(id,xoa);
        }catch (Exception ex){
            LOGGER.error("find-chi-nhanh-by-id-error : " + ex);
            return Optional.empty();
        }
    }


    @Override
    public List<ChiNhanh> findByTongCty(Integer idTongCty) {
        try {
            return chiNhanhRepo.findByTongCty(idTongCty);
        } catch (Exception ex) {
            LOGGER.error("findByTongCty error", ex);
            ex.printStackTrace();
            return null;
        }
    }

    @Override
    public Optional<ChiNhanh> save(ChiNhanh chiNhanh) {
        try {
            return Optional.of(chiNhanhRepo.save(chiNhanh));
        } catch (Exception ex) {
            LOGGER.error("saveChiNhanh error", ex);
            ex.printStackTrace();
            return Optional.empty();
        }
    }

    @Override
    public Boolean deleted(Integer chiNhanhId) {
        try{
            return chiNhanhRepo.deleted(chiNhanhId)>0?true:false;
        }catch (Exception ex){
            LOGGER.error("save",ex);
            return false;
        }
    }

    @Override
    public List<ChiNhanh> findAll(Integer doanhNghiepId) {
        try{
            return chiNhanhRepo.findAllByDoanhNghiep(doanhNghiepId);
        }catch (Exception ex){
            LOGGER.error("save",ex);
            return null;
        }
    }

    @Override
    public List<ChiNhanh> timKiemTuDo(String text) {
        try{
            return chiNhanhRepo.timKiemTuDo(text);
        }catch (Exception ex){
            LOGGER.error("save",ex);
            return null;
        }
    }

}

