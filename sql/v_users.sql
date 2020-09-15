CREATE OR REPLACE VIEW public.v_users AS
    SELECT
        users.user_id,
        users.username,
        users.email,
        users.avatar,
        users.roles_id,
        roles.role_name,
        users."createdAt",
        users."updatedAt"
    FROM users
        JOIN roles ON users.roles_id = roles.role_id;