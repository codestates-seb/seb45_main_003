package main.wonprice.domain.member.service;

import main.wonprice.domain.member.entity.Member;
import main.wonprice.domain.member.entity.Review;
import main.wonprice.domain.member.repository.ReviewRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository repository;

    public ReviewService(ReviewRepository repository) {
        this.repository = repository;
    }

    public Review createReview(Review review) {
        return repository.save(review);
    }

    public List<Review> findReviews(Pageable pageable, Member member) {

        return repository.findAllByMember(pageable, member).getContent();
    }
}
