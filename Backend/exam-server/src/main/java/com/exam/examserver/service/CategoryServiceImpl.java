package com.exam.examserver.service;

import com.exam.examserver.entity.Category;
import com.exam.examserver.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getByCategoryId(long cId) {
        return categoryRepository.findById(cId).get();
    }

    @Override
    public void deleteByCategoryId(long cId) {
        categoryRepository.deleteById(cId);
    }
}
