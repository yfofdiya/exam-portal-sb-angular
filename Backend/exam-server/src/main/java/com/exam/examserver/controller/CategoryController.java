package com.exam.examserver.controller;

import com.exam.examserver.entity.Category;
import com.exam.examserver.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin("http://localhost:4200/")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public ResponseEntity<Category> add(@RequestBody Category category) {
        return ResponseEntity.ok().body(categoryService.addCategory(category));
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAll() {
        return ResponseEntity.ok().body(categoryService.getAllCategories());
    }

    @GetMapping("/{cId}")
    public ResponseEntity<Category> getByCId(@PathVariable long cId) {
        return ResponseEntity.ok().body(categoryService.getByCategoryId(cId));
    }

    @PutMapping
    public ResponseEntity<Category> update(@RequestBody Category category) {
        return ResponseEntity.ok().body(categoryService.updateCategory(category));
    }

    @DeleteMapping("/{cId}")
    public void deleteByCId(@PathVariable long cId) {
        categoryService.deleteByCategoryId(cId);
    }
}
