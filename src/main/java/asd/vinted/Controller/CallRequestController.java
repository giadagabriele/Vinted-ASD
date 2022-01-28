package asd.vinted.Controller;



import asd.vinted.data.entity.CallRequest;
import asd.vinted.data.entity.Personalization;
import asd.vinted.data.service.CallRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/call")
@CrossOrigin(origins ="http://localhost:4200")
public class CallRequestController {

    @Autowired
    CallRequestService callRequestService;

    @GetMapping(value = "/allResponsesByUserId/{id}")
    public ResponseEntity<List<CallRequest>> allResponsesByUserId(@PathVariable Long id){

        return ResponseEntity.ok(callRequestService.findAllRequestsByUserResponseId(id));
    }
    @GetMapping(value = "/allNotificationsByUserId/{id}")
    public ResponseEntity<List<CallRequest>> allRequestsOnStatusZeroByUserId(@PathVariable Long id){

        return ResponseEntity.ok(callRequestService.findAllRequestsStatusZeroByUserId(id));
    }

    @GetMapping(value = "/allRequestsByUserId/{id}")
    public ResponseEntity<List<CallRequest>> allMyRequests(@PathVariable Long id){

        return ResponseEntity.ok(callRequestService.findAllRequestsByUserRequestId(id));
    }

    @PostMapping(value = "/save/")
    @CrossOrigin(origins ="http://localhost:4200")
    public ResponseEntity<Boolean> saveCallRequest(@RequestBody CallRequest callRequest){

        return ResponseEntity.ok(callRequestService.saveRequest(callRequest));
    }
    @PostMapping(value = "/accept/")
    @CrossOrigin(origins ="http://localhost:4200")
    public ResponseEntity<Boolean> acceptCallRequest(@RequestBody CallRequest cr){
        System.out.println(cr);

        try {
            callRequestService.acceptRequest(cr);
            return ResponseEntity.ok(true);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.ok(false);

        }
    }
    @PostMapping(value = "/cancel/")
    @CrossOrigin(origins ="http://localhost:4200")
    public ResponseEntity<Boolean> cancelCallRequest(@RequestBody CallRequest cr){

        try {
            callRequestService.cancelRequest(cr.getId());
            return ResponseEntity.ok(true);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.ok(false);

        }
    }

}
