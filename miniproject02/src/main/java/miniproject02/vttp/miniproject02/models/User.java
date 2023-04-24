package miniproject02.vttp.miniproject02.models;

import java.util.UUID;

import org.springframework.jdbc.support.rowset.SqlRowSet;

public class User {

    private String id;
    private String name;
    private String email;
    private String password;

    public User() {}

    public User(String name, String email, String password) {
        this.id = UUID.randomUUID().toString().substring(0, 5);
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public String getId() {        return id;        }
    public void setId(String id) {        this.id = id;        }

    public String getName() {        return name;        }
    public void setName(String name) {        this.name = name;        }

    public String getEmail() {        return email;        }
    public void setEmail(String email) {        this.email = email;        }

    public String getPassword() {        return password;        }
    public void setPassword(String password) {        this.password = password;        }

    public static User createUser(SqlRowSet rs) {
        User user = new User();
        user.setId(rs.getString("id"));
        user.setName(rs.getString("name"));
        user.setEmail(rs.getString("email"));
        user.setPassword(rs.getString("password"));
        return user;
    }
}
