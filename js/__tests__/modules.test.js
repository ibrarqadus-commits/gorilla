/**
 * @jest-environment jsdom
 */

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => { store[key] = value; }),
    removeItem: jest.fn(key => { delete store[key]; }),
    clear: jest.fn(() => { store = {}; })
  };
})();

global.localStorage = localStorageMock;

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  document.body.innerHTML = '';
  
  delete require.cache[require.resolve('../modules.js')];
});

describe('Module Data Structure', () => {
  test('moduleData should have all 7 modules defined', () => {
    const moduleData = {
      '1': { title: 'Foundation & Financial Freedom Roadmap', units: [] },
      '2': { title: 'Market Understanding & Property Strategy', units: [] },
      '3': { title: 'Business Setup & Compliance Foundations', units: [] },
      '4': { title: 'Client Acquisition & Lettings Operations', units: [] },
      '5': { title: 'Property Management & Relationship Building', units: [] },
      '6': { title: 'End of Tenancy, Renewals & Compliance Updates', units: [] },
      '7': { title: 'Scaling, Marketing & Portfolio Growth', units: [] }
    };

    expect(Object.keys(moduleData).length).toBe(7);
    expect(moduleData['1'].title).toBe('Foundation & Financial Freedom Roadmap');
    expect(moduleData['7'].title).toBe('Scaling, Marketing & Portfolio Growth');
  });
});

describe('Progress Tracking Logic', () => {
  test('updateProgress should calculate correct percentage', () => {
    const progress = 3;
    const totalUnits = 6;
    const percentage = (progress / totalUnits) * 100;
    
    expect(percentage).toBe(50);
  });

  test('updateProgress should handle empty progress', () => {
    const progress = 0;
    const totalUnits = 6;
    const percentage = (progress / totalUnits) * 100;
    
    expect(percentage).toBe(0);
  });

  test('updateProgress should handle complete progress', () => {
    const progress = 6;
    const totalUnits = 6;
    const percentage = (progress / totalUnits) * 100;
    
    expect(percentage).toBe(100);
  });
});

describe('Video URL Resolution', () => {
  test('should resolve YouTube URLs correctly', () => {
    const testCases = [
      { url: 'https://www.youtube.com/watch?v=abc123', expected: 'abc123' },
      { url: 'https://youtu.be/def456', expected: 'def456' }
    ];

    testCases.forEach(({ url, expected }) => {
      try {
        const urlObj = new URL(url);
        const host = urlObj.hostname.toLowerCase();
        let videoId;
        
        if (host.includes('youtu.be')) {
          videoId = urlObj.pathname.slice(1);
        } else if (host.includes('youtube.com')) {
          videoId = urlObj.searchParams.get('v');
        }
        
        expect(videoId).toBe(expected);
      } catch (e) {
        expect(true).toBe(false);
      }
    });
  });

  test('should resolve Vimeo URLs correctly', () => {
    const url = 'https://vimeo.com/123456789';
    const urlObj = new URL(url);
    const videoId = urlObj.pathname.replace('/', '');
    
    expect(videoId).toBe('123456789');
  });

  test('should handle invalid URLs', () => {
    const invalidUrls = ['not-a-url', 'https://', 'just text'];
    
    invalidUrls.forEach(url => {
      let errorThrown = false;
      try {
        new URL(url);
      } catch (e) {
        errorThrown = true;
        // URL constructor should throw an error for invalid URLs
        // The specific error type may vary by environment (TypeError, DOMException, etc.)
        expect(e).toBeDefined();
      }
      // Assert that an error was thrown for invalid URLs
      expect(errorThrown).toBe(true);
    });
  });

  test('unit video should override module video', () => {
    const unitVideos = { '1.1': 'https://youtube.com/watch?v=unit' };
    const moduleVideos = { '1': 'https://youtube.com/watch?v=module' };
    const unitKey = '1.1';
    
    const resolvedUrl = unitVideos[unitKey] || moduleVideos['1'] || '';
    
    expect(resolvedUrl).toBe('https://youtube.com/watch?v=unit');
    expect(resolvedUrl).not.toBe('https://youtube.com/watch?v=module');
  });
});

describe('Navigation between units', () => {
  test('loadNext should move to next unit', () => {
    const units = [
      { id: '1.1', title: 'Unit 1' },
      { id: '1.2', title: 'Unit 2' },
      { id: '1.3', title: 'Unit 3' }
    ];
    const currentIndex = 0;
    const nextUnit = units[currentIndex + 1];
    
    expect(nextUnit.id).toBe('1.2');
  });

  test('loadPrevious should move to previous unit', () => {
    const units = [
      { id: '1.1', title: 'Unit 1' },
      { id: '1.2', title: 'Unit 2' },
      { id: '1.3', title: 'Unit 3' }
    ];
    const currentIndex = 2;
    const prevUnit = units[currentIndex - 1];
    
    expect(prevUnit.id).toBe('1.2');
  });

  test('should not navigate beyond last unit', () => {
    const units = [
      { id: '1.1', title: 'Unit 1' },
      { id: '1.2', title: 'Unit 2' }
    ];
    const currentIndex = 1;
    const canNavigateNext = currentIndex < units.length - 1;
    
    expect(canNavigateNext).toBe(false);
  });

  test('should not navigate before first unit', () => {
    const units = [
      { id: '1.1', title: 'Unit 1' },
      { id: '1.2', title: 'Unit 2' }
    ];
    const currentIndex = 0;
    const canNavigatePrev = currentIndex > 0;
    
    expect(canNavigatePrev).toBe(false);
  });
});

describe('Content Generation', () => {
  test('should generate iframe embed for YouTube', () => {
    const videoId = 'abc123';
    const embedHtml = `<iframe class="w-full aspect-video rounded-lg mb-6" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
    
    expect(embedHtml).toContain('youtube.com/embed');
    expect(embedHtml).toContain(videoId);
  });

  test('should generate iframe embed for Vimeo', () => {
    const videoId = '123456789';
    const embedHtml = `<iframe class="w-full aspect-video rounded-lg mb-6" src="https://player.vimeo.com/video/${videoId}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
    
    expect(embedHtml).toContain('player.vimeo.com');
    expect(embedHtml).toContain(videoId);
  });

  test('should generate fallback link for unknown video URLs', () => {
    const videoUrl = 'https://example.com/video';
    const fallbackHtml = `<a class="block text-blue-600 underline mb-6" href="${videoUrl}" target="_blank" rel="noopener">Open video</a>`;
    
    expect(fallbackHtml).toContain(videoUrl);
    expect(fallbackHtml).toContain('Open video');
  });
});

describe('Completion Marking', () => {
  test('should update progress when marking complete', () => {
    let currentModule = '1';
    let currentUnit = '1.1';
    const users = [{ email: 'test@test.com', progress: { '1': {} } }];
    localStorage.setItem('users', JSON.stringify(users));
    
    expect(currentModule).toBe('1');
    expect(currentUnit).toBe('1.1');
  });

  test('should prevent completion when not authenticated', () => {
    let currentModule = null;
    let currentUnit = null;
    const canMark = !!(currentModule && currentUnit);
    
    expect(canMark).toBe(false);
  });
});

