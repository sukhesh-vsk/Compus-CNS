package com.compus.cns.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.compus.cns.model.User;
import com.compus.cns.service.UserService;

@RestController
@RequestMapping("api/u/")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
	
	@Autowired
	private UserService userserve;
	
	@PostMapping("/auth/register")
	public ResponseEntity<String> addUser(@RequestBody User data) {
		try {
            User savedUser = userserve.addUser(data);
            return new ResponseEntity<>("User added with ID: " + savedUser.getId(), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to add user: " + e.getMessage(), HttpStatus.CONFLICT);
        }
	}
	
	@GetMapping("/get")
	public ResponseEntity<?> getUser() {
		try {
            List<User> users = userserve.findAllUsers();
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to fetch users: " + e.getMessage(), HttpStatus.CONFLICT);
        }
	}
	
	@GetMapping("/auth/login")
	public ResponseEntity<String> login(@RequestParam String mail, @RequestParam String pwd) {
			String isUser = userserve.login(mail, pwd);
			switch (isUser) {
			case "Login Successful":
				return new ResponseEntity<>("Login successful", HttpStatus.OK);
			case "Password mismatch":
				return new ResponseEntity<>("Password mismatch", HttpStatus.CONFLICT);
			case "Mail does not exists":
				return new ResponseEntity<>("Mail does not exist", HttpStatus.NOT_FOUND);
			default:
				return new ResponseEntity<>("Try again", HttpStatus.INTERNAL_SERVER_ERROR);
			}
	}

	@GetMapping("/auth/hashpwd")
	public ResponseEntity<String[]> encodePassword(@RequestParam String password) {
		String[] data = userserve.hashPassword(password);
		return new ResponseEntity<>(data, HttpStatus.OK);
	}
	
	@DeleteMapping("/auth/del/{id}")
	public ResponseEntity<String> deleteId(@PathVariable int id) {
		String deletedId = userserve.deleteId(id);
		if(deletedId != null) {
			return new ResponseEntity<>("Id " + deletedId + " deleted.", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Id does not exists", HttpStatus.NOT_FOUND);
		}
	}
	
	 @PutMapping("/update/{email}")
	 public ResponseEntity<String> update(@RequestBody User user, @PathVariable String email) {
	     String responseMessage = userserve.update(user, email);
	     if (responseMessage.contains("successfully")) {
	          return new ResponseEntity<>(responseMessage, HttpStatus.OK);
	     } else {
	          return new ResponseEntity<>(responseMessage, HttpStatus.CONFLICT);
	        }
	 }

	
//	    public ResponseEntity<?> findByName(@PathVariable String username) {
//		 try {
//	            Optional<User> user = userserve.findByName(username);
//	            if (user.isPresent()) {
//	                return new ResponseEntity<>(user.get(), HttpStatus.OK);
//	            } else {
//	                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
//	            }
//	        } catch (Exception e) {
//	            return new ResponseEntity<>("Failed to fetch user: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
//	        }
//	    }
	 
}
