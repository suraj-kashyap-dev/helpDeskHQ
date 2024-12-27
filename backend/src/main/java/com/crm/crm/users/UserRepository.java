package com.crm.crm.users;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    public User findByEmail(String email);
    public User findByEmailAndPassword(String email, String password);
    public User findByEmailAndOrganizationId(String email, Long organizationId);
    public User findByEmailAndOrganizationIdAndPassword(String email, Long organizationId, String password);
    public List<User> findAllByOrderByCreatedAtDesc();
}
