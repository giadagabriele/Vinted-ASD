package asd.vinted.data.entity;

import javax.persistence.*;

@Entity
@Table(name="messages")
public class Message {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String messageText;

    private long senderId;
    private long receiverId;

}
