
/*BELOW IS A SEEDING FOR EXAMPLE PURPOSES*/

BEGIN;

INSERT INTO "users" ("name", "mail", "admin_credentials") VALUES
('Silvia', 'silvia@mundoclasicaupa.com', 'FALSE'),
('Kenia', 'kenia@mundoclasicaupa.com', 'FALSE'),
('Elizabeth', 'elizabeth.trabanino@mundoclasicaupa.com', 'TRUE'),
('Loly', 'loly.romero@mundoclasicaupa.com', 'FALSE'),
('Jeannette', 'jeannette@mundoclasicaupa.com', 'FALSE'),
('Kenia', 'kenia@mundoclasicaupa.com', 'FALSE'),
('Doris', 'doris.quintanilla@mundoclasicaupa.com', 'FALSE'),
('Cesar', 'cesar.calderon@mundoclasicaupa.com', 'FALSE')
;

INSERT INTO "customers" ("name") VALUES
('MELHER'),
('CINEPOLIS')
;

INSERT INTO "deals" ("fk_user", "fk_customer", "details", "monthly_value", "one_off_value", "contract_duration") VALUES
(9, 1, 'cuña dos veces por semana', 300, 0, 6 ),
(1, 2, 'patrocinio show Venciendo Miedos', 300, 0, 12 ),
(2, 1, 'cuña 3 veces por semana', 300, 0, 1 )
;

INSERT INTO "operations" ("fk_deal","tasks", "completion_status") VALUES
(1, 'cuña #234 , 2 veces por semana a las 4pm',0.3)
;


COMMIT;

