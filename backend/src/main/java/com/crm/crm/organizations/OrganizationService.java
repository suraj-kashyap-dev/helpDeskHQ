package com.crm.crm.organizations;

import java.util.List;

import com.crm.crm.helpers.ApiResponse;

public interface OrganizationService {
    public ApiResponse<List<Organization>> index();
    public ApiResponse<Organization> show(Long id);
    public ApiResponse<Organization> store(OrganizationDTO organizationdDto);
    public ApiResponse<List<Organization>> storeMany(Iterable<OrganizationDTO> organizationDtos);
    public ApiResponse<Organization> update(Long id, OrganizationDTO organizationdDto);
    public ApiResponse<Void> destroy(Long id);
}
