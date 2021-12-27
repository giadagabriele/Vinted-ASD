package asd.vinted.data.entity;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;

import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.sql.Date;
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
    @CreationTimestamp
    private Timestamp sentDate;

    public String getSenderId() {
        return this.senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public String getRecieverId() {
        return this.recieverId;
    }

    public void setRecieverId(String recieverId) {
        this.recieverId = recieverId;
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

    public Timestamp getSentDate() {
        return this.sentDate;
    }

    public void setSentDate(Timestamp sentDate) {
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
        .equals(this.recieverId, message.recieverId);
  }

  @Override
  public int hashCode() {
    return Objects.hash(this.id, this.senderId,this.recieverId);
  }
}
