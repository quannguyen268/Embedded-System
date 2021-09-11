package com.tavi.tavi_mrs.service_impl.chuc_vu_vai_tro;

import com.tavi.tavi_mrs.entities.chuc_vu_vai_tro.VaiTro;
import com.tavi.tavi_mrs.repository.chuc_vu_vai_tro.VaiTroRepo;
import com.tavi.tavi_mrs.service.chuc_vu_vai_tro.VaiTroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;


@Service
public class VaiTroServiceImpl implements VaiTroService {

    private static final Logger LOGGER = Logger.getLogger(VaiTroServiceImpl.class.getName());

    @Autowired
    private VaiTroRepo vaiTroRepo;

    @Override
    public List<VaiTro> findAll() {
        try {
            return vaiTroRepo.findAll();
        }catch (Exception ex){
            LOGGER.log(Level.SEVERE,"find-all-vai-tro-he-thong-error : " + ex);
            return null;
        }
    }

    @Override
    public Optional<VaiTro> findByIdAndXoa(int id, boolean xoa) {
        try{
            return vaiTroRepo.findByIdAndXoa(id,xoa);
        }catch (Exception ex) {
            LOGGER.log(Level.SEVERE,"find-vai-tro-he-thong-by-id-error : " + ex);
            return Optional.empty();
        }
    }

    @Override
    public Optional<VaiTro> save(VaiTro vaiTro) {
        try{
            return Optional.ofNullable(vaiTroRepo.save(vaiTro));
        }catch (Exception ex){
            return Optional.empty();
        }
    }

    @Override
    public Page<VaiTro> findByTenVaiTro(String tenVaiTro, Pageable pageable) {
        try{
            return vaiTroRepo.findByTenVaiTro(tenVaiTro,pageable);
        }catch (Exception ex) {
            LOGGER.log(Level.SEVERE,"find-vai-tro-he-thong-by-ten : " + ex);
            return null;
        }
    }

    @Override
    public Page<VaiTro> findAllToPage(Pageable pageable) {
        try{
            return vaiTroRepo.findAllToPage(pageable);
        }catch (Exception ex) {
            LOGGER.log(Level.SEVERE,"find-all-vai-tro-he-thong-to-page-error : " + ex);
            return null;
        }
    }

    @Override
    public Boolean deleted(Integer id) {
        try{
            return vaiTroRepo.deleted(id)>0 ? true : false;
        }catch (Exception ex){
            LOGGER.log(Level.SEVERE,"delete-vai-tro-error :" + ex);
            return false;
        }
    }
}
