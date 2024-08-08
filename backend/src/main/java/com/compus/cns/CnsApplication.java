package com.compus.cns;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication(exclude= {SecurityAutoConfiguration.class})
public class CnsApplication {

	@GetMapping("/")
	public String home() {
		return "Hello! Hi Hello guys";
	}

	public static void main(String[] args) {
		SpringApplication.run(CnsApplication.class, args);
	}

}
