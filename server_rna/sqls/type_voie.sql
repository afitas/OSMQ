--
-- PostgreSQL database dump
--

-- Dumped from database version 10.2
-- Dumped by pg_dump version 10.2

-- Started on 2021-02-02 16:57:33

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 204 (class 1259 OID 24004)
-- Name: type_voie; Type: TABLE; Schema: public; Owner: postgres
--



--
-- TOC entry 2846 (class 0 OID 24004)
-- Dependencies: 204
-- Data for Name: type_voie; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY type_voie (pk) FROM stdin;
شارع
نهج
جادة
طريق خاص
ممر
مسار بلدي
مسار
طريق مسدود
مسار ولائي
طريق وطني
اخر
\.


--
-- TOC entry 2724 (class 2606 OID 24011)
-- Name: type_voie type_voie_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--


-- Completed on 2021-02-02 16:57:33

--
-- PostgreSQL database dump complete
--

