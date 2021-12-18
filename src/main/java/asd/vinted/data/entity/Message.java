package asd.vinted.data.entity;
import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name="messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String senderId;
    private String recieverId;
    private String subject;
    private String description;
    private String sentDate;

    public String getSenderId() {
        return this.senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public String getRecieverId() {
        return this.recieverId;
    }

    public void setReciverId(String reciverId) {
        this.recieverId = reciverId;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getSubject() {
        return this.subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSentDate() {
        return this.sentDate;
    }

    public void setSentDate(String sentDate) {
        this.sentDate = sentDate;
    }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (!(o instanceof Message))
      return false;
    Message message = (Message) o;
    return Objects.equals(this.id, message.id) && Objects.equals(this.subject, message.subject) && Objects
        .equals(this.subject, message.subject);
  }

  @Override
  public int hashCode() {
    return Objects.hash(this.id, this.senderId,this.recieverId);
  }
}
