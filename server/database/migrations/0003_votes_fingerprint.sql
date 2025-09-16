-- Drop existing votes table
DROP TABLE IF EXISTS `votes`;

-- Create new votes table with fingerprint
CREATE TABLE `votes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`fingerprint` text NOT NULL,
	`idea_id` integer NOT NULL,
	`created_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	FOREIGN KEY (`idea_id`) REFERENCES `ideas`(`id`) ON UPDATE no action ON DELETE no action
);

-- Create unique index to prevent duplicate votes
CREATE UNIQUE INDEX `unique_fingerprint_idea` ON `votes` (`fingerprint`,`idea_id`);