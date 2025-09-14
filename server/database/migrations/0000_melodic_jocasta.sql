CREATE TABLE `ideas` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`author` text NOT NULL,
	`name` text NOT NULL,
	`tagline` text NOT NULL,
	`tags` text NOT NULL,
	`description` text,
	`links` text,
	`icon` text,
	`video` text,
	`images` text,
	`created_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL
);
