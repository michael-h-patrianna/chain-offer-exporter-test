import { ExtractedAssets } from '@lib';
import React from 'react';

type ComponentVisibilityType = {
  background: boolean;
  header: boolean;
  offers: boolean;
  timer: boolean;
  buttons: boolean;
};

interface SidebarProps {
  extractedAssets: ExtractedAssets | null;
  isLoading: boolean;
  error: string | null;
  chainofferWidth: number;
  chainofferHeight: number;
  componentVisibility: ComponentVisibilityType;
  showQuestKeys: boolean;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChainOfferWidthChange: (width: number) => void;
  onChainOfferHeightChange: (height: number) => void;
  onToggleComponentVisibility: (component: keyof ComponentVisibilityType) => void;
  onToggleShowQuestKeys: (show: boolean) => void;
  className?: string;
  children?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  extractedAssets,
  isLoading,
  error,
  chainofferWidth,
  chainofferHeight,
  componentVisibility,
  showQuestKeys,
  onFileUpload,
  onChainOfferWidthChange,
  onChainOfferHeightChange,
  onToggleComponentVisibility,
  onToggleShowQuestKeys,
  className,
  children,
}) => {
  return (
    <aside className={`app-sidebar${className ? ` ${className}` : ''}`}>
      {/* File Upload */}
      <div className="upload-section">
        <label className="file-input-label">
          <input
            type="file"
            accept=".zip"
            onChange={onFileUpload}
            className="file-input-hidden"
            disabled={isLoading}
          />
          <span className="file-input-button">{isLoading ? 'Loading...' : 'Choose ZIP File'}</span>
        </label>
        {isLoading && <div className="loading-message">Loading chain offer theme...</div>}
        {error && <div className="error-message">{error}</div>}
      </div>

      {extractedAssets && (
        <>
          {/* Controls */}
          <div className="controls-section">
            <h3>Chain Offer Settings</h3>
            <div className="control-group">
              <label>
                Frame Width: {chainofferWidth}px
                <input
                  type="range"
                  min="200"
                  max="414"
                  value={chainofferWidth}
                  onChange={(e) => onChainOfferWidthChange(Number(e.target.value))}
                />
              </label>
            </div>
            <div className="control-group">
              <label>
                Frame Height: {chainofferHeight}px
                <input
                  type="range"
                  min="400"
                  max="900"
                  value={chainofferHeight}
                  onChange={(e) => onChainOfferHeightChange(Number(e.target.value))}
                />
              </label>
            </div>
            <div className="control-group">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={showQuestKeys}
                  onChange={(e) => onToggleShowQuestKeys(e.target.checked)}
                  className="toggle-checkbox"
                />
                <span className="toggle-text">Show Offer Keys</span>
              </label>
            </div>
          </div>

          {/* Custom Children (e.g. Animation Controls) */}
          {children}

          {/* Information panel */}
          <div className="info-section">
            <h3>Chain Offer Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <strong>ID:</strong> {extractedAssets.chainOfferData.chainOfferId}
              </div>
              <div className="info-item">
                <strong>Frame Size:</strong> {extractedAssets.chainOfferData.frameSize.width} ×{' '}
                {extractedAssets.chainOfferData.frameSize.height}
              </div>
              <div className="info-item">
                <strong>Total Offers:</strong> {extractedAssets.chainOfferData.offers.length}
              </div>
              <div className="info-item">
                <strong>Version:</strong> {extractedAssets.chainOfferData.metadata.version}
              </div>
            </div>

            <h4>Components Included:</h4>
            <div className="components-list">
              <button
                className={`component-toggle ${extractedAssets.backgroundImage ? 'component-present' : 'component-missing'} ${!componentVisibility.background ? 'component-hidden' : ''}`}
                onClick={() => onToggleComponentVisibility('background')}
                disabled={!extractedAssets.backgroundImage}
              >
                Background{' '}
                {extractedAssets.backgroundImage
                  ? componentVisibility.background
                    ? '👁'
                    : '👁‍🗨'
                  : '✗'}
              </button>
              <button
                className={`component-toggle ${extractedAssets.headerImages ? 'component-present' : 'component-missing'} ${!componentVisibility.header ? 'component-hidden' : ''}`}
                onClick={() => onToggleComponentVisibility('header')}
                disabled={!extractedAssets.headerImages}
              >
                Header{' '}
                {extractedAssets.headerImages
                  ? componentVisibility.header
                    ? '👁'
                    : '👁‍🗨'
                  : '✗'}
              </button>
              <button
                className={`component-toggle ${extractedAssets.chainOfferData.offers.length > 0 ? 'component-present' : 'component-missing'} ${!componentVisibility.offers ? 'component-hidden' : ''}`}
                onClick={() => onToggleComponentVisibility('offers')}
                disabled={extractedAssets.chainOfferData.offers.length === 0}
              >
                Offers ({extractedAssets.chainOfferData.offers.length}){' '}
                {extractedAssets.chainOfferData.offers.length > 0
                  ? componentVisibility.offers
                    ? '👁'
                    : '👁‍🗨'
                  : '✗'}
              </button>
              <button
                className={`component-toggle ${extractedAssets.chainOfferData.timer ? 'component-present' : 'component-missing'} ${!componentVisibility.timer ? 'component-hidden' : ''}`}
                onClick={() => onToggleComponentVisibility('timer')}
                disabled={!extractedAssets.chainOfferData.timer}
              >
                Timer{' '}
                {extractedAssets.chainOfferData.timer
                  ? componentVisibility.timer
                    ? '👁'
                    : '👁‍🗨'
                  : '✗'}
              </button>
              <button
                className={`component-toggle ${extractedAssets.chainOfferData.buttons.length > 0 ? 'component-present' : 'component-missing'} ${!componentVisibility.buttons ? 'component-hidden' : ''}`}
                onClick={() => onToggleComponentVisibility('buttons')}
                disabled={extractedAssets.chainOfferData.buttons.length === 0}
              >
                Buttons ({extractedAssets.chainOfferData.buttons.length}){' '}
                {extractedAssets.chainOfferData.buttons.length > 0
                  ? componentVisibility.buttons
                    ? '👁'
                    : '👁‍🗨'
                  : '✗'}
              </button>
            </div>

            <p className="interaction-help">
              <strong>Interaction Guide:</strong>
              <br />
              • Click offers to cycle states (Locked → Unlocked → Claimed)
              <br />
              • Button states sync with offers
              <br />
              • Button interaction: Hover/Active states
              <br />
              • Click header to cycle: active → success → fail
              <br />• Adjust frame dimensions using the sliders above
            </p>
          </div>
        </>
      )}
    </aside>
  );
};
