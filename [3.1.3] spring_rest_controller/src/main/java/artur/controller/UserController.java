package artur.controller;

import java.security.Principal;

import artur.model.User;
import artur.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/admin")
    public String viewUsersList(Model model, Principal principal) {
        model.addAttribute("allUsers", userService.findAllUsers());
        model.addAttribute("allRoles", userService.findAllRoles());
        model.addAttribute("newUser", new User());
        model.addAttribute("currentUser", userService.findByUsername(principal.getName()));
        return "admin_only";
    }

    @GetMapping("/user")
    public String showUserPage(Model model, Principal principal) {
        model.addAttribute("user", userService.findByUsername(principal.getName()));
        return "user";
    }


    @GetMapping("/")
    public String login() {
        return "index";
    }

}