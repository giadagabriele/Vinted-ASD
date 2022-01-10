package asd.vinted.data.payment;

public class PayPalPaymentResponse {

    private boolean status;
    private String url;

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

}
