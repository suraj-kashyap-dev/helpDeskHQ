package com.crm.crm.comments;

import java.util.List;

import com.crm.crm.helpers.ApiResponse;

public interface CommentService {
    public ApiResponse<List<Comment>> index();
    public ApiResponse<Comment> show(Long id);
    public ApiResponse<Comment> store(CommentDTO commentDTO);
    public ApiResponse<Comment> update(Long id, CommentDTO comment);
    public ApiResponse<Void> destroy(Long id);
}
