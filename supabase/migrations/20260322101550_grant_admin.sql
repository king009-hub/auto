INSERT INTO user_roles (user_id, role) VALUES ('61bb47f5-d907-4a00-9612-80233cc7cf53', 'admin') ON CONFLICT (user_id, role) DO NOTHING;
