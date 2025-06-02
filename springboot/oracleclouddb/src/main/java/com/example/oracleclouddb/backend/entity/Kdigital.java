package com.example.oracleclouddb.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * KDIGITAL 테이블과 매핑되는 엔티티 클래스입니다.
 */
@Entity
@Table(name = "bootcampe")
public class Kdigital {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 증가
    @Column(name = "id")
    private Long id;

    @Column(name = "훈련기관명", length = 255)
    private String trainingInstitution;

    @Column(name = "`주소/회사번호`", length = 400)
    private String addressPhone;

    @Column(name = "훈련과정명", length = 400)
    private String courseName;

    @Column(name = "훈련기간", length = 100)
    private String trainingPeriod;

     // 기본 생성자 (JPA에서 필요)
    public Kdigital() {}

    // 전체 필드 생성자
    public Kdigital(String trainingInstitution, String addressPhone, String courseName, String trainingPeriod) {
        this.trainingInstitution = trainingInstitution;
        this.addressPhone = addressPhone;
        this.courseName = courseName;
        this.trainingPeriod = trainingPeriod;
    }

    // 아래는 각각 저장된 값을 가져오거나 바꾸는 함수예요 (getter / setter)

    public String getTrainingInstitution() {
        return trainingInstitution;
    }

    public void setTrainingInstitution(String trainingInstitution) {
        this.trainingInstitution = trainingInstitution;
    }

    public String getAddressPhone() {
        return addressPhone;
    }

    public void setAddressPhone(String addressPhone) {
        this.addressPhone = addressPhone;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getTrainingPeriod() {
        return trainingPeriod;
    }

    public void setTrainingPeriod(String trainingPeriod) {
        this.trainingPeriod = trainingPeriod;
    }
}

   


