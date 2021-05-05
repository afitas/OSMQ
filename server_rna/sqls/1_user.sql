--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

-- Started on 2021-01-26 13:40:40

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
-- TOC entry 2873 (class 0 OID 17102)
-- Dependencies: 213
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, username, first_name, last_name, password, active, affectation_id) FROM stdin;
1	admin	admin	admin	$6$rounds=656000$zmwtpCVegK3Mcl4Q$FVaDZY.RNpFEQep7pdiaa14SYHdE3ozfgjH4Z1oKVkE1ldAhaetBtv9Mb65BXkPo09MSyUWMuE7IGw8yw8B/X0	t	\N
\.


--
-- TOC entry 2879 (class 0 OID 0)
-- Dependencies: 212
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', COALESCE((SELECT MAX(id) FROM public.user), 1), true);



-- Completed on 2021-01-26 13:40:40

--
-- PostgreSQL database dump complete
--

