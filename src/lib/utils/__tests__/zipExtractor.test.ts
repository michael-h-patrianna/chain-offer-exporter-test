import JSZip from 'jszip';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ChainOfferExport } from '../../types';
import { extractChainOfferZip } from '../zipExtractor';

// Mock JSZip
vi.mock('jszip');

describe('zipExtractor', () => {
  let mockZip: any;
  let mockFile: any;
  let consoleLogSpy: any;
  let consoleWarnSpy: any;

  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();

    // Mock console methods
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    // Mock file object
    mockFile = vi.fn();

    // Mock ZIP instance
    mockZip = {
      loadAsync: vi.fn(),
      file: mockFile,
      files: {},
    };

    // Mock JSZip constructor
    (JSZip as any).mockImplementation(() => mockZip);

    // Mock URL.createObjectURL
    global.URL.createObjectURL = vi
      .fn()
      .mockImplementation(
        (blob: Blob) =>
          `blob:${blob.type || 'application/octet-stream'}/${Math.random().toString(36)}`
      );
  });

  const createMockChainOfferData = (): ChainOfferExport => ({
    chainOfferId: 'test-chain-offer',
    frameSize: { width: 800, height: 600 },
    background: { exportUrl: 'background.png' },
    offers: [
      {
        offerKey: 'offer1',
        stateBounds: {
          Locked: { x: 10, y: 20, width: 100, height: 50 },
          Unlocked: { x: 15, y: 25, width: 105, height: 55 },
          Claimed: { x: 20, y: 30, width: 110, height: 60 },
        },
        lockedImg: 'offer1_locked.png',
        unlockedImg: 'offer1_unlocked.png',
        claimedImg: 'offer1_claimed.png',
      },
    ],
    timer: {
      position: { x: 400, y: 50 },
      dimensions: { width: 120, height: 40 },
      borderRadius: 8,
      backgroundFill: { type: 'solid', color: '#000000' },
      isAutolayout: false,
      layoutSizing: { horizontal: 'fixed', vertical: 'fixed' },
      padding: { vertical: 8, horizontal: 16 },
      dropShadows: [],
      textStyle: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: 500,
        textAlignHorizontal: 'center',
        textAlignVertical: 'center',
      },
    },
    header: {
      stateBounds: {
        active: { x: 400, y: 100, width: 300, height: 50 },
        success: { x: 400, y: 100, width: 300, height: 50 },
        fail: { x: 400, y: 100, width: 300, height: 50 },
      },
      activeImg: 'header_active.png',
      successImg: 'header_success.png',
      failImg: 'header_fail.png',
    },
    buttons: [
      {
        offerKey: 'offer1',
        position: { x: 400, y: 500 },
        stateStyles: {
          default: {
            frame: {
              borderRadius: 4,
              backgroundFill: { type: 'solid', color: '#007bff' },
              isAutolayout: false,
              layoutSizing: { horizontal: 'fixed', vertical: 'fixed' },
              padding: { vertical: 12, horizontal: 24 },
              dropShadows: [],
            },
            text: { fontSize: 16, color: '#ffffff' },
          },
          disabled: {
            frame: {
              borderRadius: 4,
              backgroundFill: { type: 'solid', color: '#6c757d' },
              isAutolayout: false,
              layoutSizing: { horizontal: 'fixed', vertical: 'fixed' },
              padding: { vertical: 12, horizontal: 24 },
              dropShadows: [],
            },
            text: { fontSize: 16, color: '#ffffff' },
          },
          hover: {
            frame: {
              borderRadius: 4,
              backgroundFill: { type: 'solid', color: '#0056b3' },
              isAutolayout: false,
              layoutSizing: { horizontal: 'fixed', vertical: 'fixed' },
              padding: { vertical: 12, horizontal: 24 },
              dropShadows: [],
            },
            text: { fontSize: 16, color: '#ffffff' },
          },
          active: {
            frame: {
              borderRadius: 4,
              backgroundFill: { type: 'solid', color: '#004085' },
              isAutolayout: false,
              layoutSizing: { horizontal: 'fixed', vertical: 'fixed' },
              padding: { vertical: 12, horizontal: 24 },
              dropShadows: [],
            },
            text: { fontSize: 16, color: '#ffffff' },
          },
        },
      }
    ],
    exportedAt: '2024-01-01T00:00:00.000Z',
    metadata: {
      version: '1.0.0',
    },
  });

  const createMockFile = (content: string | object) => {
    const stringContent = typeof content === 'object' ? JSON.stringify(content) : content;
    return {
      async: vi.fn().mockImplementation((type: string) => {
        if (type === 'string') return Promise.resolve(stringContent);
        if (type === 'blob') return Promise.resolve(new Blob([stringContent]));
        return Promise.resolve(stringContent);
      }),
    };
  };

  describe('positions_full.json support', () => {
    it('should prioritize positions_full.json over positions.json when both exist', async () => {
      const fullData = createMockChainOfferData();
      const legacyData = { ...fullData, chainOfferId: 'legacy-data' };
      const mockZipFile = new File(['mock'], 'test.zip', { type: 'application/zip' });

      mockZip.files = {
        'positions_full.json': {} as any,
        'positions.json': {} as any,
        'background.png': {} as any,
      };

      mockFile.mockImplementation((filename: string) => {
        if (filename === 'positions_full.json') {
          return createMockFile(fullData);
        }
        if (filename === 'positions.json') {
          return createMockFile(legacyData);
        }
        if (filename.endsWith('.png')) {
          return createMockFile('mock image data');
        }
        return null;
      });

      mockZip.loadAsync.mockResolvedValue(mockZip);

      const result = await extractChainOfferZip(mockZipFile);

      expect(result.chainOfferData.chainOfferId).toBe('test-chain-offer');
      expect(result.chainOfferData.chainOfferId).not.toBe('legacy-data');
    });

    it('should fall back to positions.json when positions_full.json does not exist', async () => {
      const legacyData = createMockChainOfferData();
      const mockZipFile = new File(['mock'], 'test.zip', { type: 'application/zip' });

      mockZip.files = {
        'positions.json': {} as any,
        'background.png': {} as any,
      };

      mockFile.mockImplementation((filename: string) => {
        if (filename === 'positions_full.json') {
          return null; // Does not exist
        }
        if (filename === 'positions.json') {
          return createMockFile(legacyData);
        }
        if (filename.endsWith('.png')) {
          return createMockFile('mock image data');
        }
        return null;
      });

      mockZip.loadAsync.mockResolvedValue(mockZip);

      const result = await extractChainOfferZip(mockZipFile);

      expect(result.chainOfferData).toEqual(legacyData);
    });

    it('should throw error when neither positions_full.json nor positions.json exist', async () => {
      const mockZipFile = new File(['mock'], 'test.zip', { type: 'application/zip' });

      mockZip.files = {
        'background.png': {} as any,
        'other_file.txt': {} as any,
      };

      mockFile.mockReturnValue(null);
      mockZip.loadAsync.mockResolvedValue(mockZip);

      await expect(extractChainOfferZip(mockZipFile)).rejects.toThrow(
        'No positions_full.json or positions.json file found in ZIP'
      );
    });
  });

  describe('successful extraction', () => {
    it('should extract chain offer with all components', async () => {
      const chainOfferData = createMockChainOfferData();
      const mockZipFile = new File(['mock'], 'test.zip', { type: 'application/zip' });

      mockZip.files = {
        'positions.json': {} as any,
        'background.png': {} as any,
        'offer1_locked.png': {} as any,
        'offer1_unlocked.png': {} as any,
        'offer1_claimed.png': {} as any,
        'header_active.png': {} as any,
        'header_success.png': {} as any,
        'header_fail.png': {} as any,
      };

      mockFile.mockImplementation((filename: string) => {
        if (filename === 'positions_full.json') return null;
        if (filename === 'positions.json') {
          return createMockFile(chainOfferData);
        }
        if (filename.endsWith('.png')) {
          return createMockFile('mock image data');
        }
        return null;
      });

      mockZip.loadAsync.mockResolvedValue(mockZip);

      const result = await extractChainOfferZip(mockZipFile);

      expect(result.chainOfferData).toEqual(chainOfferData);
      expect(result.backgroundImage).toBeDefined();
      expect(result.offerImages.offer1.Locked).toBeDefined();
      expect(result.offerImages.offer1.Unlocked).toBeDefined();
      expect(result.offerImages.offer1.Claimed).toBeDefined();
      expect(result.headerImages?.active).toBeDefined();
      expect(result.headerImages?.success).toBeDefined();
      expect(result.headerImages?.fail).toBeDefined();
    });

    it('should handle missing images gracefully', async () => {
      const chainOfferData = createMockChainOfferData();
      const mockZipFile = new File(['mock'], 'test.zip', { type: 'application/zip' });

      mockZip.files = { 'positions.json': {} as any };

      mockFile.mockImplementation((filename: string) => {
        if (filename === 'positions_full.json') return null;
        if (filename === 'positions.json') {
          return createMockFile(chainOfferData);
        }
        return null; // All images missing
      });

      mockZip.loadAsync.mockResolvedValue(mockZip);

      const result = await extractChainOfferZip(mockZipFile);

      expect(result.chainOfferData).toEqual(chainOfferData);
      expect(result.backgroundImage).toBeUndefined();
      expect(result.offerImages.offer1.Locked).toBeUndefined();
      expect(consoleWarnSpy).toHaveBeenCalledWith('Missing image: background.png');
    });
  });

  describe('memory management', () => {
    it('should call URL.createObjectURL for each image', async () => {
      const chainOfferData = createMockChainOfferData();
      const mockZipFile = new File(['mock'], 'test.zip', { type: 'application/zip' });

      // Note: The mockFile implementation returns a file for ANY .png request,
      // so all images defined in chainOfferData will be "extracted".
      // ChainOfferData has:
      // 1 background image
      // 3 offer images (Locked, Unlocked, Claimed)
      // 3 header images (active, success, fail)
      // Total = 7 images

      mockZip.files = {
        'positions.json': {} as any,
        'background.png': {} as any,
        'offer1_locked.png': {} as any,
      };

      mockFile.mockImplementation((filename: string) => {
        if (filename === 'positions_full.json') return null;
        if (filename === 'positions.json') {
          return createMockFile(chainOfferData);
        }
        if (filename.endsWith('.png')) {
          return createMockFile('mock image data');
        }
        return null;
      });

      mockZip.loadAsync.mockResolvedValue(mockZip);

      await extractChainOfferZip(mockZipFile);

      expect(global.URL.createObjectURL).toHaveBeenCalledTimes(7);
    });
  });
});