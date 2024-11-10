package com.compus.cns.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.compus.cns.service.MapService;

@RestController
@RequestMapping("/api/m")
public class MapController {
	@Autowired
	private MapService mapService;
	
	@GetMapping("/locate/{n1}/{n2}")
    public ResponseEntity<Object> locateDestination(@PathVariable long n1, @PathVariable long n2) {
		List<double[]> path = mapService.locateDestination(n1, n2);

        if (path.isEmpty()) {
            return new ResponseEntity<>("No path found between the specified nodes.", HttpStatus.CONFLICT);
        }
        
        return new ResponseEntity<>(path, HttpStatus.OK);
    }
}
