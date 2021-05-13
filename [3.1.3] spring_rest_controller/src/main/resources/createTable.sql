insert into mydbtest.users (name, last_name, password, username)
values ('Admin', 'Adminov' , /* пароль - admin123 */ '$2y$12$2oxw7lIHK//sxLamm19wkOlW2EjgJcY6ahVQoCQpL0Hxov6kHHMTC', 'admin@gmail.com');
insert into mydbtest.users (name, last_name, password, username)
values ('User', 'Userov' , /* пароль - user123 */ '$2y$12$Z774o1uM4/NlEqPgjVD0vOqR8fC1qY9SS0xZ5XQQpHrYeLoEVQZv2', 'user@gmail.com');
insert into mydbtest.roles (name) value ('ROLE_USER');
insert into mydbtest.roles (name) value ('ROLE_ADMIN');
insert into mydbtest.users_roles (user_id, role_id) values (1,2);
insert into mydbtest.users_roles (user_id, role_id) values (2,1);

