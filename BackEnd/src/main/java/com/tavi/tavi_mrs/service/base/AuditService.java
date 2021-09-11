package com.tavi.tavi_mrs.service.base;

import com.tavi.tavi_mrs.entities.base.BaseEntity;

public interface AuditService {

    <T extends BaseEntity> T auditUpdating(T obj);
}
