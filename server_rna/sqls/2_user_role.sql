--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

-- Started on 2021-01-26 13:39:38

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2872 (class 0 OID 17052)
-- Dependencies: 206
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role (id, name, description) FROM stdin;
0	مسؤول تقني	Admin
1	مسؤول وطني	National
2	مسؤول ولاية	Wilaya
3	مصادق	Validateur
4	مسؤول بلدية	Commune
\.


--
-- TOC entry 2878 (class 0 OID 0)
-- Dependencies: 205
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT pg_catalog.setval('public.role_id_seq', COALESCE((SELECT MAX(id) FROM public.role), 1), true);




-- Completed on 2021-01-26 13:39:38

--
-- PostgreSQL database dump complete
--

