package com.example.oracleclouddb.backend.controller;

import com.example.oracleclouddb.backend.entity.Kdigital;
import com.example.oracleclouddb.backend.repository.KdigitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/kdigital")
public class KdigitalController {
    @Autowired
    private KdigitalRepository kdigitalRepository;

    //전체 조회 API
    @GetMapping
    public ResponseEntity<?> getKdigitalCourses() {
        System.out.println("✅ Kdigital API 진입");
        List<Kdigital> list = kdigitalRepository.findAll();
        System.out.println("📦 불러온 데이터 수: " + list.size());
        return ResponseEntity.ok(list);
    }
}
