package miniproject02.vttp.miniproject02.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import miniproject02.vttp.miniproject02.models.User;
import miniproject02.vttp.miniproject02.repositories.UserRepository;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    public Optional<User> findUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    public void createNewUser(User user) {
        userRepo.saveUser(user);
    }
}
