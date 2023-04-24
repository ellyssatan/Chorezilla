package miniproject02.vttp.miniproject02.models;

public class Task {
    
    private String id;
    private String title;
    private String description;
    private String username;

    public String getId() {        return id;        }
    public void setId(String id) {        this.id = id;        }

    public String getTitle() {        return title;        }
    public void setTitle(String title) {        this.title = title;        }

    public String getDescription() {        return description;        }
    public void setDescription(String description) {        this.description = description;        }

    public String getUsername() {        return username;        }
    public void setUsername(String username) {        this.username = username;        }

    public Task(String id, String title, String description, String username) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.username = username;
    }

    @Override
    public String toString() {
        return String.format(
        """
            Title: %s
            Description: %s
            Added by: %s\n
        """, title, description, username);
    }



}
