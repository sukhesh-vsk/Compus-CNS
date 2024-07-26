package com.compus.cns;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class CnsApplication {

	@RequestMapping("/")
	public String home() {
			return "Hello World! Hi guys";
	}

	public static void main(String[] args) {
		SpringApplication.run(CnsApplication.class, args);
	}

}
