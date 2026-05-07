package com.librum.model;

import jakarta.persistence.*;

@Entity
@Table(name = "genres")
public class Genre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(unique = true, nullable = false, length = 50)
    private String slug;

    @Column(name = "icon_emoji", length = 10)
    private String iconEmoji;

    @Column(columnDefinition = "TEXT")
    private String description;

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getSlug() { return slug; }
    public String getIconEmoji() { return iconEmoji; }
    public String getDescription() { return description; }
}