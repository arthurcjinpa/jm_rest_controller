package artur.service;

import artur.model.Role;
import artur.model.User;

import java.util.List;

public interface UserService {
    User findByUsername(String username);
    void addUser(User user);
    void updateUser(User user);
    void deleteById(long id);
    User findById(long id);
    List<User> findAllUsers();
    List<Role> findAllRoles();
    Role getRoleById(Long id);
    List<Role> setRolesToUser(String[] arr);
}