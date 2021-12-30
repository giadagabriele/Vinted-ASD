package asd.vinted.data.dto;
import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonFormat;

import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;
import java.sql.Timestamp;
public class MessageDto implements Serializable {
  private Long id;
  private String senderId;
  private String recieverId;
  private String subject;
  private String description;

  @CreationTimestamp
  private Timestamp sentDate;

  public Timestamp getSentDate() {
      return this.sentDate;
  }

  public void setSentDate(Timestamp sentDate) {
      this.sentDate = sentDate;
  }

  public Long getId() {
    return this.id;
}

public void setId(Long id) {
    this.id = id;
}
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


}
