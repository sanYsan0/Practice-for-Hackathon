-- ============================================================================
-- MANUAL TEARDOWN SCRIPT — DO NOT RUN AUTOMATICALLY
-- ============================================================================
-- This file is NEVER executed by the ARI module loader.
-- Run manually in Supabase Studio or psql to remove this module's tables.
-- Running this will PERMANENTLY DELETE all data.
-- ============================================================================

DROP TABLE IF EXISTS aegis_logs CASCADE;
DROP TABLE IF EXISTS aegis_agents CASCADE;
