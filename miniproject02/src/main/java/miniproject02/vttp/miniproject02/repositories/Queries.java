package miniproject02.vttp.miniproject02.repositories;

public class Queries {

    public static final String SQL_FIND_USER = "SELECT * FROM users WHERE email=?";
    public static final String SQL_SAVE_USER = "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)";   
}