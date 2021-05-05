-- decision table
CREATE INDEX IF NOT EXISTS numero_idx_trgm ON public.decision USING gin (numero gin_trgm_ops);
CREATE INDEX IF NOT EXISTS valueinformation_idx_gin ON public.decision USING gin ("valueInformation");
CREATE INDEX IF NOT EXISTS valueinformation_idx_trgm ON public.decision USING gin (("valueInformation"->0->'value'->>'name') gin_trgm_ops);
CREATE INDEX IF NOT EXISTS valueinformation_idx_trgm_fr ON public.decision USING gin (("valueInformation"->1->'value'->>'name') gin_trgm_ops);
CREATE INDEX IF NOT EXISTS decision_type_idx_btree ON public.decision USING BTREE (decision_type);
CREATE INDEX IF NOT EXISTS pk_commune_idx_btree ON public.decision USING BTREE (pk_commune);
CREATE INDEX IF NOT EXISTS creator_id_idx_btree ON public.decision USING BTREE (creator_id);
-- Some Requests to test with it

-- explain analyse SELECT count(*) AS count_1 FROM (SELECT decision.pk AS decision_pk, decision.numero AS decision_numero, decision.numero_a_debatise AS decision_numero_a_debatise, decision.date AS decision_date, decision.decision_type AS decision_decision_type, decision.component_type AS decision_component_type, decision."valueInformation" AS "decision_valueInformation", decision.created_at AS decision_created_at, decision.scan_decision_name AS decision_scan_decision_name, decision.status AS decision_status, decision.creator_id AS decision_creator_id, decision."addressComponent_id" AS "decision_addressComponent_id", decision.pk_commune AS decision_pk_commune FROM decision WHERE decision.numero = '1234' AND decision.pk_commune = '0128' ) AS rr;
-- explain analyse SELECT decision.pk AS decision_pk, decision.numero AS decision_numero, decision.numero_a_debatise AS decision_numero_a_debatise, decision.date AS decision_date, decision.decision_type AS decision_decision_type, decision.component_type AS decision_component_type, decision."valueInformation" AS "decision_valueInformation", decision.created_at AS decision_created_at, decision.scan_decision_name AS decision_scan_decision_name, decision.status AS decision_status, decision.creator_id AS decision_creator_id, decision."addressComponent_id" AS "decision_addressComponent_id", decision.pk_commune AS decision_pk_commune FROM decision WHERE decision.numero IS NOT NULL AND decision.numero != '' AND decision.decision_type = 'BATISATION' AND decision.pk_commune = '0128' AND (decision.numero ILIKE '%aze%' OR (((decision."valueInformation" -> 0) -> 'value' ->> 'name' ILIKE '%aze%' )));

-- END decision table  --------------------------------------

-- commune table
--CREATE INDEX IF NOT EXISTS commune_idx_trgm ON public.commune USING gin (commune gin_trgm_ops);

-- END commune table  --------------------------------------


-- user table
CREATE INDEX IF NOT EXISTS user_idx_btree ON public.user USING BTREE  (affectation_id);


-- END user table  --------------------------------------
