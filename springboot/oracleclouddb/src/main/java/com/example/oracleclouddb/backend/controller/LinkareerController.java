package com.example.oracleclouddb.backend.controller;

import com.example.oracleclouddb.backend.entity.Linkareer;
import com.example.oracleclouddb.backend.repository.LinkareerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * LINKAREER 테이블 데이터를 제공하는 컨트롤러입니다.
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/linkareer")
public class LinkareerController {

    @Autowired
    private LinkareerRepository linkareerRepository;

    // 전체 조회 API
    @GetMapping
    public ResponseEntity<?> getAllLinkareer() {
        System.out.println("✅ Linkareer API 진입");
        List<Linkareer> list = linkareerRepository.findAll();
        System.out.println("📦 불러온 데이터 수: " + list.size());
        return ResponseEntity.ok(list);
    }
}
