package com.crm.crm.comments;

import com.crm.crm.exceptions.resources.*;
import com.crm.crm.helpers.ApiResponse;
import com.crm.crm.tickets.Ticket;
import com.crm.crm.tickets.TicketRepository;
import com.crm.crm.users.User;
import com.crm.crm.users.UserRepository;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public CommentServiceImpl(
            CommentRepository commentRepository,
            TicketRepository ticketRepository,
            UserRepository userRepository,
            ModelMapper modelMapper
    ) {
        this.commentRepository = commentRepository;
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ApiResponse<List<Comment>> index() {
        try {
            return ApiResponse.success(
                "Comments retrieved successfully", 
                this.commentRepository.findAllByOrderByCreatedAtDesc()
            );
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving comments", e);
        }
    }

    @Override
    public ApiResponse<Comment> show(Long id) {
        try {
            Optional<Comment> commentOpt = this.commentRepository.findById(id);

            return commentOpt
                    .map(comment -> ApiResponse.success("Comment retrieved successfully", comment))
                    .orElseThrow(() -> new ResourceNotFoundException("Comment not found"));
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error retrieving comment");
        }
    }

    @Override
    public ApiResponse<Comment> store(CommentDTO commentDTO) {
        try {
            Optional<Ticket> ticketOpt = this.ticketRepository.findById(commentDTO.getTicketId());
            if (ticketOpt.isEmpty()) {
                throw new ResourceNotFoundException("Ticket not found");
            }

            Optional<User> userOpt = this.userRepository.findById(commentDTO.getSenderId());
            if (userOpt.isEmpty()) {
                throw new ResourceNotFoundException("User not found");
            }

            Comment comment = this.modelMapper.map(commentDTO, Comment.class);
            comment.setTicket(ticketOpt.get());
            comment.setSender(userOpt.get());

            return ApiResponse.success(
                    "Comment created successfully",
                    this.commentRepository.save(comment)
            );
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new ResourceCreationException("Error creating comment: " + e.getMessage());
        }
    }

    @Override
    public ApiResponse<Comment> update(Long id, CommentDTO commentDTO) {
        try {
            Optional<Comment> commentOpt = this.commentRepository.findById(id);
            if (commentOpt.isEmpty()) {
                throw new ResourceNotFoundException("Comment not found");
            }

            Comment existingComment = commentOpt.get();

            if (commentDTO.getTicketId() != null) {
                Optional<Ticket> ticketOpt = this.ticketRepository.findById(commentDTO.getTicketId());
                if (ticketOpt.isEmpty()) {
                    throw new ResourceNotFoundException("Ticket not found");
                }
                existingComment.setTicket(ticketOpt.get());
            }

            if (commentDTO.getSenderId() != null) {
                Optional<User> userOpt = this.userRepository.findById(commentDTO.getSenderId());
                if (userOpt.isEmpty()) {
                    throw new ResourceNotFoundException("User not found");
                }
                existingComment.setSender(userOpt.get());
            }

            existingComment.setContent(commentDTO.getContent());
            existingComment.setIsInternal(commentDTO.getIsInternal());
            existingComment.setIsResolution(commentDTO.getIsResolution());
            existingComment.setMentions(commentDTO.getMentions());

            return ApiResponse.success(
                    "Comment updated successfully",
                    this.commentRepository.save(existingComment)
            );
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResourceUpdateException("Error updating comment: " + e.getMessage());
        }
    }

    @Override
    public ApiResponse<Void> destroy(Long id) {
        try {
            if (!this.commentRepository.existsById(id)) {
                throw new ResourceNotFoundException("Comment not found");
            }

            this.commentRepository.deleteById(id);
            return ApiResponse.success("Comment deleted successfully", null);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new ResourceDeletionException("Error deleting comment");
        }
    }
}
