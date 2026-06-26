-- Seed default site settings
insert into site_settings (section, key, value) values
('hero', 'badge', '"Unisex Luxury Salon"'),
('hero', 'headline', '"Vietnam Burger"'),
('hero', 'subheadline', '"Where urban edge meets elite prestige. Discover the new standard of unisex grooming, from signature fades to artisanal braiding."'),
('about', 'headline', '"The Culture of Excellence"'),
('about', 'body', '"Vietnam Burger Unisex Salon is more than a destination; it''s a statement. Born in the heart of the city, we specialize in high-definition fades, artisanal braiding, and elite tinting for those who refuse to settle for ordinary."'),
('about', 'features', '[{"title":"Elite Unisex Services","desc":"Master-level grooming tailored for both men and women."},{"title":"Instant Booking","desc":"Skip the line. Book your slot effortlessly via WhatsApp."},{"title":"Urban Sophistication","desc":"A high-end atmosphere designed for the modern trendsetter."},{"title":"Precision Artistry","desc":"Specializing in sharp fades, intricate braids, and vibrant tints."}]'),
('contact', 'address', '"123 Luxury Avenue, Victoria Island, Lagos, Nigeria"'),
('contact', 'phone', '"+234 911 897 0291"'),
('contact', 'hours', '"Mon - Sat: 9:00 AM - 8:00 PM\nSun: 12:00 PM - 6:00 PM"'),
('contact', 'cta_title', '"Elevate Your Identity"'),
('contact', 'cta_text', '"Ready for a transformation that commands attention? Our master stylists are ready for you. Secure your elite grooming experience instantly via WhatsApp."'),
('footer', 'brand', '"VIETNAM BURGER"'),
('footer', 'copyright', '"© 2026 Vietnam Burger Unisex Salon. All Rights Reserved."'),
('social', 'tiktok', '"https://www.tiktok.com/@vietnam_burger_salon1"'),
('social', 'instagram', '"#"'),
('social', 'facebook', '"#"');

-- Seed default services
insert into services (name, price, description, category, sort_order) values
('The Precision Blade', 5000, 'Define your profile with the sharpest fades and surgical line-ups. Master-level grooming that commands respect.', 'Hair', 1),
('Neon Burger Tints', 10000, 'Transform your vibe with bold, vibrant tints and expert bleaching. High-energy color designed to turn heads.', 'Hair', 2),
('The Artisan Crown', 15000, 'Slay the game with flawless knotless braids and intricate cornrows. Protective styles crafted for the elite.', 'Beauty', 3),
('The Gold Standard', 8000, 'Indulge in the ultimate scalp care ritual. Deep-cleansing and revitalizing treatments for true hair health.', 'Grooming', 4);
