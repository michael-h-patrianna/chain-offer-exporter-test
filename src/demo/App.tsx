import { ExtractedAssets } from '@lib';
import { ChainOfferViewer } from '@lib/components/ChainOfferViewer';
import { extractChainOfferZip, revokeChainOfferAssets } from '@lib/utils/zipExtractor';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { getAnimationOptions, getRevealAnimation } from '../lib/animation/config';
import { AnimationType } from '../lib/animation/types';
import { applyAnimationParameters } from '../lib/animation/utils';
import './App.css';
import { AnimationParameterForm } from './components/AnimationControls/AnimationParameterForm';
import { AppBar } from './components/AppBar';
import { Sidebar } from './components/Sidebar';
import { AnimationParametersProvider, useAnimationParameters } from './context/AnimationContext';

function AppContent() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [extractedAssets, setExtractedAssets] = useState<ExtractedAssets | null>(null);
  const [width, setWidth] = useState(375);
  const [height, setHeight] = useState(812);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Animation State
  const [animationType, setAnimationType] = useState<AnimationType>('spring-physics');
  const [replayTrigger, setReplayTrigger] = useState(0);
  const { getParameters } = useAnimationParameters();

  // Component visibility state
  const [componentVisibility, setComponentVisibility] = useState({
    background: true,
    header: true,
    offers: true,
    timer: true,
    buttons: true,
  });

  // Offer key display state
  const [showOfferKeys, setShowOfferKeys] = useState(false);

  // Compute Animation Config
  const baseAnimation = getRevealAnimation(animationType);
  const parameters = getParameters(animationType);
  const animationConfig = applyAnimationParameters(baseAnimation, parameters);

  // Asset Cleanup Effect
  useEffect(() => {
    return () => {
      if (extractedAssets) {
        revokeChainOfferAssets(extractedAssets);
      }
    };
  }, [extractedAssets]);

  const toggleComponentVisibility = (component: keyof typeof componentVisibility) => {
    setComponentVisibility((prev) => ({
      ...prev,
      [component]: !prev[component],
    }));
  };

  const handleReplay = () => {
    setReplayTrigger(prev => prev + 1);
  };

  // Auto-load theme.zip if it exists in public/assets
  useEffect(() => {
    const autoLoadTheme = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/assets/theme.zip');
        if (!response.ok) return;

        const blob = await response.blob();
        const file = new File([blob], 'theme.zip', { type: 'application/zip' });

        const assets = await extractChainOfferZip(file);
        setExtractedAssets(assets);

        const frameWidth = assets.chainOfferData.frameSize?.width || 375;
        const frameHeight = assets.chainOfferData.frameSize?.height || 812;
        setWidth(frameWidth);
        setHeight(frameHeight);
      } catch (err) {
        console.warn('Theme auto-load failed:', err);
      } finally {
        setIsLoading(false);
      }
    };

    autoLoadTheme();
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setError(null);
      setIsLoading(true);

      const assets = await extractChainOfferZip(file);
      setExtractedAssets(assets);

      const frameWidth = assets.chainOfferData.frameSize?.width || 375;
      const frameHeight = assets.chainOfferData.frameSize?.height || 812;
      setWidth(frameWidth);
      setHeight(frameHeight);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to extract ZIP file');
    } finally {
      setIsLoading(false);
    }
  };

  // Close drawer on ESC
  useEffect(() => {
    if (!isDrawerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDrawerOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isDrawerOpen]);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isDrawerOpen]);

  const animationOptions = getAnimationOptions();

  return (
    <div className="App">
      <AppBar
        onMenuClick={() => setIsDrawerOpen(true)}
        title="Chain Offer Demo"
        githubUrl="https://github.com/michael-h-patrianna/chainoffer-exporter-test"
      />

      <main className="App-main">
        <div className="layout-container">
          {/* Desktop Sidebar */}
          <Sidebar
            extractedAssets={extractedAssets}
            isLoading={isLoading}
            error={error}
            chainofferWidth={width}
            chainofferHeight={height}
            componentVisibility={componentVisibility}
            showQuestKeys={showOfferKeys}
            onFileUpload={handleFileUpload}
            onChainOfferWidthChange={setWidth}
            onChainOfferHeightChange={setHeight}
            onToggleComponentVisibility={toggleComponentVisibility}
            onToggleShowQuestKeys={setShowOfferKeys}
            className="desktop-sidebar"
          >
            {extractedAssets && (
              <div className="sidebar-section animation-section">
                 <h3>Reveal Animation</h3>
                 <div className="control-group">
                   <label>
                     Animation Type
                     <select
                       value={animationType}
                       onChange={(e) => setAnimationType(e.target.value as AnimationType)}
                       style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #ced4da' }}
                     >
                       {animationOptions.map((opt) => (
                         <option key={opt.value} value={opt.value}>
                           {opt.label}
                         </option>
                       ))}
                     </select>
                   </label>
                 </div>
                 <AnimationParameterForm
                    animationType={animationType}
                    onAnimationTypeChange={setAnimationType}
                    onReplay={handleReplay}
                 />
              </div>
            )}
          </Sidebar>
          {/* Main Content Area */}
          <div className="main-content">
            {extractedAssets && (
              <div className="chainoffer-container">
                {/* Key Change: We remount the component when animation type changes to trigger enter animation again if needed,
                    or we rely on key prop. Framer Motion's 'initial' prop only runs on mount.
                    To re-run animation when config changes (if desired), we can use a key on the wrapper.
                */}
                <ChainOfferViewer
                  key={`${animationType}-${replayTrigger}-${JSON.stringify(parameters)}`} /* Re-mount on param change or replay */
                  chainOfferData={extractedAssets.chainOfferData}
                  assets={extractedAssets}
                  width={width}
                  height={height}
                  componentVisibility={componentVisibility}
                  showOfferKeys={showOfferKeys}
                  animationConfig={animationConfig}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Drawer for mobile sidebar */}
      <div
        id="app-sidebar-drawer"
        role="dialog"
        aria-modal="true"
        aria-hidden={!isDrawerOpen}
        hidden={!isDrawerOpen}
        className={`app-drawer ${isDrawerOpen ? 'is-open' : ''}`}
      >
        <div className="app-drawer__overlay" onClick={() => setIsDrawerOpen(false)} />
        <div className="app-drawer__panel">
          <div className="app-drawer__panel-header">
            <button
              type="button"
              className="app-drawer__close"
              aria-label="Close menu"
              onClick={() => setIsDrawerOpen(false)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <Sidebar
            extractedAssets={extractedAssets}
            isLoading={isLoading}
            error={error}
            chainofferWidth={width}
            chainofferHeight={height}
            componentVisibility={componentVisibility}
            showQuestKeys={showOfferKeys}
            onFileUpload={handleFileUpload}
            onChainOfferWidthChange={setWidth}
            onChainOfferHeightChange={setHeight}
            onToggleComponentVisibility={toggleComponentVisibility}
            onToggleShowQuestKeys={setShowOfferKeys}
            className="drawer-sidebar"
          >
            {extractedAssets && (
              <div style={{ marginBottom: '20px' }}>
                 <h3>Reveal Animation</h3>
                 <div className="control-group">
                   <label>
                     Animation Type
                     <select
                       value={animationType}
                       onChange={(e) => setAnimationType(e.target.value as AnimationType)}
                       style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #ced4da' }}
                     >
                       {animationOptions.map((opt) => (
                         <option key={opt.value} value={opt.value}>
                           {opt.label}
                         </option>
                       ))}
                     </select>
                   </label>
                 </div>
                 <AnimationParameterForm
                    animationType={animationType}
                    onAnimationTypeChange={setAnimationType}
                    onReplay={handleReplay}
                 />
              </div>
            )}
          </Sidebar>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AnimationParametersProvider>
      <AppContent />
      <Toaster position="bottom-right" />
    </AnimationParametersProvider>
  );
}

export default App;
