package asd.vinted.data.dto;
import java.io.Serializable;

public class MessageDto implements Serializable {
    
  private Long id;
  private String senderId;
  private String recieverId;
  private String subject;
  private String description;
  private String sentDate;

  public String getSentDate() {
      return this.sentDate;
  }

  public void setSentDate(String sentDate) {
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

  public void setReciver(String recieverId) {
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
