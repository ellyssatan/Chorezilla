package miniproject02.vttp.miniproject02.repositories;

import static miniproject02.vttp.miniproject02.repositories.Queries.*;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import miniproject02.vttp.miniproject02.models.User;

@Repository
public class UserRepository {

    @Autowired
    private JdbcTemplate template;
    
    //  retrive user from db
    public Optional<User> findByEmail(String email) {

        SqlRowSet rs = template.queryForRowSet(SQL_FIND_USER, email);
        // System.out.println(">>>> from user repo" + rs);

        if(!rs.next()) {
            return Optional.empty();
        }
      
        return Optional.of(User.createUser(rs));
    }

    // save user to db
    public void saveUser(User user) {

        System.out.println("\n......saving user to SQL....\n");

        template.update(SQL_SAVE_USER, user.getId(), user.getName(), user.getEmail(), user.getPassword());
    }
}