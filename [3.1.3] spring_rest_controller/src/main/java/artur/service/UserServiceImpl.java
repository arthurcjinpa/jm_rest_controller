package artur.service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import artur.model.Role;
import artur.model.User;
import artur.repositories.RoleRepository;
import artur.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final EntityManager entityManager;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository,
                           EntityManager entityManager, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.entityManager = entityManager;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void updateUser(User user) {
        if (!userRepository.getOne(user.getId()).getPassword().equals(user.getPassword())) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        userRepository.saveAndFlush(user);
    }

    @Override
    @Transactional
    public void deleteById(long id) {
        userRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void addUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.saveAndFlush(user);
    }

    @Override
    @Transactional
    public User findById(long id) {
        return userRepository.findById(id).get();
    }

    @Override
    @Transactional
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    @Transactional
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    @Transactional
    public List<Role> findAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    @Transactional
    public Role getRoleById(Long id) {
        return roleRepository.getOne(id);
    }

    @Override
    @Transactional
    public List<Role>setRolesToUser(String[] arr) {
       List<Integer> listOfId = Arrays.stream(arr).mapToInt(Integer::parseInt)
               .boxed().collect(Collectors.toList());

       return entityManager.createQuery("SELECT a FROM Role a WHERE a.id IN (:id)", Role.class)
               .setParameter("id",listOfId)
               .getResultList();
    }
}
