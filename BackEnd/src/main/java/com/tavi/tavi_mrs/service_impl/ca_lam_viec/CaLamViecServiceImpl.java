package com.tavi.tavi_mrs.service_impl.ca_lam_viec;

import com.tavi.tavi_mrs.entities.ca_lam_viec.CaLamViec;
import com.tavi.tavi_mrs.repository.ca_lam_viec.CaLamViecRepo;
import com.tavi.tavi_mrs.service.ca_lam_viec.CaLamViecService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;


@Service
public class CaLamViecServiceImpl  implements CaLamViecService{

    private static final Logger LOGGER = Logger.getLogger(CaLamViecServiceImpl.class.getName());

    @Autowired
    private CaLamViecRepo caLamViecRepo;

    @Override
    public List<CaLamViec> findAll() {
        try{
            return caLamViecRepo.findAll();
        }catch (Exception ex){
            LOGGER.log(Level.SEVERE,"find-all-ca-lam-viec-error : " + ex);
            return null;
        }
    }

    @Override
    public Optional<CaLamViec> findByIdAndXoa(int id, boolean xoa) {
        try{
            return caLamViecRepo.findByIdAndXoa(id,xoa);
        }catch (Exception ex){
            LOGGER.log(Level.SEVERE,"find-ca-lam-viec-by-id-error : " + ex);
            return Optional.empty();
        }
    }

    @Override
    public Boolean deleted(Integer id) {
        try{
            return caLamViecRepo.deleted(id)>0 ? true : false;
        }catch (Exception ex){
            LOGGER.log(Level.SEVERE,"delete-ca-lam-viec-error : " + ex);
            return false;
        }
    }

    @Override
    public Optional<CaLamViec> save(CaLamViec caLamViec) {
        try{
            return Optional.ofNullable(caLamViecRepo.save(caLamViec));
        }catch (Exception ex) {
            LOGGER.log(Level.SEVERE,"save-ca-lam-viec-error : " + ex);
            return Optional.empty();
        }
    }
}
