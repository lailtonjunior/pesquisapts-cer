import { describe, it, expect } from 'vitest';
import {
  INITIAL_DATA,
  REQUIRED_FIELDS,
  UPDATE_REASONS,
  FUNCTIONALITY_OPTIONS,
  HEALTH_NETWORK_OPTIONS,
  MODALITY_OPTIONS,
  INDEPENDENCE_OPTIONS,
} from '../constants/survey';

describe('Survey Constants', () => {
  it('INITIAL_DATA has all required fields as empty', () => {
    expect(INITIAL_DATA.surveyType).toBe('');
    expect(INITIAL_DATA.userName).toBe('');
    expect(INITIAL_DATA.modality).toEqual([]);
    expect(INITIAL_DATA.ptsName).toBe('');
  });

  it('INITIAL_DATA has dates initialized', () => {
    expect(INITIAL_DATA.applicationDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(INITIAL_DATA.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(INITIAL_DATA.ptsCreationDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('REQUIRED_FIELDS step1 includes essential fields', () => {
    const step1 = REQUIRED_FIELDS['step1'];
    expect(step1).toContain('userName');
    expect(step1).toContain('birthDate');
    expect(step1).toContain('diagnosis');
    expect(step1).toContain('professional');
  });

  it('REQUIRED_FIELDS has entries for all main steps', () => {
    expect(REQUIRED_FIELDS).toHaveProperty('step1');
    expect(REQUIRED_FIELDS).toHaveProperty('step2_adult');
    expect(REQUIRED_FIELDS).toHaveProperty('step2_child');
    expect(REQUIRED_FIELDS).toHaveProperty('step3_adult');
    expect(REQUIRED_FIELDS).toHaveProperty('step5_adult');
  });

  it('option arrays are non-empty', () => {
    expect(UPDATE_REASONS.length).toBeGreaterThan(0);
    expect(FUNCTIONALITY_OPTIONS.length).toBeGreaterThan(0);
    expect(HEALTH_NETWORK_OPTIONS.length).toBeGreaterThan(0);
    expect(MODALITY_OPTIONS.length).toBeGreaterThan(0);
    expect(INDEPENDENCE_OPTIONS.length).toBe(3);
  });

  it('MODALITY_OPTIONS contains expected CER modalities', () => {
    expect(MODALITY_OPTIONS).toContain('Fisioterapia');
    expect(MODALITY_OPTIONS).toContain('Fonoaudiologia');
    expect(MODALITY_OPTIONS).toContain('Terapia Ocupacional');
    expect(MODALITY_OPTIONS).toContain('Psicologia');
  });
});
