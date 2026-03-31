import { describe, it, expect, vi } from 'vitest';
import { exportToCSV } from '../lib/exportCSV';

describe('exportToCSV', () => {
  it('generates CSV and triggers download', () => {
    // Create a real anchor element but spy on click
    const realAnchor = document.createElement('a');
    const clickSpy = vi.fn();
    realAnchor.click = clickSpy;

    vi.spyOn(document, 'createElement').mockReturnValue(realAnchor as any);
    global.URL.createObjectURL = vi.fn(() => 'blob:test');
    global.URL.revokeObjectURL = vi.fn();
    vi.spyOn(document.body, 'appendChild').mockImplementation((n) => n);
    vi.spyOn(document.body, 'removeChild').mockImplementation((n) => n);

    const surveys = [
      {
        id: '123',
        survey_type: 'adult',
        status: 'completed',
        user_name: 'João Silva',
        diagnosis: 'AVC',
        professional: 'Dra. Maria',
        application_date: '2026-03-31',
        created_at: '2026-03-31T10:00:00Z',
      },
    ];

    exportToCSV(surveys, 'test.csv');

    expect(global.URL.createObjectURL).toHaveBeenCalledOnce();
    expect(clickSpy).toHaveBeenCalledOnce();
    expect(realAnchor.download).toBe('test.csv');
    expect(global.URL.revokeObjectURL).toHaveBeenCalledWith('blob:test');

    const blobArg = (global.URL.createObjectURL as any).mock.calls[0][0] as Blob;
    expect(blobArg).toBeInstanceOf(Blob);
    expect(blobArg.type).toBe('text/csv;charset=utf-8;');

    vi.restoreAllMocks();
  });
});
