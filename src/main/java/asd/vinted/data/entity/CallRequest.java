package asd.vinted.data.entity;

import javax.persistence.*;

@Entity
public class CallRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;


    @ManyToOne
    @JoinColumn(name = "user_req")
    User userOfRequest;

    @ManyToOne
    @JoinColumn(name = "user_resp")
    User userOfResponse;

    @Column(columnDefinition = "int default false")
    int status;

    @Column(columnDefinition = "boolean default false")
    boolean report;

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public boolean isReport() {
        return report;
    }

    public void setReport(boolean report) {
        this.report = report;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUserOfRequest() {
        return userOfRequest;
    }



    public void setUserOfRequest(User user_of_request) {
        this.userOfRequest = user_of_request;
    }

    public User getUserOfResponse() {
        return userOfResponse;
    }

    public void setUserOfResponse(User user_of_resp) {
        this.userOfResponse = user_of_resp;
    }
    @Override
    public String toString() {
        return "CallRequest{" +
                "id=" + id +
                ", userOfRequest=" + userOfRequest +
                ", userOfResponse=" + userOfResponse +
                ", status=" + status +
                ", report=" + report +
                '}';
    }
}
