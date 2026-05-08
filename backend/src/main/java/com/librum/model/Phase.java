package com.librum.model;

import jakarta.persistence.*;

@Entity
@Table(name = "phases")
public class Phase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @Column(name = "phase_number", nullable = false)
    private int phaseNumber;

    @Column(nullable = false, length = 200)
    private String title;

    public Phase() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Book getBook() { return book; }
    public void setBook(Book book) { this.book = book; }
    public int getPhaseNumber() { return phaseNumber; }
    public void setPhaseNumber(int phaseNumber) { this.phaseNumber = phaseNumber; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
}
