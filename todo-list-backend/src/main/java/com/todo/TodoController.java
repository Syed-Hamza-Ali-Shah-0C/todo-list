package com.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = "*")
public class TodoController {
    @Autowired
    private TodoService todoService;

    @GetMapping("/getAll")
    public List<Todo> getAll() {
        return todoService.getAll();
    }

    @DeleteMapping("/remove/{id}")
    public void remove(@PathVariable int id) {
        todoService.remove(id);
    }
}