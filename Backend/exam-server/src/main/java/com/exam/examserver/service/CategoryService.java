package com.exam.examserver.service;

import com.exam.examserver.entity.Category;

import java.util.List;

public interface CategoryService {

    Category addCategory(Category category);

    Category updateCategory(Category category);

    List<Category> getAllCategories();

    Category getByCategoryId(long cId);

    void deleteByCategoryId(long cId);
}
