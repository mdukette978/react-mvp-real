DROP TABLE IF EXISTS entries;

CREATE TABLE entries (
   entry_id SERIAL PRIMARY KEY NOT NULL,
   date date NOT NULL,
   severity varchar(15) NOT NULL,
   location varchar(25) NOT NULL,
   trigger varchar(25) NOT NULL,
   treatment_method varchar(25),
   relief varchar(10)
);


INSERT INTO entries (date, severity, location, trigger, treatment_method, relief) VALUES ('2023-05-14', 'light', 'front, middle', 'unsure', 'none', 'no');
INSERT INTO entries (date, severity, location, trigger, treatment_method, relief) VALUES ('2023-05-22', 'medium', 'top, L-sided', 'sound, headphones', 'medication', 'yes');
INSERT INTO entries (date, severity, location, trigger, treatment_method, relief) VALUES ('2023-05-26', 'medium', 'top, L & R-sided', 'stress', 'sleep', 'yes');
